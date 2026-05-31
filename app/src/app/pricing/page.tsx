import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageShell } from '@/components/PageShell';
import {
  TIERS,
  ADD_ONS,
  ADD_ON_CATEGORIES,
  formatPriceNumber,
  type AddOnCategory,
  type AddOn,
} from '@/lib/tiers';

export const metadata = pageMetadata({
  title: 'الباقات والأسعار',
  description:
    'باقات بطاقات الدعوة الإلكترونية الفاخرة — 690 / 1,190 / 1,990 ﷼ مع إضافات اختيارية للطباعة والشارات والتسليم السريع',
  path: '/pricing',
  extraKeywords: [
    'أسعار بطاقات دعوة الكترونية',
    'باقات تصميم دعوة',
    'كم سعر دعوة الكترونية',
    'بطاقة دعوة ٧٠٠ ريال',
    'دعوة عرس بأسعار مناسبة',
  ],
});

export default function PricingPage() {
  return (
    <PageShell>
      <PricingHero />
      <main className="mx-auto max-w-6xl px-5">
        <TierGrid />
        <GuestExperience />
        <ComparisonTable />
        <TrustBar />
        <HowItWorks />
        <AddOnsSection />
        <PricingFaq />
        <FinalCta />
      </main>
    </PageShell>
  );
}

/* ============ Cosmic hero ============ */

function PricingHero() {
  return (
    <section className="hero-cosmos relative pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,213,110,0.30) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-20 w-[600px] h-[600px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(160, 90, 200, 0.25) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <div
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(244, 213, 110, 0.10)',
            border: '1px solid rgba(244, 213, 110, 0.35)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className="text-[#f4d56e] text-sm">✦</span>
          <span className="text-[#fff8d8] text-sm font-semibold">الباقات والأسعار</span>
        </div>
        <h1
          className="text-balance font-black tracking-tight text-white mb-5"
          style={{ fontSize: 'clamp(30px, 5vw, 52px)', lineHeight: 1.2 }}
        >
          اختر الباقة التي{' '}
          <span className="text-gradient-gold">تليق بمناسبتك</span>
        </h1>
        <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
          ثلاث باقات مدروسة، دفعة واحدة بلا اشتراك، شاملة ضريبة القيمة المضافة ١٥٪ — ولوحة تحكم احترافية في كل باقة.
        </p>
      </div>
    </section>
  );
}

/* ============ Tier grid ============ */

function TierGrid() {
  return (
    <section className="relative -mt-12 sm:-mt-16 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {TIERS.map((tier, i) => (
          <TierCard key={tier.id} tier={tier} index={i} />
        ))}
      </div>
    </section>
  );
}

function TierCard({ tier, index }: { tier: (typeof TIERS)[number]; index: number }) {
  const recommended = !!tier.recommended;
  return (
    <article
      className="relative bg-white rounded-3xl flex flex-col overflow-hidden ai-rise"
      style={{
        border: recommended ? '1.5px solid #f4d56e' : '1px solid var(--color-line)',
        boxShadow: recommended
          ? '0 24px 48px rgba(184, 138, 30, 0.22), 0 4px 12px rgba(15, 15, 30, 0.05)'
          : '0 12px 32px rgba(15, 15, 30, 0.08)',
        animationDelay: `${0.05 + index * 0.08}s`,
      }}
    >
      {recommended && (
        <div
          className="text-center py-2 text-[11px] font-bold uppercase tracking-[4px]"
          style={{
            background: 'linear-gradient(180deg, #f4d56e 0%, #d4a93a 100%)',
            color: '#2a1505',
            fontFamily: 'var(--font-latin)',
          }}
        >
          الأكثر طلبًا
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <h3
          className="text-center text-[var(--color-ink)] mb-1"
          style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}
        >
          {tier.name}
        </h3>

        <p className="text-center mb-6 text-sm leading-relaxed text-[var(--color-ink-mute)] min-h-[42px]">
          {tier.tagline}
        </p>

        {/* Price block */}
        <div className="text-center mb-1">
          <div
            className="inline-flex items-baseline gap-2"
            dir="ltr"
            style={{ fontFamily: 'var(--font-latin)' }}
          >
            <span
              className="text-gradient-gold font-black"
              style={{
                fontSize: 'clamp(44px, 7vw, 60px)',
                lineHeight: 1,
                letterSpacing: -1,
              }}
            >
              {formatPriceNumber(tier.price)}
            </span>
            <span className="font-extrabold text-[var(--color-gold-3)]" style={{ fontSize: 26 }}>
              ﷼
            </span>
          </div>
        </div>
        <div className="text-center mb-6 text-[11px] text-[var(--color-ink-mute)] uppercase tracking-[3px] font-semibold">
          تسليم خلال {tier.deliveryHours} ساعة · شامل الضريبة
        </div>

        <div className="border-t border-[var(--color-line)] mb-5" />

        <ul className="space-y-2.5 mb-7 flex-1 text-sm">
          {tier.features.map((f) => {
            const isHeader = f.startsWith('كل ما في');
            return (
              <li
                key={f}
                className="flex gap-2.5 items-start leading-relaxed"
                style={
                  isHeader
                    ? { color: 'var(--color-gold-4)', fontWeight: 700, marginBottom: 4 }
                    : { color: 'var(--color-ink-soft)' }
                }
              >
                {isHeader ? (
                  <span
                    className="shrink-0 mt-0.5 text-[var(--color-gold-3)]"
                    aria-hidden="true"
                  >
                    ⇡
                  </span>
                ) : (
                  <CheckIcon />
                )}
                <span>{f}</span>
              </li>
            );
          })}
        </ul>

        <Link
          href={`/order?tier=${tier.id}`}
          className={recommended ? 'btn-gold' : 'btn-ghost'}
          style={{ width: '100%' }}
        >
          اطلب باقة {tier.name} ←
        </Link>
      </div>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pchk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="9" r="8" fill="url(#pchk)" opacity="0.18" />
      <path
        d="M5 9.2 L8 12 L13.5 6"
        fill="none"
        stroke="url(#pchk)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============ Guest experience showcase ============ */

function GuestExperience() {
  return (
    <section className="mb-24">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <div
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
          style={{
            background: 'var(--color-gold-bg)',
            border: '1px solid rgba(212, 169, 58, 0.30)',
          }}
        >
          <span className="text-[var(--color-gold-3)] text-sm">✦</span>
          <span className="text-[var(--color-gold-4)] text-[11px] uppercase tracking-[3px] font-bold">
            تجربة الضيف
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          ما يراه ضيوفك بالضبط
        </h2>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          ليست بطاقة دعوة فقط — تجربة كاملة على جوّال الضيف، بأزرار واضحة وخيارات تليق بمناسبتك.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <PreviewRsvp />
        <PreviewMeal />
        <PreviewGuestCount />
        <PreviewMaps />
        <PreviewDietary />
        <PreviewPhotoPolicy />
      </div>
    </section>
  );
}

function PreviewShell({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-white rounded-3xl p-6 border border-[var(--color-line)] flex flex-col hover:border-[var(--color-gold-2)] transition-colors"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1">
        {title}
      </div>
      <div className="my-5 flex-1 flex items-center justify-center">{children}</div>
      <p className="text-xs leading-relaxed text-[var(--color-ink-mute)] text-center">{caption}</p>
    </div>
  );
}

function PreviewRsvp() {
  return (
    <PreviewShell
      title="تأكيد الحضور"
      caption="زرّان واضحان — والإشعار يصلك لحظيًّا في لوحتك"
    >
      <div className="w-full max-w-[240px] flex flex-col gap-2.5">
        <button
          type="button"
          tabIndex={-1}
          className="w-full py-3 rounded-2xl text-sm font-extrabold"
          style={{
            background: 'linear-gradient(180deg, #f4d56e 0%, #d4a93a 100%)',
            color: '#2a1505',
            boxShadow: '0 6px 16px rgba(184, 138, 30, 0.28)',
            border: '1px solid rgba(138, 104, 23, 0.20)',
          }}
        >
          سأحضر بفخر ✦
        </button>
        <button
          type="button"
          tabIndex={-1}
          className="w-full py-3 rounded-2xl text-sm font-bold"
          style={{
            background: '#ffffff',
            color: 'var(--color-ink-soft)',
            border: '1.5px solid var(--color-line)',
          }}
        >
          أعتذر مع رسالة
        </button>
      </div>
    </PreviewShell>
  );
}

function PreviewMeal() {
  const meals: { label: string; selected?: boolean }[] = [
    { label: 'لحم' },
    { label: 'دجاج', selected: true },
    { label: 'سمك' },
    { label: 'نباتي' },
  ];
  return (
    <PreviewShell
      title="تفضيل الوجبة"
      caption="كل ضيف يختار وجبته — تراها مجمّعة لمنسّق الحفل"
    >
      <div className="flex flex-wrap gap-2 justify-center max-w-[260px]">
        {meals.map((m) => (
          <span
            key={m.label}
            className="px-4 py-2 rounded-full text-sm font-bold"
            style={
              m.selected
                ? {
                    background: 'linear-gradient(135deg, #f4d56e 0%, #d4a93a 100%)',
                    color: '#2a1505',
                    boxShadow: '0 4px 10px rgba(184, 138, 30, 0.25)',
                  }
                : {
                    background: '#ffffff',
                    color: 'var(--color-ink-soft)',
                    border: '1.5px solid var(--color-line)',
                  }
            }
          >
            {m.label}
          </span>
        ))}
      </div>
    </PreviewShell>
  );
}

function PreviewGuestCount() {
  const Row = ({ label, value }: { label: string; value: number }) => (
    <div className="flex items-center justify-between gap-3 w-full">
      <span className="text-sm font-bold text-[var(--color-ink-soft)]">{label}</span>
      <div
        className="flex items-center rounded-full overflow-hidden"
        style={{ border: '1.5px solid var(--color-line)' }}
      >
        <Stepper symbol="−" />
        <span
          className="w-10 text-center text-sm font-extrabold text-[var(--color-ink)]"
          style={{ fontFamily: 'var(--font-latin)' }}
        >
          {value}
        </span>
        <Stepper symbol="+" />
      </div>
    </div>
  );
  return (
    <PreviewShell
      title="عدد المرافقين"
      caption="حساب دقيق للوجبات وخدمات الأطفال"
    >
      <div className="w-full max-w-[240px] flex flex-col gap-3">
        <Row label="البالغون" value={2} />
        <Row label="الأطفال" value={1} />
      </div>
    </PreviewShell>
  );
}

function Stepper({ symbol }: { symbol: string }) {
  return (
    <span
      className="w-9 h-9 flex items-center justify-center text-base font-extrabold text-[var(--color-gold-4)]"
      style={{ background: 'var(--color-gold-bg)' }}
    >
      {symbol}
    </span>
  );
}

function PreviewMaps() {
  const apps = [
    { label: 'Google Maps' },
    { label: 'Apple Maps' },
    { label: 'Waze' },
  ];
  return (
    <PreviewShell
      title="الموقع الجغرافي"
      caption="اختصار لموقع القاعة في أيّ تطبيق خرائط"
    >
      <div className="flex flex-col gap-2 w-full max-w-[240px]">
        {apps.map((a) => (
          <div
            key={a.label}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white"
            style={{ border: '1.5px solid var(--color-line)' }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: 'var(--color-gold-bg)',
                color: 'var(--color-gold-4)',
              }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 14s5-4.5 5-8.5a5 5 0 1 0-10 0C3 9.5 8 14 8 14Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="8" cy="5.5" r="1.7" fill="currentColor" />
              </svg>
            </span>
            <span
              className="text-sm font-bold text-[var(--color-ink-soft)]"
              style={{ fontFamily: 'var(--font-latin)' }}
              dir="ltr"
            >
              {a.label}
            </span>
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

function PreviewDietary() {
  const chips: { label: string; on?: boolean }[] = [
    { label: 'مكسرات', on: true },
    { label: 'غلوتين' },
    { label: 'ألبان', on: true },
    { label: 'مأكولات بحرية' },
  ];
  return (
    <PreviewShell
      title="الحساسيات الغذائية"
      caption="تنبيهات للمطبخ — يتجنّب فريق القاعة أيّ مفاجآت"
    >
      <div className="flex flex-wrap gap-2 justify-center max-w-[260px]">
        {chips.map((c) => (
          <span
            key={c.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={
              c.on
                ? {
                    background: 'var(--color-gold-bg)',
                    color: 'var(--color-gold-4)',
                    border: '1.5px solid var(--color-gold-2)',
                  }
                : {
                    background: '#ffffff',
                    color: 'var(--color-ink-mute)',
                    border: '1.5px solid var(--color-line)',
                  }
            }
          >
            {c.on && <span aria-hidden="true">✓</span>}
            {c.label}
          </span>
        ))}
      </div>
    </PreviewShell>
  );
}

function PreviewPhotoPolicy() {
  const policies: { label: string; tone: 'on' | 'off' | 'mid' }[] = [
    { label: 'مسموح', tone: 'off' },
    { label: 'منطقة مخصّصة', tone: 'on' },
    { label: 'ممنوع', tone: 'off' },
  ];
  return (
    <PreviewShell
      title="سياسة التصوير"
      caption="وضوح لضيوفك من البداية — لا حرج ولا التباس"
    >
      <div className="flex flex-col gap-2 w-full max-w-[240px]">
        {policies.map((p) => (
          <div
            key={p.label}
            className="flex items-center justify-between px-4 py-2.5 rounded-2xl"
            style={
              p.tone === 'on'
                ? {
                    background: 'linear-gradient(135deg, rgba(244,213,110,0.18) 0%, rgba(212,169,58,0.10) 100%)',
                    border: '1.5px solid var(--color-gold-2)',
                  }
                : {
                    background: '#ffffff',
                    border: '1.5px solid var(--color-line)',
                  }
            }
          >
            <span
              className={
                p.tone === 'on'
                  ? 'text-sm font-extrabold text-[var(--color-gold-4)]'
                  : 'text-sm font-bold text-[var(--color-ink-mute)]'
              }
            >
              {p.label}
            </span>
            {p.tone === 'on' && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                style={{
                  background: 'linear-gradient(135deg, #f4d56e 0%, #d4a93a 100%)',
                  color: '#2a1505',
                }}
                aria-label="مختارة"
              >
                ✓
              </span>
            )}
          </div>
        ))}
      </div>
    </PreviewShell>
  );
}

/* ============ Comparison table ============ */

type CompareValue = string | boolean;

function ComparisonTable() {
  const tierLabels = ['المُمَيَّزَة', 'الفاخِرَة', 'المَلَكِيَّة'] as const;
  const recommendedIndex = 1;

  const rows: { label: string; values: [CompareValue, CompareValue, CompareValue] }[] = [
    { label: 'نمط التصميم',              values: ['احترافي جاهز', 'مخصّص بألوانك', 'هويّة بصرية كاملة'] },
    { label: 'وقت التسليم',              values: ['٤٨ ساعة', '٢٤ ساعة', '١٢ ساعة'] },
    { label: 'صلاحية الرابط',            values: ['٩٠ يومًا', '٦ أشهر', 'سنتان + أرشيف'] },
    { label: 'التعديلات المجانية',        values: ['تعديل واحد', '٣ تعديلات', 'غير محدودة'] },
    { label: 'لغات الدعوة',               values: ['عربي', 'عربي + إنجليزي', 'حتى ٤ لغات'] },
    { label: 'باركود فردي لكل ضيف',       values: [false, true, true] },
    { label: 'تفضيلات طعام الضيوف',       values: [false, true, true] },
    { label: 'رسالة واتساب باسم الضيف',   values: [false, true, true] },
    { label: 'شعار / مونوغرام مخصّص',    values: [false, false, true] },
    { label: 'شارات دخول للطباعة',        values: [false, false, true] },
    { label: 'صفحة قائمة هدايا',          values: [false, false, true] },
    { label: 'مدير حساب مخصّص',           values: [false, false, true] },
  ];

  return (
    <section className="mb-24">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          مقارنة سريعة بين الباقات
        </h2>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          أهمّ الفروقات التي تساعدك على الاختيار — وكل ما عداها مذكور في تفاصيل كل باقة في الأعلى.
        </p>
      </div>

      <div
        className="rounded-3xl overflow-hidden bg-white border border-[var(--color-line)]"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm"
            style={{ minWidth: 640, borderCollapse: 'collapse' }}
          >
            <thead>
              <tr style={{ background: 'var(--color-bg-alt)' }}>
                <th className="text-right p-4 font-bold text-[var(--color-ink-mute)] text-xs uppercase tracking-widest">
                  الميزة
                </th>
                {tierLabels.map((name, i) => (
                  <th
                    key={name}
                    className="p-4 text-center font-extrabold text-base"
                    style={
                      i === recommendedIndex
                        ? {
                            background: 'var(--color-gold-bg)',
                            color: 'var(--color-gold-4)',
                          }
                        : { color: 'var(--color-ink)' }
                    }
                  >
                    {name}
                    {i === recommendedIndex && (
                      <div className="text-[9px] uppercase tracking-[3px] text-[var(--color-gold-3)] font-bold mt-1">
                        الأكثر طلبًا
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} style={{ borderTop: '1px solid var(--color-line-soft)' }}>
                  <td className="text-right p-4 font-semibold text-[var(--color-ink-soft)] whitespace-nowrap">
                    {row.label}
                  </td>
                  {tierLabels.map((tier, ci) => {
                    const v = row.values[ci];
                    return (
                      <td
                        key={tier}
                        className="p-4 text-center text-[var(--color-ink-soft)]"
                        style={
                          ci === recommendedIndex
                            ? { background: 'rgba(244, 213, 110, 0.06)' }
                            : undefined
                        }
                      >
                        {typeof v === 'boolean' ? (
                          v ? <ComparisonCheck /> : <ComparisonDash />
                        ) : (
                          <span className="text-sm font-semibold">{v}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ComparisonCheck() {
  return (
    <span
      className="inline-flex items-center justify-center w-7 h-7 rounded-full"
      style={{
        background: 'linear-gradient(135deg, #f4d56e 0%, #d4a93a 100%)',
        boxShadow: '0 2px 6px rgba(184, 138, 30, 0.25)',
      }}
      aria-label="مشمول"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M3 7.2 L6 10 L11 4.5"
          stroke="#2a1505"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ComparisonDash() {
  return (
    <span className="inline-block text-[var(--color-ink-faint)] text-xl" aria-label="غير مشمول">
      —
    </span>
  );
}

/* ============ Trust bar ============ */

function TrustBar() {
  const items = [
    { t: 'بوّابة دفع آمنة معتمدة',  d: 'مدى · Apple Pay · فيزا · ماستركارد' },
    { t: 'دفعة واحدة، لا اشتراك',     d: 'تدفع مرّة وتمتلك كل ما في الباقة' },
    { t: 'استرداد قبل بدء التصميم',  d: 'كاملة ١٠٠٪ — بلا أيّ شروط أو خصومات' },
    { t: 'فاتورة ضريبية رسمية',      d: 'تصلك بالبريد خلال يوم من الدفع' },
  ];
  return (
    <section className="mb-24">
      <div
        className="rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        style={{
          background:
            'linear-gradient(180deg, var(--color-bg-alt) 0%, #ffffff 100%)',
          border: '1px solid var(--color-line)',
        }}
      >
        {items.map((it) => (
          <div key={it.t} className="text-center sm:text-right">
            <div className="text-sm font-extrabold text-[var(--color-ink)] mb-1">{it.t}</div>
            <div className="text-xs text-[var(--color-ink-mute)] leading-relaxed">{it.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ How it works ============ */

function HowItWorks() {
  const steps = [
    {
      n: '١',
      title: 'اطلب وادفع',
      time: 'دقيقتان',
      desc: 'املأ نموذج طلبك بتفاصيل المناسبة، اختر باقتك، وادفع دفعة واحدة آمنة عبر مدى أو Apple Pay.',
    },
    {
      n: '٢',
      title: 'فريقنا يصمّم',
      time: '١٢ – ٤٨ ساعة',
      desc: 'مصمّم محترف يصنع دعوتك حسب تفاصيلك، ويعرضها عليك للاعتماد قبل الإرسال للضيوف.',
    },
    {
      n: '٣',
      title: 'شارك وتابع',
      time: 'فوريًّا',
      desc: 'رابط فاخر جاهز للواتساب، ولوحة تحكم لحظية تعرض لك الحاضرين والمعتذرين وتفضيلاتهم.',
    },
  ];

  return (
    <section className="mb-24">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          كيف تعمل دعوتي؟
        </h2>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          ثلاث خطوات بسيطة — تطلب اليوم، يصلك تصميمك جاهزًا للمشاركة.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-12 right-[16.67%] left-[16.67%] h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, var(--color-gold-2) 50%, transparent 100%)',
            opacity: 0.35,
          }}
        />

        {steps.map((s) => (
          <div
            key={s.title}
            className="relative bg-white rounded-3xl p-6 sm:p-7 text-center"
            style={{
              border: '1px solid var(--color-line)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              className="relative mx-auto mb-5 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black"
              style={{
                background: 'linear-gradient(135deg, #f4d56e 0%, #d4a93a 100%)',
                color: '#2a1505',
                boxShadow: '0 6px 18px rgba(184, 138, 30, 0.30)',
              }}
            >
              {s.n}
            </div>

            <h3 className="text-lg font-extrabold text-[var(--color-ink)] mb-1">{s.title}</h3>
            <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-3">
              {s.time}
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-ink-mute)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ Add-ons ============ */

function AddOnsSection() {
  const orderedCategories: AddOnCategory[] = ['print', 'premium', 'event', 'digital'];
  const grouped: Record<AddOnCategory, AddOn[]> = {
    print: [], premium: [], event: [], digital: [],
  };
  for (const a of ADD_ONS) grouped[a.category].push(a);

  return (
    <section className="mb-20">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          الإضافات الاختيارية
        </h2>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          المطبوعات الفيزيائية والخدمات الإضافية — مستقلّة عن سعر الباقة، تختارها عند تعبئة طلبك.
        </p>
      </div>

      <div className="space-y-12">
        {orderedCategories.map((cat) => (
          <AddOnCategoryBlock key={cat} category={cat} addons={grouped[cat]} />
        ))}
      </div>
    </section>
  );
}

function AddOnCategoryBlock({
  category,
  addons,
}: {
  category: AddOnCategory;
  addons: AddOn[];
}) {
  if (addons.length === 0) return null;
  const meta = ADD_ON_CATEGORIES[category];
  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] mb-1">
            {meta.label}
          </h3>
          <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed">
            {meta.description}
          </p>
        </div>
        <span className="text-xs text-[var(--color-ink-faint)] font-semibold">
          {addons.length} {addons.length === 1 ? 'إضافة' : 'إضافات'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addons.map((a) => (
          <AddOnRow key={a.id} addon={a} />
        ))}
      </div>
    </div>
  );
}

function AddOnRow({ addon }: { addon: AddOn }) {
  const tierNames: Record<string, string> = {
    mumayyaza: 'المميّزة',
    fakhira: 'الفاخرة',
    malakiyya: 'الملكية',
  };
  return (
    <div
      className="p-5 rounded-2xl bg-white border border-[var(--color-line)] hover:border-[var(--color-gold-2)] transition-colors"
      style={{ boxShadow: 'var(--shadow-xs)' }}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <h4 className="text-sm font-bold text-[var(--color-ink)] leading-snug">
          {addon.name}
        </h4>
        {addon.price > 0 ? (
          <div
            className="text-base font-extrabold text-[var(--color-ink)] whitespace-nowrap shrink-0"
            dir="ltr"
            style={{ fontFamily: 'var(--font-latin)' }}
          >
            <span className="text-[var(--color-gold-3)] ml-1">+</span>
            {formatPriceNumber(addon.price)}{' '}
            <span className="text-[var(--color-gold-3)] text-sm">﷼</span>
          </div>
        ) : (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold-3)] bg-[var(--color-gold-bg)] px-2 py-1 rounded-full shrink-0">
            بعرض سعر
          </span>
        )}
      </div>
      <p className="text-xs leading-relaxed text-[var(--color-ink-mute)] mb-3">
        {addon.description}
      </p>
      <div className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-ink-faint)]">
        <span className="text-[var(--color-ink-mute)]">متاحة في:</span>{' '}
        {addon.availableFor.map((t, i) => (
          <span key={t}>
            {i > 0 && ' · '}
            {tierNames[t]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============ Pricing FAQ ============ */

function PricingFaq() {
  const items: { q: string; a: string }[] = [
    {
      q: 'هل أحتاج للدفع أكثر من مرّة؟',
      a: 'لا، دفعة واحدة فقط — لا اشتراك ولا تجديد. السعر شامل ضريبة القيمة المضافة ١٥٪ وكلّ ما تتضمّنه باقتك.',
    },
    {
      q: 'هل يمكنني الترقية لباقة أعلى لاحقًا؟',
      a: 'نعم. تدفع الفرق فقط بين الباقتين، ونضيف ميزات الباقة الأعلى لدعوتك خلال نفس مدّة تسليم الباقة الجديدة.',
    },
    {
      q: 'هل المطبوعات الفيزيائية مشمولة في السعر؟',
      a: 'لا. كل الباقات رقمية بالكامل. المطبوعات (بطاقات ورقية، شارات VIP، قوائم طعام، بطاقات شكر) إضافات مستقلّة تختارها من قسم الإضافات أعلاه، وتُحسب حسب الكمية والمقاس وجودة الطباعة.',
    },
    {
      q: 'ماذا لو لم أعجب بالتصميم؟',
      a: 'استرداد كامل ١٠٠٪ قبل بدء التصميم. بعد البدء، يحقّ لك تعديلات مجانية حسب الباقة (واحدة في المميّزة، ٣ في الفاخرة، غير محدودة في الملكية) — وفريقنا يعدّل حتّى تصل للنتيجة التي تتخيّلها.',
    },
  ];

  return (
    <section className="mb-24">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          أسئلة قبل الطلب
        </h2>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          أهمّ الأسئلة في لحظة الشراء — والقائمة الكاملة في{' '}
          <Link
            href="/faq"
            className="text-[var(--color-gold-3)] font-semibold underline underline-offset-4 hover:text-[var(--color-gold-4)] transition-colors"
          >
            صفحة الأسئلة الشائعة
          </Link>
          .
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl p-5 bg-white border border-[var(--color-line)] hover:border-[var(--color-gold-2)] cursor-pointer transition"
            style={{ boxShadow: 'var(--shadow-xs)' }}
          >
            <summary className="flex items-center justify-between gap-3 list-none text-sm sm:text-base font-bold text-[var(--color-ink)]">
              <span className="flex-1 min-w-0 break-words leading-snug">{q}</span>
              <span
                className="text-2xl shrink-0 transition-transform group-open:rotate-45 text-[var(--color-gold-3)]"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-[var(--color-ink-soft)] text-sm">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ============ Final CTA ============ */

function FinalCta() {
  return (
    <section className="mb-24">
      <div
        className="rounded-3xl p-10 sm:p-14 text-center text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a25 50%, #2a1505 100%)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(244,213,110,0.6) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-gradient-gold relative">
          جاهز للبدء؟
        </h2>
        <p className="text-base sm:text-lg text-white/75 mb-7 max-w-lg mx-auto relative">
          املأ نموذج طلبك في دقيقتَين — وادفع عند اعتماد التفاصيل ليبدأ فريقنا التصميم.
        </p>
        <Link href="/order" className="btn-gold relative">
          اطلب دعوتك الآن ←
        </Link>
      </div>
    </section>
  );
}
