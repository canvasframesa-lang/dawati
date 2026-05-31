/**
 * GuestInteractionShowcase — a per-style cinematic showcase of the
 * controls a guest taps (RSVP buttons + meal chips) and the
 * notifications that arrive in the host's dashboard.
 *
 * Server-rendered. All motion comes from existing CSS keyframes:
 *   ai-rise         — line/element reveal
 *   ai-line         — gold underline scale
 *   ai-bloom        — corner ornament bloom
 *   ai-flare        — one-shot lens-flare sweep across the stage
 *   notif-enter     — lock-screen notification entrance
 *
 * Each of the 6 invitation styles maps to its own THEME — palette,
 * font, primary button treatment, notification surface, and a small
 * inline-SVG glyph that reads in the brand's vocabulary.
 *
 * Reduced-motion is honored automatically by the .ai-* fallbacks
 * defined in globals.css.
 */

import type { SampleStyle } from '@/components/SampleCardTile';
import type { CSSProperties, ReactNode } from 'react';

/* ============ Per-style theme map =============================== */

interface StyleTheme {
  stageBg: string;
  stageBorder: string;
  flareColor: string;

  surfaceBg: string;
  surfaceBorder: string;

  notifBg: string;
  notifBorder: string;
  notifShadow: string;

  ink: string;
  inkMuted: string;
  inkLabel: string;

  primaryFill: string;
  primaryText: string;
  primaryShadow: string;

  ghostFill: string;
  ghostText: string;
  ghostBorder: string;

  rule: string;
  font: string;
  glyph: ReactNode;
  enLabel: string;
  iconBg: string;
  iconText: string;
}

const THEMES: Record<SampleStyle, StyleTheme> = {
  'royal-cosmos': {
    stageBg:
      'radial-gradient(ellipse 60% 40% at 30% 20%, rgba(244,213,110,0.18) 0%, transparent 65%), linear-gradient(180deg, #050410 0%, #0a0820 55%, #050410 100%)',
    stageBorder: 'rgba(244, 213, 110, 0.22)',
    flareColor: 'rgba(255, 248, 216, 0.18)',
    surfaceBg: 'rgba(20, 14, 39, 0.55)',
    surfaceBorder: 'rgba(244, 213, 110, 0.30)',
    notifBg: 'rgba(28, 22, 18, 0.60)',
    notifBorder: 'rgba(244, 213, 110, 0.20)',
    notifShadow: '0 8px 22px rgba(0, 0, 0, 0.4)',
    ink: '#fff8d8',
    inkMuted: '#c9a23d',
    inkLabel: '#f4d56e',
    primaryFill: 'linear-gradient(180deg, #f4d56e 0%, #d4a93a 100%)',
    primaryText: '#2a1505',
    primaryShadow: '0 8px 22px rgba(244, 213, 110, 0.30)',
    ghostFill: 'transparent',
    ghostText: '#fff8d8',
    ghostBorder: 'rgba(244, 213, 110, 0.45)',
    rule: 'rgba(244, 213, 110, 0.25)',
    font: 'var(--font-aref-ruqaa)',
    glyph: <StarGlyph />,
    enLabel: 'ROYAL · LIVE',
    iconBg: 'linear-gradient(135deg, #fff8d8 0%, #f4d56e 35%, #c9a23d 70%, #8a6817 100%)',
    iconText: '#3a2806',
  },
  'modern-minimal': {
    stageBg: 'linear-gradient(180deg, #fafaf7 0%, #ffffff 100%)',
    stageBorder: 'rgba(212, 169, 58, 0.28)',
    flareColor: 'rgba(212, 169, 58, 0.20)',
    surfaceBg: '#ffffff',
    surfaceBorder: '#e8e4dc',
    notifBg: '#ffffff',
    notifBorder: '#e8e4dc',
    notifShadow: '0 8px 22px rgba(15, 15, 30, 0.08)',
    ink: '#0e0e14',
    inkMuted: '#6a6a7a',
    inkLabel: '#8a6817',
    primaryFill: '#0e0e14',
    primaryText: '#ffffff',
    primaryShadow: '0 6px 18px rgba(15, 15, 30, 0.18)',
    ghostFill: '#ffffff',
    ghostText: '#0e0e14',
    ghostBorder: '#0e0e14',
    rule: '#d4a93a',
    font: 'var(--font-tajawal)',
    glyph: <DotGlyph />,
    enLabel: 'MODERN · LIVE',
    iconBg: '#0e0e14',
    iconText: '#ffffff',
  },
  'andalusian-arch': {
    stageBg: 'linear-gradient(180deg, #f7ecd1 0%, #f0deb0 100%)',
    stageBorder: 'rgba(138, 104, 23, 0.30)',
    flareColor: 'rgba(255, 232, 170, 0.30)',
    surfaceBg: 'rgba(253, 246, 227, 0.85)',
    surfaceBorder: 'rgba(138, 104, 23, 0.35)',
    notifBg: 'rgba(254, 249, 236, 0.90)',
    notifBorder: 'rgba(138, 104, 23, 0.30)',
    notifShadow: '0 6px 18px rgba(90, 67, 16, 0.18)',
    ink: '#3a2806',
    inkMuted: '#5a4310',
    inkLabel: '#8a6817',
    primaryFill: 'linear-gradient(135deg, #b88a1e 0%, #8a6817 100%)',
    primaryText: '#fdf6e3',
    primaryShadow: '0 6px 18px rgba(138, 104, 23, 0.32)',
    ghostFill: 'transparent',
    ghostText: '#3a2806',
    ghostBorder: '#b88a1e',
    rule: 'rgba(138, 104, 23, 0.35)',
    font: 'var(--font-reem-kufi)',
    glyph: <ArchGlyph />,
    enLabel: 'AL-ANDALUS · LIVE',
    iconBg: 'linear-gradient(135deg, #b88a1e 0%, #8a6817 100%)',
    iconText: '#fdf6e3',
  },
  'classical-manuscript': {
    stageBg: 'radial-gradient(ellipse 100% 100% at 50% 50%, #fef7e3 0%, #f5e8c0 100%)',
    stageBorder: 'rgba(138, 104, 23, 0.32)',
    flareColor: 'rgba(212, 169, 58, 0.20)',
    surfaceBg: 'rgba(254, 249, 236, 0.90)',
    surfaceBorder: 'rgba(138, 104, 23, 0.32)',
    notifBg: 'rgba(254, 249, 236, 0.92)',
    notifBorder: 'rgba(138, 104, 23, 0.25)',
    notifShadow: '0 6px 16px rgba(90, 67, 16, 0.16)',
    ink: '#3a1f08',
    inkMuted: '#5a4310',
    inkLabel: '#8a6817',
    primaryFill: 'linear-gradient(135deg, #8a6817 0%, #5a4310 100%)',
    primaryText: '#faf5e6',
    primaryShadow: '0 6px 16px rgba(138, 104, 23, 0.30)',
    ghostFill: 'transparent',
    ghostText: '#3a1f08',
    ghostBorder: '#8a6817',
    rule: 'rgba(138, 104, 23, 0.32)',
    font: 'var(--font-amiri)',
    glyph: <FlourishGlyph />,
    enLabel: 'MANUSCRIPT · LIVE',
    iconBg: 'linear-gradient(135deg, #8a6817 0%, #5a4310 100%)',
    iconText: '#faf5e6',
  },
  'botanical-rose': {
    stageBg: 'linear-gradient(180deg, #fdf2ee 0%, #f5d2c8 100%)',
    stageBorder: 'rgba(160, 64, 80, 0.28)',
    flareColor: 'rgba(244, 158, 160, 0.20)',
    surfaceBg: '#ffffff',
    surfaceBorder: 'rgba(160, 64, 80, 0.25)',
    notifBg: '#ffffff',
    notifBorder: 'rgba(160, 64, 80, 0.22)',
    notifShadow: '0 8px 22px rgba(160, 64, 80, 0.14)',
    ink: '#5a1a25',
    inkMuted: '#a04050',
    inkLabel: '#a04050',
    primaryFill: 'linear-gradient(135deg, #e09a85 0%, #a76040 100%)',
    primaryText: '#ffffff',
    primaryShadow: '0 6px 18px rgba(167, 96, 64, 0.32)',
    ghostFill: 'transparent',
    ghostText: '#5a1a25',
    ghostBorder: '#a04050',
    rule: 'rgba(160, 64, 80, 0.30)',
    font: 'var(--font-el-messiri)',
    glyph: <RoseGlyph />,
    enLabel: 'BOTANICAL · LIVE',
    iconBg: 'linear-gradient(135deg, #e09a85 0%, #a76040 100%)',
    iconText: '#ffffff',
  },
  'geometric-kufic': {
    stageBg: 'linear-gradient(135deg, #0e1d2e 0%, #1a2840 50%, #0e1d2e 100%)',
    stageBorder: 'rgba(212, 169, 58, 0.32)',
    flareColor: 'rgba(244, 213, 110, 0.18)',
    surfaceBg: 'rgba(20, 32, 56, 0.55)',
    surfaceBorder: 'rgba(212, 169, 58, 0.35)',
    notifBg: 'rgba(26, 40, 64, 0.65)',
    notifBorder: 'rgba(212, 169, 58, 0.28)',
    notifShadow: '0 8px 22px rgba(0, 0, 0, 0.35)',
    ink: '#fff8d8',
    inkMuted: '#d4a93a',
    inkLabel: '#f4d56e',
    primaryFill: 'linear-gradient(135deg, #f4d56e 0%, #d4a93a 100%)',
    primaryText: '#0e1d2e',
    primaryShadow: '0 8px 22px rgba(244, 213, 110, 0.28)',
    ghostFill: 'transparent',
    ghostText: '#fff8d8',
    ghostBorder: 'rgba(212, 169, 58, 0.55)',
    rule: 'rgba(212, 169, 58, 0.32)',
    font: 'var(--font-cairo)',
    glyph: <DiamondGlyph />,
    enLabel: 'KUFIC · LIVE',
    iconBg: 'linear-gradient(135deg, #f4d56e 0%, #d4a93a 100%)',
    iconText: '#0e1d2e',
  },
};

/* ============ Per-style notification scripts ===================== */

interface Notif {
  title: string;
  body: string;
}

/**
 * Each style's preview gets its own four-notification script — names and
 * tone tuned to the occasion (wedding vs engagement vs aqiqa vs women's
 * reception vs graduation). Keeps the showcase feeling authentic to the
 * style's character, not a generic copy-paste.
 */
const NOTIFICATIONS: Record<SampleStyle, Notif[]> = {
  'royal-cosmos': [
    { title: 'تأكيد حضور', body: 'د. ناصر الراجحي أكّد حضوره' },
    { title: 'تأكيد عائلة', body: 'آل الفوزان · ٥ مقاعد للعائلة' },
    { title: 'تفضيل وجبة', body: 'عبدالعزيز التويجري اختار: لحم' },
    { title: 'رسالة جديدة', body: 'أم عبدالله: «ما شاء الله، مبارك لكم»' },
  ],
  'modern-minimal': [
    { title: 'تأكيد حضور', body: 'سارة الراشد أكّدت حضورها' },
    { title: 'باركود مفعّل', body: '٤٢ ضيفًا جاهزون للدخول' },
    { title: 'تفضيل وجبة', body: 'محمد القاسم: نباتي + بدون غلوتين' },
    { title: 'رسالة جديدة', body: 'لميس الشهري: «من أجمل دعوة شفناها»' },
  ],
  'andalusian-arch': [
    { title: 'تأكيد حضور', body: 'سلطان البابطين أكّد حضوره' },
    { title: 'تأكيد عائلة', body: 'آل الزامل · ٤ من العائلة' },
    { title: 'تفضيل وصول', body: 'د. هدى البسّام: مدخل النساء' },
    { title: 'رسالة جديدة', body: 'الشيخ ماجد: «خطوة مباركة، نشرّفكم»' },
  ],
  'classical-manuscript': [
    { title: 'تأكيد حضور', body: 'أم محمد + ٣ من الأقارب' },
    { title: 'بُشرى', body: '١٥ عائلة شاركت المباركة' },
    { title: 'دعاء', body: 'أحمد المهنا: «بارك الله فيه وفي والديه»' },
    { title: 'تأكيد حضور', body: 'الشيخ سعد العمري + الأبناء' },
  ],
  'botanical-rose': [
    { title: 'تأكيد حضور', body: 'لطيفة الراشد أكّدت حضورها' },
    { title: 'مجموعة', body: 'صديقات العروس · ١٢ أكّدن الحضور' },
    { title: 'تفضيل وجبة', body: 'ندى السعد اختارت: سمك' },
    { title: 'رسالة جديدة', body: 'نور الصبيحي: «أشواقي للقاء يا قمر»' },
  ],
  'geometric-kufic': [
    { title: 'تأكيد حضور', body: 'أ. عبدالرحمن الفهد أكّد حضوره' },
    { title: 'باركود مفعّل', body: '٨٧ من ١٢٠ زميلًا جاهزون' },
    { title: 'تفضيل', body: 'د. مها العتيبي اختارت: نباتي' },
    { title: 'رسالة جديدة', body: 'م. خالد الدوسري: «مبارك التخرّج يا بطل»' },
  ],
};

/* ============ Public component =================================== */

export function GuestInteractionShowcase({ style }: { style: SampleStyle }) {
  const theme = THEMES[style];
  const notifs = NOTIFICATIONS[style];

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
            تفاعل حيّ
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] mb-3">
          أزرار وإشعارات بأسلوب هذه الدعوة
        </h2>
        <p className="text-[var(--color-ink-mute)] leading-relaxed">
          كل تفصيل يتنفّس من نفس الباليتة — ما يضغطه ضيفك على دعوته، وما يصلك أنت في لوحتك.
        </p>
      </div>

      <div
        className="relative rounded-3xl p-6 sm:p-10 overflow-hidden"
        style={{
          background: theme.stageBg,
          border: `1px solid ${theme.stageBorder}`,
        }}
      >
        {/* Cinematic flare sweep on first paint */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-full w-1/3 pointer-events-none ai-flare"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.flareColor}, transparent)`,
          }}
        />

        {/* Tiny corner glyph blooms — pure ornament */}
        <CornerGlyph corner="tl" color={theme.inkLabel} delay={0.2}>
          {theme.glyph}
        </CornerGlyph>
        <CornerGlyph corner="br" color={theme.inkLabel} delay={0.4}>
          {theme.glyph}
        </CornerGlyph>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <GuestPanel theme={theme} />
          <HostPanel theme={theme} notifs={notifs} />
        </div>

        {/* En-label as cinematic footer chip */}
        <div className="relative mt-8 flex items-center justify-center gap-3">
          <span className="h-px flex-1" style={{ background: theme.rule, maxWidth: 80 }} />
          <span
            className="text-[10px] font-bold tracking-[4px]"
            style={{
              color: theme.inkMuted,
              fontFamily: 'var(--font-latin)',
            }}
          >
            {theme.enLabel}
          </span>
          <span className="h-px flex-1" style={{ background: theme.rule, maxWidth: 80 }} />
        </div>
      </div>
    </section>
  );
}

/* ============ Guest-side panel (buttons + meal chips) ============ */

function GuestPanel({ theme }: { theme: StyleTheme }) {
  const meals = ['لحم', 'دجاج', 'سمك', 'نباتي'];
  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-[3px] font-bold mb-3 ai-rise"
        style={{ color: theme.inkLabel, animationDelay: '0.1s' }}
      >
        ما يضغطه ضيفك
      </div>

      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{
          background: theme.surfaceBg,
          border: `1px solid ${theme.surfaceBorder}`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-2 mb-5 ai-rise" style={{ animationDelay: '0.25s' }}>
          <span style={{ color: theme.inkLabel }} aria-hidden="true">
            {theme.glyph}
          </span>
          <span className="text-xs font-bold" style={{ color: theme.ink, fontFamily: theme.font }}>
            تأكيد الحضور
          </span>
          <div
            className="flex-1 h-px ai-line"
            style={{ background: theme.rule, animationDelay: '0.4s' }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <PreviewButton label="سأحضر بفخر ✦" primary theme={theme} delay="0.35s" />
          <PreviewButton label="أعتذر مع رسالة" primary={false} theme={theme} delay="0.5s" />
        </div>

        <div className="mt-6 ai-rise" style={{ animationDelay: '0.7s' }}>
          <div
            className="text-[10px] uppercase tracking-[3px] mb-3 font-bold"
            style={{ color: theme.inkLabel }}
          >
            تفضيل الوجبة
          </div>
          <div className="flex flex-wrap gap-2">
            {meals.map((meal, i) => {
              const selected = i === 1;
              const chipStyle: CSSProperties = selected
                ? {
                    background: theme.primaryFill,
                    color: theme.primaryText,
                    border: 'none',
                    boxShadow: theme.primaryShadow,
                  }
                : {
                    background: theme.ghostFill,
                    color: theme.ghostText,
                    border: `1.5px solid ${theme.ghostBorder}`,
                  };
              return (
                <span
                  key={meal}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold ai-rise"
                  style={{
                    ...chipStyle,
                    fontFamily: theme.font,
                    animationDelay: `${0.85 + i * 0.06}s`,
                  }}
                >
                  {meal}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewButton({
  label,
  primary,
  theme,
  delay,
}: {
  label: string;
  primary: boolean;
  theme: StyleTheme;
  delay: string;
}) {
  const base: CSSProperties = {
    width: '100%',
    padding: '14px 0',
    borderRadius: 14,
    fontWeight: primary ? 900 : 700,
    fontSize: 15,
    fontFamily: theme.font,
    transition: 'transform 200ms cubic-bezier(0.22, 1, 0.36, 1)',
    cursor: 'default',
    animationDelay: delay,
  };

  const palette: CSSProperties = primary
    ? {
        background: theme.primaryFill,
        color: theme.primaryText,
        boxShadow: theme.primaryShadow,
        border: 'none',
      }
    : {
        background: theme.ghostFill,
        color: theme.ghostText,
        border: `1.5px solid ${theme.ghostBorder}`,
      };

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      className="ai-rise"
      style={{ ...base, ...palette }}
    >
      {label}
    </button>
  );
}

/* ============ Host-side panel (notification stack) ============ */

function HostPanel({
  theme,
  notifs,
}: {
  theme: StyleTheme;
  notifs: Notif[];
}) {
  // First notif lands at 0.65s; each one trails the previous by 0.30s
  // so the stack reveals as a choreographed cascade.
  const baseDelay = 0.65;
  const step = 0.3;

  return (
    <div>
      <div
        className="text-[10px] uppercase tracking-[3px] font-bold mb-3 ai-rise flex items-center gap-2"
        style={{ color: theme.inkLabel, animationDelay: '0.15s' }}
      >
        <span
          aria-hidden="true"
          className="inline-block w-1.5 h-1.5 rounded-full ai-twinkle"
          style={{ background: theme.inkLabel }}
        />
        ما يصلك في لوحتك
      </div>

      <div className="flex flex-col gap-2.5">
        {notifs.map((n, i) => (
          <NotifCard
            key={n.body}
            theme={theme}
            title={n.title}
            body={n.body}
            delay={baseDelay + i * step}
          />
        ))}
      </div>
    </div>
  );
}

function NotifCard({
  theme,
  title,
  body,
  delay,
}: {
  theme: StyleTheme;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <div
      className="notif-enter rounded-2xl px-3.5 py-2.5"
      style={{
        background: theme.notifBg,
        border: `1px solid ${theme.notifBorder}`,
        boxShadow: theme.notifShadow,
        backdropFilter: 'blur(18px) saturate(150%)',
        WebkitBackdropFilter: 'blur(18px) saturate(150%)',
        animationDelay: `${delay}s`,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="shrink-0 rounded-md flex items-center justify-center"
          style={{
            width: 20,
            height: 20,
            background: theme.iconBg,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 2px rgba(0,0,0,0.18)',
          }}
          aria-hidden="true"
        >
          <span
            className="text-[10px] font-black leading-none"
            style={{ color: theme.iconText, fontFamily: theme.font }}
          >
            د
          </span>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider flex-1"
          style={{ color: theme.inkMuted }}
        >
          دعوتي
        </span>
        <span
          className="text-[10px]"
          style={{ color: theme.inkMuted, fontFamily: 'var(--font-latin)' }}
        >
          الآن
        </span>
      </div>
      <div
        className="text-[13px] font-extrabold leading-tight"
        style={{ color: theme.ink, fontFamily: theme.font }}
      >
        {title}
      </div>
      <div
        className="text-[12px] leading-snug mt-0.5"
        style={{ color: theme.inkMuted, fontFamily: theme.font }}
      >
        {body}
      </div>
    </div>
  );
}

/* ============ Tiny themed glyph SVGs ============================ */

function StarGlyph() {
  return (
    <svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true">
      <g fill="currentColor">
        <polygon points="0,-6 1.4,-1.4 6,0 1.4,1.4 0,6 -1.4,1.4 -6,0 -1.4,-1.4" />
        <polygon
          points="0,-6 1.4,-1.4 6,0 1.4,1.4 0,6 -1.4,1.4 -6,0 -1.4,-1.4"
          transform="rotate(22.5)"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

function DotGlyph() {
  return (
    <svg width="10" height="10" viewBox="-5 -5 10 10" aria-hidden="true">
      <circle r="3" fill="currentColor" />
    </svg>
  );
}

function ArchGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none">
      <path
        d="M 2 13 L 2 6 Q 2 2 7 2 Q 12 2 12 6 L 12 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FlourishGlyph() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true" fill="none">
      <path
        d="M 2 7 Q 5 2 8 7 Q 11 12 14 7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function RoseGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <g fill="currentColor">
        <circle cx="7" cy="7" r="2.2" />
        <path d="M 7 2 Q 9 4 7 7 Q 5 4 7 2 Z" opacity="0.6" />
        <path d="M 12 7 Q 10 9 7 7 Q 10 5 12 7 Z" opacity="0.6" />
        <path d="M 7 12 Q 5 10 7 7 Q 9 10 7 12 Z" opacity="0.6" />
        <path d="M 2 7 Q 4 5 7 7 Q 4 9 2 7 Z" opacity="0.6" />
      </g>
    </svg>
  );
}

function DiamondGlyph() {
  return (
    <svg width="12" height="12" viewBox="-6 -6 12 12" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <polygon points="0,-5 5,0 0,5 -5,0" />
        <polygon points="0,-2 2,0 0,2 -2,0" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/* ============ Corner glyph ornament ============================ */

function CornerGlyph({
  corner,
  color,
  delay,
  children,
}: {
  corner: 'tl' | 'tr' | 'bl' | 'br';
  color: string;
  delay: number;
  children: ReactNode;
}) {
  const positions: Record<typeof corner, CSSProperties> = {
    tl: { top: 14, left: 14 },
    tr: { top: 14, right: 14 },
    bl: { bottom: 14, left: 14 },
    br: { bottom: 14, right: 14 },
  };
  return (
    <span
      aria-hidden="true"
      className="absolute ai-bloom opacity-60"
      style={{ ...positions[corner], color, animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}
