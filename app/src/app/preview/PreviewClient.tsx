'use client';

/**
 * PreviewClient — interactive sandbox for the live card preview.
 *
 * The visitor types their names, date, venue, and switches between the
 * six house styles; AnimatedInvitation re-renders live with their data.
 * The card preview is keyed by `${style}|${groomName}|${brideName}` so
 * any change replays the per-style cinematic entrance from scratch.
 *
 * No persistence — the form is intentionally throwaway. Its only job is
 * to let a prospect see themselves in the product before paying.
 */

import { AnimatedInvitation } from '@/components/AnimatedInvitation';
import type { SampleStyle } from '@/components/SampleCardTile';
import { ALL_STYLE_SLUGS, STYLE_DETAILS } from '@/lib/style-details';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface FormData {
  groomName: string;
  brideName: string;
  date: string;
  venue: string;
}

const DEFAULT_STYLE: SampleStyle = 'royal-cosmos';

function defaultsFor(style: SampleStyle): FormData {
  const d = STYLE_DETAILS[style];
  return {
    groomName: d.sampleGroom,
    brideName: d.sampleBride ?? '',
    date: d.sampleDate,
    venue: d.sampleVenue,
  };
}

export function PreviewClient() {
  const [style, setStyle] = useState<SampleStyle>(DEFAULT_STYLE);
  const [form, setForm] = useState<FormData>(() => defaultsFor(DEFAULT_STYLE));
  const [touched, setTouched] = useState(false);

  // Switching style refreshes the field defaults — but only if the user
  // hasn't already personalized the form. Lets them try each style with
  // their own names, but offers a clean reset back to sample data.
  function pickStyle(next: SampleStyle) {
    if (next === style) return;
    setStyle(next);
    if (!touched) setForm(defaultsFor(next));
  }

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setTouched(true);
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetToSample() {
    setForm(defaultsFor(style));
    setTouched(false);
  }

  // Animation replay key — any meaningful change replays the entrance.
  const animKey = useMemo(
    () => `${style}|${form.groomName}|${form.brideName}`,
    [style, form.groomName, form.brideName],
  );

  return (
    <div className="mx-auto max-w-6xl px-5 pt-10 pb-20">
      <header className="text-center mb-10 max-w-2xl mx-auto">
        <div
          className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full"
          style={{
            background: 'var(--color-gold-bg)',
            border: '1px solid rgba(212, 169, 58, 0.30)',
          }}
        >
          <span className="text-[var(--color-gold-3)] text-sm">✦</span>
          <span className="text-[var(--color-gold-4)] text-[11px] uppercase tracking-[3px] font-bold">
            معاينة حيّة
          </span>
        </div>
        <h1
          className="text-balance font-black tracking-tight text-[var(--color-ink)] mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.2 }}
        >
          اكتب اسمك · شاهد دعوتك ترتقي
        </h1>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          غيّر الأسماء والتاريخ والمكان، وانتقل بين الأنماط الستة — البطاقة على اليسار تتجدّد فورًا
          بنفس التفاصيل التي ستصل لضيوفك.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.05fr] gap-8 lg:gap-12 items-start">
        {/* === Left (RTL: right): the live invitation === */}
        <div className="lg:sticky lg:top-24">
          <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-3 text-center flex items-center justify-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full ai-twinkle bg-[var(--color-gold-3)]"
            />
            معاينة لحظية
          </div>
          <div key={animKey}>
            <AnimatedInvitation style={style} data={form} />
          </div>
          <div className="mt-4 text-center">
            <span className="text-xs text-[var(--color-ink-mute)]">
              المؤثرات الكاملة تظهر في الدعوة النهائية على جوّال ضيفك
            </span>
          </div>
        </div>

        {/* === Right (RTL: left): the form === */}
        <div>
          <StylePicker style={style} onPick={pickStyle} />

          <div
            className="mt-8 rounded-3xl p-6 sm:p-7 bg-white"
            style={{
              border: '1px solid var(--color-line)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div className="flex items-baseline justify-between gap-3 mb-5">
              <h2 className="text-lg font-extrabold text-[var(--color-ink)]">تفاصيل دعوتك</h2>
              {touched && (
                <button
                  type="button"
                  onClick={resetToSample}
                  className="text-xs font-bold text-[var(--color-gold-3)] hover:text-[var(--color-gold-4)] transition"
                >
                  ↻ إرجاع للقيم الافتراضية
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="اسم العريس"
                value={form.groomName}
                onChange={(v) => update('groomName', v)}
                placeholder="فيصل الراجحي"
              />
              <Field
                label="اسم العروس"
                value={form.brideName}
                onChange={(v) => update('brideName', v)}
                placeholder="كريمة الفوزان"
              />
              <Field
                label="التاريخ"
                value={form.date}
                onChange={(v) => update('date', v)}
                placeholder="الجمعة ٤ محرّم ١٤٤٨"
              />
              <Field
                label="المكان"
                value={form.venue}
                onChange={(v) => update('venue', v)}
                placeholder="الرياض · الفيصلية"
              />
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-[var(--color-ink-faint)] text-center">
              هذه معاينة سريعة فقط. الدعوة الفعلية تُصمَّم على يد فريقنا بتفاصيل أكثر — آية، دعاء،
              باركود، خرائط، RSVP — كلّها مذكورة في تفاصيل الباقة.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/order?style=${style}`} className="btn-gold text-center">
              اطلب هذا النمط الآن ←
            </Link>
            <Link
              href={`/examples/${style}`}
              className="btn-ghost text-center"
              style={{ width: '100%' }}
            >
              تفاصيل النمط الكاملة
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Style picker ============ */

function StylePicker({
  style,
  onPick,
}: {
  style: SampleStyle;
  onPick: (s: SampleStyle) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-3">
        النمط
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {ALL_STYLE_SLUGS.map((slug) => {
          const d = STYLE_DETAILS[slug];
          const active = slug === style;
          return (
            <button
              key={slug}
              type="button"
              onClick={() => onPick(slug)}
              className="text-right rounded-2xl p-3 transition-all"
              style={
                active
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(244,213,110,0.18) 0%, rgba(212,169,58,0.08) 100%)',
                      border: '1.5px solid var(--color-gold-2)',
                      boxShadow: '0 6px 18px rgba(184, 138, 30, 0.18)',
                    }
                  : {
                      background: '#ffffff',
                      border: '1px solid var(--color-line)',
                    }
              }
            >
              <div
                className="text-sm font-extrabold leading-tight mb-0.5"
                style={{
                  color: active ? 'var(--color-gold-4)' : 'var(--color-ink)',
                }}
              >
                {d.name}
              </div>
              <div className="text-[11px] text-[var(--color-ink-mute)] leading-tight">{d.hero}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============ Field ============ */

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-[var(--color-ink-soft)] mb-1.5">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm bg-white outline-none transition-colors"
        style={{
          border: '1.5px solid var(--color-line)',
          color: 'var(--color-ink)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-gold-2)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-line)';
        }}
      />
    </label>
  );
}
