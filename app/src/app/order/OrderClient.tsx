'use client';

import { useReducer, useEffect, useState } from 'react';
import Link from 'next/link';
import { Cosmos } from '@/components/Cosmos';
import { GoldDust } from '@/components/GoldDust';
import { TIERS, ADD_ONS, formatPrice } from '@/lib/tiers';
import type { Tier } from '@/lib/types';

/**
 * Order intake form. NOT a designer — the customer describes what they want,
 * our team designs it. Auto-saves draft to localStorage. On submit, this is
 * where Hermes wires up payment + Supabase persistence.
 */

const STORAGE_KEY = 'dawati_order_draft_v1';

const OCCASION_LABEL: Record<string, string> = {
  wedding: 'زواج',
  engagement: 'خطوبة',
  eid: 'عيد',
  aqiqa: 'عقيقة',
  graduation: 'تخرّج',
  opening: 'افتتاح',
  other: 'أخرى',
};

const PHOTO_LABEL: Record<string, string> = {
  allowed: 'مسموح للجميع',
  forbidden: 'ممنوع',
  'designated-area': 'منطقة مخصّصة فقط',
  'professional-only': 'مصوّر رسمي فقط',
};

interface OrderDraft {
  // Tier + add-ons
  tier: Tier;
  addons: string[];

  // Occasion
  occasion: 'wedding' | 'engagement' | 'eid' | 'aqiqa' | 'graduation' | 'opening' | 'other';
  occasionOther?: string;

  // People
  groomName: string;
  brideName: string;
  groomFamily: string;
  brideFamily: string;
  hideBrideFirstName: boolean;

  // Date & venue
  gregorianDate: string;
  time: string;
  city: string;
  area: string;
  hall: string;
  mapsUrl: string;

  // Guest counts (creative additions per user request)
  expectedAdults: string;
  expectedChildren: string;
  hasSpecialNeeds: boolean;
  specialNeedsNote: string;

  // Photography policy
  photographyPolicy: 'allowed' | 'forbidden' | 'designated-area' | 'professional-only';
  photographyNote: string;

  // Food & dietary
  collectMealPreferences: boolean; // ask guests their meal type
  collectAllergies: boolean; // ask guests their allergies
  hasKidsMenu: boolean;
  mealTypes: string[]; // what's available: lamb, chicken, fish, veg
  dinnerTime: string;
  menuDescription: string; // freeform menu description

  // Accessibility / accommodations (Malakiyya)
  hasWheelchairAccess: boolean;
  hasNursingRoom: boolean;
  hasPrayerRoom: boolean;
  hasKidsPlayArea: boolean;
  hasValetParking: boolean;
  separateMaleFemale: boolean; // separate entrances/sections
  accommodationNote: string;

  // Religious content
  verseChoice: 'auto' | 'tell-us';
  verseNote: string;
  flourishChoice: 'auto' | 'tell-us';
  flourishNote: string;

  // Design brief
  designVibe: string[];
  paletteHint: string;
  referenceLinks: string;
  designDescription: string;

  // Languages
  languages: string[];

  // Contact
  yourName: string;
  yourEmail: string;
  yourPhone: string;
  preferWhatsApp: boolean;

  // Delivery
  neededByDate: string;
  notes: string;
}

const INITIAL: OrderDraft = {
  tier: 'fakhira',
  addons: [],
  occasion: 'wedding',
  groomName: '',
  brideName: '',
  groomFamily: '',
  brideFamily: '',
  hideBrideFirstName: true,
  gregorianDate: '',
  time: '',
  city: '',
  area: '',
  hall: '',
  mapsUrl: '',
  expectedAdults: '',
  expectedChildren: '',
  hasSpecialNeeds: false,
  specialNeedsNote: '',
  photographyPolicy: 'designated-area',
  photographyNote: '',
  collectMealPreferences: true,
  collectAllergies: true,
  hasKidsMenu: true,
  mealTypes: [],
  dinnerTime: '',
  menuDescription: '',
  hasWheelchairAccess: true,
  hasNursingRoom: false,
  hasPrayerRoom: true,
  hasKidsPlayArea: false,
  hasValetParking: false,
  separateMaleFemale: true,
  accommodationNote: '',
  verseChoice: 'auto',
  verseNote: '',
  flourishChoice: 'auto',
  flourishNote: '',
  designVibe: [],
  paletteHint: 'gold',
  referenceLinks: '',
  designDescription: '',
  languages: ['ar'],
  yourName: '',
  yourEmail: '',
  yourPhone: '',
  preferWhatsApp: true,
  neededByDate: '',
  notes: '',
};

type Action =
  | { type: 'set'; patch: Partial<OrderDraft> }
  | { type: 'toggleAddon'; id: string }
  | { type: 'toggleVibe'; v: string }
  | { type: 'toggleLanguage'; lang: string }
  | { type: 'toggleMeal'; m: string };

function reducer(s: OrderDraft, a: Action): OrderDraft {
  if (a.type === 'set') return { ...s, ...a.patch };
  if (a.type === 'toggleAddon') {
    return s.addons.includes(a.id)
      ? { ...s, addons: s.addons.filter((x) => x !== a.id) }
      : { ...s, addons: [...s.addons, a.id] };
  }
  if (a.type === 'toggleVibe') {
    return s.designVibe.includes(a.v)
      ? { ...s, designVibe: s.designVibe.filter((x) => x !== a.v) }
      : { ...s, designVibe: [...s.designVibe, a.v] };
  }
  if (a.type === 'toggleLanguage') {
    if (a.lang === 'ar') return s;
    return s.languages.includes(a.lang)
      ? { ...s, languages: s.languages.filter((x) => x !== a.lang) }
      : { ...s, languages: [...s.languages, a.lang] };
  }
  if (a.type === 'toggleMeal') {
    return s.mealTypes.includes(a.m)
      ? { ...s, mealTypes: s.mealTypes.filter((x) => x !== a.m) }
      : { ...s, mealTypes: [...s.mealTypes, a.m] };
  }
  return s;
}

export function OrderClient() {
  const [data, dispatch] = useReducer(reducer, INITIAL);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get('tier') as Tier | null;
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'set', patch: JSON.parse(raw) });
      if (tierParam && ['mumayyaza', 'fakhira', 'malakiyya'].includes(tierParam)) {
        dispatch({ type: 'set', patch: { tier: tierParam } });
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSavedAt(new Date());
      } catch {
        /* quota errors silently dropped */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [data, hydrated]);

  const tier = TIERS.find((t) => t.id === data.tier) ?? TIERS[1]!;
  const eligibleAddons = ADD_ONS.filter((a) => a.availableFor.includes(data.tier));
  const selectedAddons = ADD_ONS.filter((a) => data.addons.includes(a.id));
  const total =
    tier.price + selectedAddons.reduce((sum, a) => sum + a.price, 0);

  function handleSubmit() {
    if (!data.yourName.trim() || !data.yourPhone.trim() || !data.gregorianDate) {
      alert('املأ على الأقل: اسمك، جوّالك، وتاريخ المناسبة.');
      return;
    }
    setSubmitted(true);

    /* Until Moyasar checkout lands, route the order to Dawati's WhatsApp
     * as a fully formatted message. The customer just hits Send. */
    const phone = '966500000000'; // TODO Hermes: replace with real Dawati WhatsApp Business number
    const msg = buildWhatsAppMessage(data, tier.name, total, selectedAddons);
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    setTimeout(() => window.open(waUrl, '_blank'), 600);
  }

  function buildWhatsAppMessage(d: OrderDraft, tierName: string, totalSar: number, addons: typeof selectedAddons): string {
    const lines: string[] = [];
    lines.push('🌙 *طلب دعوة جديدة عبر دعوتي*');
    lines.push('');
    lines.push(`*الباقة:* ${tierName}`);
    lines.push(`*الإجمالي:* ${totalSar.toLocaleString('ar-SA')} ر.س (شامل الضريبة)`);
    lines.push('');
    lines.push(`*المناسبة:* ${OCCASION_LABEL[d.occasion] ?? d.occasion}${d.occasionOther ? ' — ' + d.occasionOther : ''}`);
    lines.push(`*التاريخ:* ${d.gregorianDate}${d.time ? ' · ' + d.time : ''}`);
    lines.push(`*المكان:* ${d.city}${d.area ? ' — ' + d.area : ''}${d.hall ? ' — ' + d.hall : ''}`);
    if (d.mapsUrl) lines.push(`*الموقع:* ${d.mapsUrl}`);
    lines.push('');
    if (d.occasion === 'wedding' || d.occasion === 'engagement') {
      if (d.groomName) lines.push(`*العريس:* ${d.groomName}`);
      if (d.brideName) lines.push(`*العروس:* ${d.brideName}`);
      if (d.groomFamily) lines.push(`*عائلة العريس:* آل ${d.groomFamily}`);
      if (d.brideFamily) lines.push(`*عائلة العروس:* آل ${d.brideFamily}`);
      lines.push(`*إظهار اسم العروس في النص:* ${d.hideBrideFirstName ? 'لا' : 'نعم'}`);
    } else {
      if (d.groomName) lines.push(`*المُضيف:* ${d.groomName}`);
    }
    lines.push('');
    lines.push(`*الضيوف:* ${d.expectedAdults || '?'} بالغ + ${d.expectedChildren || '0'} طفل`);
    if (d.hasSpecialNeeds) lines.push(`*ذوي احتياجات خاصة:* ${d.specialNeedsNote || 'نعم'}`);
    lines.push(`*التصوير:* ${PHOTO_LABEL[d.photographyPolicy]}`);
    if (d.photographyNote) lines.push(`*ملاحظة التصوير:* ${d.photographyNote}`);
    if (d.tier === 'fakhira' || d.tier === 'malakiyya') {
      lines.push('');
      lines.push(`*جمع تفضيلات الوجبة من الضيوف:* ${d.collectMealPreferences ? 'نعم' : 'لا'}`);
      lines.push(`*جمع الحساسيات:* ${d.collectAllergies ? 'نعم' : 'لا'}`);
      lines.push(`*قائمة أطفال:* ${d.hasKidsMenu ? 'نعم' : 'لا'}`);
      if (d.mealTypes.length) lines.push(`*أنواع الوجبات:* ${d.mealTypes.join('، ')}`);
      if (d.dinnerTime) lines.push(`*وقت العشاء:* ${d.dinnerTime}`);
      if (d.menuDescription) lines.push(`*وصف القائمة:* ${d.menuDescription}`);
    }
    if (d.tier === 'malakiyya') {
      const accommodations: string[] = [];
      if (d.hasWheelchairAccess) accommodations.push('وصول لذوي الاحتياجات');
      if (d.hasPrayerRoom) accommodations.push('غرفة صلاة');
      if (d.hasNursingRoom) accommodations.push('غرفة رضاعة');
      if (d.hasKidsPlayArea) accommodations.push('منطقة أطفال');
      if (d.hasValetParking) accommodations.push('Valet');
      if (d.separateMaleFemale) accommodations.push('مداخل منفصلة');
      if (accommodations.length) lines.push(`*وسائل الراحة:* ${accommodations.join('، ')}`);
      if (d.accommodationNote) lines.push(`*ملاحظة الراحة:* ${d.accommodationNote}`);
    }
    lines.push('');
    lines.push(`*النص الديني:* ${d.verseChoice === 'auto' ? 'اتركوا لنا' : d.verseNote}`);
    lines.push(`*الدعاء:* ${d.flourishChoice === 'auto' ? 'اتركوا لنا' : d.flourishNote}`);
    lines.push('');
    if (d.designVibe.length) lines.push(`*مزاج التصميم:* ${d.designVibe.join('، ')}`);
    if (d.paletteHint) lines.push(`*اللون:* ${d.paletteHint}`);
    if (d.designDescription) {
      lines.push('');
      lines.push('*وصف التصميم المطلوب:*');
      lines.push(d.designDescription);
    }
    if (d.referenceLinks) {
      lines.push('');
      lines.push('*مراجع:*');
      lines.push(d.referenceLinks);
    }
    if (d.languages.length > 1) lines.push(`\n*اللغات:* ${d.languages.join('، ')}`);
    if (addons.length) {
      lines.push('');
      lines.push('*الإضافات:*');
      addons.forEach((a) => lines.push(`+ ${a.name} (${a.price} ر.س)`));
    }
    lines.push('');
    lines.push('━━━━━━━━━━━━━━');
    lines.push(`*اسمي:* ${d.yourName}`);
    lines.push(`*جوّالي:* ${d.yourPhone}`);
    if (d.yourEmail) lines.push(`*إيميلي:* ${d.yourEmail}`);
    if (d.neededByDate) lines.push(`*أحتاجها بحلول:* ${d.neededByDate}`);
    if (d.notes) {
      lines.push('');
      lines.push('*ملاحظات:*');
      lines.push(d.notes);
    }
    return lines.join('\n');
  }

  if (submitted) {
    return (
      <>
        <Cosmos />
        <GoldDust />
        <main className="relative z-10 mx-auto max-w-2xl px-4 py-20 text-center">
          <div
            className="rounded-3xl p-10 border"
            style={{
              background:
                'linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(244,208,107,0.06) 100%)',
              borderColor: 'rgba(244, 208, 107, 0.55)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">🌙</div>
            <h1
              className="text-gold-shim mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 5vw, 40px)',
              }}
            >
              فتحنا لك واتساب — أرسل الطلب
            </h1>
            <p
              className="mb-6"
              style={{
                color: 'var(--color-ink-light)',
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              راح يفتح لك واتساب مع طلبك جاهز — كل اللي عليك تضغط «إرسال».
              فريقنا يراجع طلبك خلال ساعة ويرسل لك رابط الدفع، ثم نبدأ التصميم
              ونسلّم خلال {tier.deliveryHours} ساعة.
            </p>
            <p
              className="text-sm mb-2"
              style={{
                color: 'var(--color-gold-2)',
                fontFamily: 'var(--font-body)',
              }}
            >
              ما فتح واتساب؟ اضغط الزر تحت
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-block mt-6 rounded-2xl px-10 py-4 font-bold"
              style={{
                background: 'linear-gradient(180deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                boxShadow: '0 8px 22px rgba(37, 211, 102, 0.4)',
              }}
            >
              💬 افتح واتساب مرة ثانية
            </button>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-block text-sm"
                style={{ color: 'var(--color-gold-2)', textDecoration: 'underline' }}
              >
                ← الرجوع للرئيسية
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Cosmos />
      <GoldDust />

      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: 'rgba(5, 7, 20, 0.7)',
          borderColor: 'rgba(184, 138, 30, 0.25)',
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-gold-shim text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ← دعوتي
          </Link>
          <div
            className="text-xs hidden sm:block"
            style={{
              color: savedAt ? 'var(--color-gold-3)' : 'var(--color-ink-dim)',
              fontFamily: 'var(--font-ui)',
            }}
          >
            {savedAt ? `محفوظ تلقائيًّا · ${timeSince(savedAt)}` : 'يجري التحميل...'}
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <div className="text-center mb-8">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: 'var(--color-gold-3)', fontFamily: 'var(--font-latin)' }}
          >
            ✦  ORDER INTAKE  ✦
          </p>
          <h1
            className="text-gold-shim text-balance"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 5vw, 42px)',
            }}
          >
            احكِ لنا عن دعوتك — ونحنا نسوّيها
          </h1>
          <p
            className="mt-4 mx-auto max-w-xl text-balance"
            style={{
              color: 'var(--color-ink-light)',
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            املأ التفاصيل بهدوء — تقدر ترجع لها أيّ وقت. كل شيء يُحفظ تلقائيًّا.
            بعد الدفع، فريقنا يصمّمها لك ويسلّمك خلال <strong>{tier.deliveryHours} ساعة</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
          <div className="space-y-4">
            {/* Tier */}
            <Section title="١ · اختر باقتك">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIERS.map((t) => (
                  <label key={t.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="tier"
                      checked={data.tier === t.id}
                      onChange={() => {
                        dispatch({ type: 'set', patch: { tier: t.id } });
                        // strip add-ons that don't apply to new tier
                        dispatch({
                          type: 'set',
                          patch: {
                            addons: data.addons.filter((id) => {
                              const a = ADD_ONS.find((x) => x.id === id);
                              return a?.availableFor.includes(t.id);
                            }),
                          },
                        });
                      }}
                      className="sr-only peer"
                    />
                    <div
                      className="p-4 rounded-2xl text-center transition peer-checked:scale-[1.02]"
                      style={{
                        background:
                          data.tier === t.id
                            ? 'linear-gradient(180deg, rgba(244,208,107,0.20) 0%, rgba(184,138,30,0.10) 100%)'
                            : 'rgba(20, 14, 39, 0.55)',
                        border:
                          data.tier === t.id
                            ? '2px solid rgba(244, 208, 107, 0.7)'
                            : '1px solid rgba(184, 138, 30, 0.3)',
                      }}
                    >
                      <div
                        className="text-gold-grad font-bold mb-1"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-gold-shim font-bold"
                        style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}
                      >
                        {formatPrice(t.price)}
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-ui)' }}
                      >
                        تسليم {t.deliveryHours} ساعة
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </Section>

            {/* Occasion */}
            <Section title="٢ · المناسبة">
              <Radios
                name="occasion"
                value={data.occasion}
                onChange={(v) =>
                  dispatch({ type: 'set', patch: { occasion: v as OrderDraft['occasion'] } })
                }
                options={[
                  { value: 'wedding', label: 'زواج' },
                  { value: 'engagement', label: 'خطوبة' },
                  { value: 'eid', label: 'عيد' },
                  { value: 'aqiqa', label: 'عقيقة' },
                  { value: 'graduation', label: 'تخرّج' },
                  { value: 'opening', label: 'افتتاح' },
                  { value: 'other', label: 'أخرى' },
                ]}
              />
              {data.occasion === 'other' && (
                <Field
                  label="نوع المناسبة"
                  value={data.occasionOther ?? ''}
                  onChange={(v) => dispatch({ type: 'set', patch: { occasionOther: v } })}
                  placeholder="مثل: حفلة استقبال، عقد قران، ..."
                />
              )}
            </Section>

            {/* People */}
            <Section title="٣ · الأسماء والعائلات">
              {(data.occasion === 'wedding' || data.occasion === 'engagement') && (
                <>
                  <Field
                    label="الاسم الكامل للعريس"
                    value={data.groomName}
                    onChange={(v) => dispatch({ type: 'set', patch: { groomName: v } })}
                    placeholder="مثل: محمد عبد الله الفهد"
                  />
                  <Field
                    label="الاسم الكامل للعروس"
                    value={data.brideName}
                    onChange={(v) => dispatch({ type: 'set', patch: { brideName: v } })}
                    placeholder="مثل: ابنة عبد الرحمن الراشد"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field
                      label="عائلة العريس (آل ...)"
                      value={data.groomFamily}
                      onChange={(v) => dispatch({ type: 'set', patch: { groomFamily: v } })}
                      placeholder="الفهد"
                    />
                    <Field
                      label="عائلة العروس (آل ...)"
                      value={data.brideFamily}
                      onChange={(v) => dispatch({ type: 'set', patch: { brideFamily: v } })}
                      placeholder="الراشد"
                    />
                  </div>
                  <Toggle
                    label="أخفِ اسم العروس الأول في نص الدعوة"
                    checked={data.hideBrideFirstName}
                    onChange={(b) => dispatch({ type: 'set', patch: { hideBrideFirstName: b } })}
                    hint="الافتراضي إخفاء، اتباعًا للعرف"
                  />
                </>
              )}
              {data.occasion !== 'wedding' && data.occasion !== 'engagement' && (
                <Field
                  label="اسم المُضيف"
                  value={data.groomName}
                  onChange={(v) => dispatch({ type: 'set', patch: { groomName: v } })}
                  placeholder="مثل: أبو فيصل عبد الله"
                />
              )}
            </Section>

            {/* Date & venue */}
            <Section title="٤ · التاريخ والمكان">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="التاريخ (ميلادي)"
                  type="date"
                  value={data.gregorianDate}
                  onChange={(v) => dispatch({ type: 'set', patch: { gregorianDate: v } })}
                  required
                />
                <Field
                  label="الوقت"
                  type="time"
                  value={data.time}
                  onChange={(v) => dispatch({ type: 'set', patch: { time: v } })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="المدينة"
                  value={data.city}
                  onChange={(v) => dispatch({ type: 'set', patch: { city: v } })}
                  placeholder="الرياض"
                />
                <Field
                  label="الحي"
                  value={data.area}
                  onChange={(v) => dispatch({ type: 'set', patch: { area: v } })}
                  placeholder="حي الياسمين"
                />
              </div>
              <Field
                label="اسم القاعة (اختياري)"
                value={data.hall}
                onChange={(v) => dispatch({ type: 'set', patch: { hall: v } })}
                placeholder="قاعة الفيصلية"
              />
              <Field
                label="رابط الموقع على Google Maps (اختياري)"
                value={data.mapsUrl}
                onChange={(v) => dispatch({ type: 'set', patch: { mapsUrl: v } })}
                placeholder="https://maps.app.goo.gl/..."
              />
            </Section>

            {/* Guests breakdown */}
            <Section title="٥ · توقّع عدد الضيوف" subtitle="يساعدنا نجهّز لوحتك بمعلومات أدقّ">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="عدد البالغين المتوقّع"
                  value={data.expectedAdults}
                  onChange={(v) => dispatch({ type: 'set', patch: { expectedAdults: v } })}
                  placeholder="مثل: ٢٠٠"
                />
                <Field
                  label="عدد الأطفال المتوقّع"
                  value={data.expectedChildren}
                  onChange={(v) => dispatch({ type: 'set', patch: { expectedChildren: v } })}
                  placeholder="مثل: ٣٠"
                />
              </div>
              <Toggle
                label="فيه ضيوف من ذوي الاحتياجات الخاصة؟"
                checked={data.hasSpecialNeeds}
                onChange={(b) => dispatch({ type: 'set', patch: { hasSpecialNeeds: b } })}
                hint="نضمن جاهزية القاعة بالمعلومات الصحيحة"
              />
              {data.hasSpecialNeeds && (
                <Textarea
                  label="تفاصيل الاحتياجات الخاصة"
                  value={data.specialNeedsNote}
                  onChange={(v) => dispatch({ type: 'set', patch: { specialNeedsNote: v } })}
                  placeholder="مثل: ٢ كرسي متحرّك، حساسية صوت..."
                  rows={2}
                />
              )}
            </Section>

            {/* Photography policy */}
            <Section title="٦ · سياسة التصوير">
              <p className="text-sm" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}>
                نُوضّح سياسة التصوير على الدعوة لضيوفك حتى يجيؤون مستعدّين
              </p>
              <Radios
                name="photography"
                value={data.photographyPolicy}
                onChange={(v) => dispatch({ type: 'set', patch: { photographyPolicy: v as OrderDraft['photographyPolicy'] } })}
                options={[
                  { value: 'forbidden', label: 'ممنوع التصوير' },
                  { value: 'designated-area', label: 'منطقة مخصّصة فقط' },
                  { value: 'professional-only', label: 'مصوّر رسمي فقط' },
                  { value: 'allowed', label: 'مسموح للجميع' },
                ]}
              />
              <Textarea
                label="ملاحظات إضافية للضيوف (اختياري)"
                value={data.photographyNote}
                onChange={(v) => dispatch({ type: 'set', patch: { photographyNote: v } })}
                placeholder="مثل: التصوير مسموح بعد ساعة من بداية الحفل، أو تكون المنطقة المخصّصة هي البهو الخارجي..."
                rows={2}
              />
            </Section>

            {/* Food preferences (Fakhira+) */}
            {(data.tier === 'fakhira' || data.tier === 'malakiyya') && (
              <Section title="٧ · الطعام وتفضيلات الضيوف" subtitle="نسأل ضيوفك تلقائيًّا عند تأكيد الحضور — لتجهّز قائمتك بدقّة">
                <Toggle
                  label="اسأل الضيوف عن نوع الوجبة المفضّلة"
                  checked={data.collectMealPreferences}
                  onChange={(b) => dispatch({ type: 'set', patch: { collectMealPreferences: b } })}
                  hint="يحدّد الضيف: لحم، دجاج، سمك، نباتي"
                />
                <Toggle
                  label="اسأل الضيوف عن الحساسيات الغذائية"
                  checked={data.collectAllergies}
                  onChange={(b) => dispatch({ type: 'set', patch: { collectAllergies: b } })}
                  hint="مكسرات، ألبان، جلوتين، بحريات..."
                />
                <Toggle
                  label="عندك قائمة طعام مخصّصة للأطفال؟"
                  checked={data.hasKidsMenu}
                  onChange={(b) => dispatch({ type: 'set', patch: { hasKidsMenu: b } })}
                />

                <p className="text-sm pt-2" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}>
                  أنواع الوجبات المتوفّرة في حفلك
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: 'lamb', l: '🥩 لحم' },
                    { v: 'chicken', l: '🍗 دجاج' },
                    { v: 'fish', l: '🐟 سمك' },
                    { v: 'rice', l: '🍚 كبسة' },
                    { v: 'veg', l: '🥗 نباتي' },
                    { v: 'sweets', l: '🍰 حلويات' },
                    { v: 'buffet', l: '🍽️ بوفيه مفتوح' },
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => dispatch({ type: 'toggleMeal', m: o.v })}
                      className="px-4 py-2 rounded-full text-sm transition"
                      style={{
                        background: data.mealTypes.includes(o.v)
                          ? 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 100%)'
                          : 'rgba(20, 14, 39, 0.55)',
                        color: data.mealTypes.includes(o.v) ? '#2a1505' : 'var(--color-ink-light)',
                        border: '1px solid rgba(184, 138, 30, 0.4)',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                      }}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>

                <Field
                  label="وقت تقديم العشاء"
                  type="time"
                  value={data.dinnerTime}
                  onChange={(v) => dispatch({ type: 'set', patch: { dinnerTime: v } })}
                />

                {data.tier === 'malakiyya' && (
                  <Textarea
                    label="وصف القائمة الكاملة (للدعوة الملكية)"
                    value={data.menuDescription}
                    onChange={(v) => dispatch({ type: 'set', patch: { menuDescription: v } })}
                    placeholder="اكتب القائمة كاملة كما تحبّ تظهر في الدعوة — مقبّلات، أطباق رئيسية، حلويات..."
                    rows={5}
                  />
                )}
              </Section>
            )}

            {/* Accommodations (Malakiyya) */}
            {data.tier === 'malakiyya' && (
              <Section title="٨ · وسائل الراحة في القاعة" subtitle="نُعلنها لضيوفك ليأتوا مرتاحين">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Toggle label="♿ مدخل ووسائل وصول لذوي الاحتياجات الخاصة" checked={data.hasWheelchairAccess} onChange={(b) => dispatch({ type: 'set', patch: { hasWheelchairAccess: b } })} />
                  <Toggle label="🛐 غرفة صلاة" checked={data.hasPrayerRoom} onChange={(b) => dispatch({ type: 'set', patch: { hasPrayerRoom: b } })} />
                  <Toggle label="🤱 غرفة للأمهات / الرضاعة" checked={data.hasNursingRoom} onChange={(b) => dispatch({ type: 'set', patch: { hasNursingRoom: b } })} />
                  <Toggle label="🧸 منطقة لعب للأطفال" checked={data.hasKidsPlayArea} onChange={(b) => dispatch({ type: 'set', patch: { hasKidsPlayArea: b } })} />
                  <Toggle label="🅿️ خدمة Valet (تركن السيارة)" checked={data.hasValetParking} onChange={(b) => dispatch({ type: 'set', patch: { hasValetParking: b } })} />
                  <Toggle label="🚪 مداخل منفصلة (رجال / نساء)" checked={data.separateMaleFemale} onChange={(b) => dispatch({ type: 'set', patch: { separateMaleFemale: b } })} />
                </div>
                <Textarea
                  label="ملاحظات إضافية عن وسائل الراحة"
                  value={data.accommodationNote}
                  onChange={(v) => dispatch({ type: 'set', patch: { accommodationNote: v } })}
                  placeholder="أيّ تفاصيل إضافية تبي توضّحها لضيوفك..."
                  rows={3}
                />
              </Section>
            )}

            {/* Religious */}
            <Section title="٩ · النص الديني">
              <p
                className="text-sm"
                style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}
              >
                الآية القرآنية
              </p>
              <Radios
                name="verseChoice"
                value={data.verseChoice}
                onChange={(v) =>
                  dispatch({ type: 'set', patch: { verseChoice: v as 'auto' | 'tell-us' } })
                }
                options={[
                  { value: 'auto', label: 'اختاروا لي الأنسب' },
                  { value: 'tell-us', label: 'لي آية محدّدة' },
                ]}
              />
              {data.verseChoice === 'tell-us' && (
                <Textarea
                  label="اكتب الآية أو رقم السورة والآية"
                  value={data.verseNote}
                  onChange={(v) => dispatch({ type: 'set', patch: { verseNote: v } })}
                  placeholder="مثل: الروم ٢١ — أو الصق نصّ الآية"
                />
              )}

              <p
                className="text-sm pt-3"
                style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}
              >
                الدعاء الختامي
              </p>
              <Radios
                name="flourishChoice"
                value={data.flourishChoice}
                onChange={(v) =>
                  dispatch({ type: 'set', patch: { flourishChoice: v as 'auto' | 'tell-us' } })
                }
                options={[
                  { value: 'auto', label: 'اختاروا لي الأنسب' },
                  { value: 'tell-us', label: 'لي دعاء معيّن' },
                ]}
              />
              {data.flourishChoice === 'tell-us' && (
                <Textarea
                  label="اكتب الدعاء"
                  value={data.flourishNote}
                  onChange={(v) => dispatch({ type: 'set', patch: { flourishNote: v } })}
                  placeholder="مثل: بارك الله لهما وبارك عليهما"
                />
              )}
            </Section>

            {/* Design brief */}
            <Section
              title="١٠ · مواصفات التصميم"
              subtitle="هذا أهم قسم — احكِ لنا اللي تشوفه في خيالك"
            >
              <p
                className="text-sm pb-1"
                style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}
              >
                المزاج / Vibe (اختر كل ما يناسب)
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: 'royal', l: 'ملكي / فخم' },
                  { v: 'minimal', l: 'بسيط ونظيف' },
                  { v: 'modern', l: 'حديث' },
                  { v: 'classic', l: 'كلاسيكي تراثي' },
                  { v: 'feminine', l: 'ناعم / أنثوي' },
                  { v: 'masculine', l: 'جريء' },
                  { v: 'islamic', l: 'إسلامي زخرفي' },
                  { v: 'nature', l: 'طبيعة / زهور' },
                ].map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => dispatch({ type: 'toggleVibe', v: o.v })}
                    className="px-4 py-2 rounded-full text-sm transition"
                    style={{
                      background: data.designVibe.includes(o.v)
                        ? 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 100%)'
                        : 'rgba(20, 14, 39, 0.55)',
                      color: data.designVibe.includes(o.v) ? '#2a1505' : 'var(--color-ink-light)',
                      border: '1px solid rgba(184, 138, 30, 0.4)',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                    }}
                  >
                    {o.l}
                  </button>
                ))}
              </div>

              <Field
                label="اللون المفضّل / لوحة الألوان"
                value={data.paletteHint}
                onChange={(v) => dispatch({ type: 'set', patch: { paletteHint: v } })}
                placeholder="مثل: ذهبي + أبيض، أو زمردي + ذهبي"
              />

              <Textarea
                label="وصف تفصيلي للتصميم اللي تتخيّله ✨"
                value={data.designDescription}
                onChange={(v) => dispatch({ type: 'set', patch: { designDescription: v } })}
                placeholder="احكِ بكلامك: العناصر اللي تحبّها، أيّ شيء يميّز مناسبتك، الإحساس اللي تبيه يوصل للضيوف، إن كان عندك ثيم خاص بالحفل (مثل: ثيم أندلسي، حديقة، صحراء، ...)، أيّ شيء يخطر في بالك — كلّما زادت التفاصيل، كانت الدعوة أقرب لتخيّلك."
                rows={6}
              />

              <Textarea
                label="روابط مرجعية (اختياري)"
                value={data.referenceLinks}
                onChange={(v) => dispatch({ type: 'set', patch: { referenceLinks: v } })}
                placeholder="ألصق هنا روابط لبطاقات أو تصاميم أعجبتك (Pinterest، إنستا، ...) — سطر لكل رابط"
                rows={3}
              />
            </Section>

            {/* Languages */}
            {(data.tier === 'fakhira' || data.tier === 'malakiyya') && (
              <Section title="١١ · اللغات">
                <div className="flex flex-wrap gap-2">
                  {[
                    { v: 'ar', l: 'العربية (إلزامي)' },
                    { v: 'en', l: 'English' },
                    { v: 'fr', l: 'Français' },
                    ...(data.tier === 'malakiyya' ? [{ v: 'ur', l: 'اردو' }] : []),
                  ].map((o) => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => dispatch({ type: 'toggleLanguage', lang: o.v })}
                      disabled={o.v === 'ar'}
                      className="px-4 py-2 rounded-full text-sm transition disabled:opacity-100"
                      style={{
                        background: data.languages.includes(o.v)
                          ? 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 100%)'
                          : 'rgba(20, 14, 39, 0.55)',
                        color: data.languages.includes(o.v) ? '#2a1505' : 'var(--color-ink-light)',
                        border: '1px solid rgba(184, 138, 30, 0.4)',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                      }}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </Section>
            )}

            {/* Add-ons */}
            {eligibleAddons.length > 0 && (
              <Section title="١٢ · إضافات اختيارية" subtitle="مطبوعات، تسليم سريع، خدمات إضافية">
                <div className="space-y-2">
                  {eligibleAddons.map((a) => (
                    <label
                      key={a.id}
                      className="block p-4 rounded-2xl border cursor-pointer transition"
                      style={{
                        background: data.addons.includes(a.id)
                          ? 'linear-gradient(180deg, rgba(244,208,107,0.12) 0%, rgba(184,138,30,0.05) 100%)'
                          : 'rgba(20, 14, 39, 0.4)',
                        borderColor: data.addons.includes(a.id)
                          ? 'rgba(244, 208, 107, 0.55)'
                          : 'rgba(184, 138, 30, 0.25)',
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={data.addons.includes(a.id)}
                          onChange={() => dispatch({ type: 'toggleAddon', id: a.id })}
                          className="mt-1 h-5 w-5 accent-[#d4a93a]"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between gap-3 items-baseline">
                            <span
                              style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--color-gold-1)',
                                fontWeight: 700,
                                fontSize: 16,
                              }}
                            >
                              {a.name}
                            </span>
                            <span
                              className="text-gold-shim font-bold whitespace-nowrap"
                              style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}
                            >
                              + {formatPrice(a.price)}
                            </span>
                          </div>
                          <p
                            className="mt-1 text-sm leading-relaxed"
                            style={{
                              color: 'var(--color-ink-light)',
                              fontFamily: 'var(--font-body)',
                              opacity: 0.85,
                            }}
                          >
                            {a.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </Section>
            )}

            {/* Contact */}
            <Section title="١٣ · تواصلنا معك">
              <Field
                label="اسمك"
                value={data.yourName}
                onChange={(v) => dispatch({ type: 'set', patch: { yourName: v } })}
                placeholder="اسمك الكامل"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field
                  label="جوّالك (واتساب)"
                  value={data.yourPhone}
                  onChange={(v) => dispatch({ type: 'set', patch: { yourPhone: v } })}
                  placeholder="+966 5x xxx xxxx"
                  type="tel"
                  required
                />
                <Field
                  label="بريدك الإلكتروني"
                  value={data.yourEmail}
                  onChange={(v) => dispatch({ type: 'set', patch: { yourEmail: v } })}
                  placeholder="example@example.com"
                  type="email"
                />
              </div>
              <Toggle
                label="أُفضّل التواصل عبر الواتساب"
                checked={data.preferWhatsApp}
                onChange={(b) => dispatch({ type: 'set', patch: { preferWhatsApp: b } })}
              />
            </Section>

            {/* Notes */}
            <Section title="١٤ · ملاحظات إضافية" subtitle="أيّ شيء آخر تبي تخبرنا به">
              <Field
                label="تاريخ الحاجة للدعوة (اختياري)"
                type="date"
                value={data.neededByDate}
                onChange={(v) => dispatch({ type: 'set', patch: { neededByDate: v } })}
              />
              <Textarea
                label="ملاحظات حرّة"
                value={data.notes}
                onChange={(v) => dispatch({ type: 'set', patch: { notes: v } })}
                placeholder="أيّ تفاصيل تحبّ نعرفها — أمور خاصة، تفضيلات شخصية، قصص جانبية..."
                rows={4}
              />
            </Section>
          </div>

          {/* Sticky summary sidebar (desktop only) */}
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
            <div
              className="rounded-3xl p-6 border"
              style={{
                background:
                  'linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(244,208,107,0.06) 100%)',
                borderColor: 'rgba(244, 208, 107, 0.4)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <div
                className="text-xs tracking-[0.4em] uppercase mb-3 text-center"
                style={{ color: 'var(--color-gold-3)', fontFamily: 'var(--font-latin)' }}
              >
                ملخّص طلبك
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span
                  style={{
                    color: 'var(--color-ink-light)',
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  {tier.name}
                </span>
                <span
                  className="text-gold-grad font-bold"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}
                >
                  {formatPrice(tier.price)}
                </span>
              </div>
              {selectedAddons.map((a) => (
                <div key={a.id} className="flex justify-between items-baseline mb-2 text-sm">
                  <span
                    style={{
                      color: 'var(--color-ink-light)',
                      fontFamily: 'var(--font-body)',
                      opacity: 0.85,
                    }}
                  >
                    + {a.name}
                  </span>
                  <span
                    style={{
                      color: 'var(--color-gold-1)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {formatPrice(a.price)}
                  </span>
                </div>
              ))}
              <div
                className="mt-4 pt-4 border-t flex justify-between items-baseline"
                style={{ borderColor: 'rgba(184, 138, 30, 0.3)' }}
              >
                <span
                  style={{
                    color: 'var(--color-gold-1)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 18,
                  }}
                >
                  الإجمالي
                </span>
                <span
                  className="text-gold-shim font-bold"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}
                >
                  {formatPrice(total)}
                </span>
              </div>
              <div
                className="text-xs mt-1 text-center"
                style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-ui)' }}
              >
                شامل ضريبة القيمة المضافة ١٥٪
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="block w-full text-center rounded-2xl py-4 font-bold mt-6 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(180deg, #25D366 0%, #128C7E 100%)',
                  color: '#fff',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 22px rgba(37, 211, 102, 0.4)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                }}
              >
                💬 ابعث طلبك على واتساب
              </button>
              <p
                className="text-xs mt-3 text-center"
                style={{
                  color: 'var(--color-ink-dim)',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                }}
              >
                طلبك يصل لفريقنا على واتساب — نراجعه ونرسل لك رابط الدفع خلال ساعة.
                <br />استرداد كامل قبل بدء التصميم.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

/* ============================================================ */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      open
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: 'rgba(184, 138, 30, 0.3)',
        background: 'rgba(20, 14, 39, 0.5)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <summary
        className="cursor-pointer px-5 py-4 flex items-center justify-between list-none select-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-1)' }}
      >
        <div>
          <div className="text-lg font-bold">{title}</div>
          {subtitle && (
            <div
              className="text-xs mt-1 opacity-70"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <span aria-hidden="true" style={{ color: 'var(--color-gold-3)' }}>
          ▾
        </span>
      </summary>
      <div className="px-5 pb-5 space-y-4">{children}</div>
    </details>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'time' | 'email' | 'tel';
  required?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="block mb-2 text-sm"
        style={{ color: 'var(--color-gold-1)', fontFamily: 'var(--font-ui)' }}
      >
        {label}
        {required && <span style={{ color: 'var(--color-danger)' }}> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 outline-none transition focus:border-[var(--color-gold-2)]"
        style={{
          background: 'rgba(20, 14, 39, 0.65)',
          border: '1px solid rgba(184, 138, 30, 0.35)',
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          direction: 'rtl',
        }}
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span
        className="block mb-2 text-sm"
        style={{ color: 'var(--color-gold-1)', fontFamily: 'var(--font-ui)' }}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-xl px-4 py-3 outline-none transition focus:border-[var(--color-gold-2)] resize-y"
        style={{
          background: 'rgba(20, 14, 39, 0.65)',
          border: '1px solid rgba(184, 138, 30, 0.35)',
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.8,
          direction: 'rtl',
        }}
      />
    </label>
  );
}

function Radios({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((o) => (
        <label key={o.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only peer"
          />
          <div
            className="rounded-xl px-4 py-3 text-center font-bold transition peer-checked:scale-105"
            style={{
              background:
                value === o.value
                  ? 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)'
                  : 'rgba(20, 14, 39, 0.55)',
              color: value === o.value ? '#2a1505' : 'var(--color-ink-light)',
              border:
                value === o.value
                  ? '1px solid transparent'
                  : '1px solid rgba(184, 138, 30, 0.3)',
              fontFamily: 'var(--font-display)',
              boxShadow:
                value === o.value
                  ? 'inset 0 1px 0 rgba(255,255,255,0.55), 0 4px 12px rgba(184,138,30,0.4)'
                  : undefined,
            }}
          >
            {o.label}
          </div>
        </label>
      ))}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (b: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl transition hover:bg-[rgba(244,208,107,0.04)]">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative shrink-0 w-12 h-7 rounded-full transition mt-0.5"
        style={{
          background: checked
            ? 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 100%)'
            : 'rgba(184, 138, 30, 0.25)',
        }}
      >
        <span
          className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-lg transition"
          style={{ right: checked ? '2px' : 'calc(100% - 26px)' }}
        />
      </button>
      <div className="flex-1">
        <span
          style={{
            color: 'var(--color-ink-light)',
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        {hint && (
          <div
            className="text-xs mt-0.5"
            style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-body)' }}
          >
            {hint}
          </div>
        )}
      </div>
    </label>
  );
}

function timeSince(d: Date): string {
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 5) return 'الآن';
  if (sec < 60) return `قبل ${sec} ثانية`;
  const m = Math.floor(sec / 60);
  if (m < 60) return `قبل ${m} دقيقة`;
  const h = Math.floor(m / 60);
  return `قبل ${h} ساعة`;
}
