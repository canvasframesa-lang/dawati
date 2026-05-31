import { PageShell } from '@/components/PageShell';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'لوحة التحكم — معاينة',
  description:
    'شاهد لوحة التحكم التي تصلك مع كل دعوة — عدّاد لحظي للحاضرين، قائمة الضيوف بتفضيلاتهم، رسائل الضيوف، وأدوات التصدير والتذكير',
  path: '/dashboard-demo',
  extraKeywords: [
    'لوحة تحكم دعوة',
    'إدارة ضيوف العرس',
    'تأكيد الحضور دعوة الكترونية',
    'تصدير قائمة الضيوف',
  ],
});

/* ============ Mock data ============ */

interface Guest {
  name: string;
  status: 'confirmed' | 'pending' | 'declined';
  meal: 'لحم' | 'دجاج' | 'سمك' | 'نباتي' | '—';
  plus: number;
  note: string;
}

const GUESTS: Guest[] = [
  { name: 'فيصل الراجحي', status: 'confirmed', meal: 'لحم', plus: 2, note: 'حساسية مكسرات' },
  { name: 'كريمة الفوزان', status: 'confirmed', meal: 'دجاج', plus: 0, note: '—' },
  { name: 'أحمد الزامل', status: 'confirmed', meal: 'سمك', plus: 1, note: '—' },
  { name: 'سارة الراشد', status: 'confirmed', meal: 'نباتي', plus: 0, note: 'بدون غلوتين' },
  { name: 'سلطان البابطين', status: 'pending', meal: '—', plus: 0, note: '—' },
  { name: 'محمد السبيعي', status: 'declined', meal: '—', plus: 0, note: 'بالتوفيق' },
  { name: 'لمياء التويجري', status: 'confirmed', meal: 'دجاج', plus: 1, note: 'كرسي متحرّك' },
  { name: 'عبدالعزيز المطيري', status: 'confirmed', meal: 'لحم', plus: 3, note: 'منطقة الأطفال' },
];

const STATS = {
  invited: 200,
  confirmed: 142,
  declined: 23,
  pending: 35,
  attendees: 218,
  children: 24,
  dietary: 18,
  accessibility: 4,
};

const MEALS: { label: string; count: number; color: string }[] = [
  { label: 'لحم', count: 58, color: '#a04050' },
  { label: 'دجاج', count: 41, color: '#d4a93a' },
  { label: 'سمك', count: 22, color: '#5a7fa4' },
  { label: 'نباتي', count: 21, color: '#5a8a4a' },
];

const ACTIVITY: { title: string; body: string; ago: string }[] = [
  { title: 'تأكيد حضور', body: 'فيصل الراجحي أكّد حضوره + ٢ مرافقين', ago: 'قبل ٣ د' },
  { title: 'رسالة جديدة', body: 'كريمة الفوزان: ألف مبروك يا غالي', ago: 'قبل ١٢ د' },
  { title: 'تفضيل وجبة', body: 'أحمد الزامل اختار: سمك', ago: 'قبل ٢٤ د' },
  { title: 'حساسية', body: 'سارة الراشد طلبت: بدون غلوتين', ago: 'قبل ٣٨ د' },
  { title: 'اعتذار', body: 'محمد السبيعي يعتذر، مع تمنياته بالتوفيق', ago: 'قبل ساعة' },
];

const MEAL_TOTAL = MEALS.reduce((s, m) => s + m.count, 0);

/* ============ Page ============ */

export default function DashboardDemoPage() {
  return (
    <PageShell>
      <DashboardHero />
      <main className="mx-auto max-w-6xl px-5 pb-20">
        <OverviewPanel />
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-5 mb-5">
          <GuestListPanel />
          <ActivityFeedPanel />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <MealPreferencesPanel />
          <DemographicsPanel />
        </div>
        <QuickActionsPanel />
        <FinalCtaPanel />
      </main>
    </PageShell>
  );
}

/* ============ Hero ============ */

function DashboardHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fdf6e3 0%, #faf2dc 60%, var(--color-bg) 100%)',
        borderBottom: '1px solid var(--color-line)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,213,110,0.40) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,213,110,0.30) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 py-14 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white border border-[#f4d56e]/60">
          <span className="text-[var(--color-gold-3)] text-sm">✦</span>
          <span className="text-[var(--color-gold-4)] text-sm font-bold">لوحة التحكم</span>
        </div>
        <h1
          className="text-balance font-black tracking-tight text-[var(--color-ink)] mb-4"
          style={{ fontSize: 'clamp(30px, 5vw, 50px)', lineHeight: 1.2 }}
        >
          ما يصلك مع كل دعوة
        </h1>
        <p
          className="mx-auto max-w-2xl text-balance text-[var(--color-ink-soft)] leading-relaxed"
          style={{ fontSize: 'clamp(16px, 2vw, 18px)' }}
        >
          هذه معاينة حيّة للوحة التي تفتحها بعد إرسال دعوتك — تتابع الحاضرين والمعتذرين لحظيًّا، تعرف
          من اختار أيّ وجبة، وتُصدّر القائمة بنقرة لمنسّق الحفل.
        </p>
      </div>
    </section>
  );
}

/* ============ Overview ============ */

function OverviewPanel() {
  const pctConfirmed = Math.round((STATS.confirmed / STATS.invited) * 100);
  const pctDeclined = Math.round((STATS.declined / STATS.invited) * 100);
  const pctPending = 100 - pctConfirmed - pctDeclined;

  return (
    <section className="-mt-10 sm:-mt-14 mb-5">
      <article
        className="rounded-3xl p-6 sm:p-8 bg-white ai-rise"
        style={{
          border: '1px solid var(--color-line)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full ai-twinkle bg-[#1aaa54]"
              />
              مباشر · يتحدّث لحظيًّا
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)]">
              نظرة عامة على الحضور
            </h2>
          </div>
          <div
            className="text-xs text-[var(--color-ink-mute)]"
            dir="ltr"
            style={{ fontFamily: 'var(--font-latin)' }}
          >
            عرس آل الراجحي · {STATS.invited} مدعوّ
          </div>
        </div>

        {/* Big numbers */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatBlock value={STATS.confirmed} label="مؤكّد" tone="green" />
          <StatBlock value={STATS.pending} label="في الانتظار" tone="amber" />
          <StatBlock value={STATS.declined} label="اعتذر" tone="rose" />
        </div>

        {/* Stacked progress bar */}
        <div
          className="relative w-full h-3 rounded-full overflow-hidden mb-3"
          style={{ background: 'var(--color-bg-alt)' }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 right-0 ai-line"
            style={{
              width: `${pctConfirmed}%`,
              background: 'linear-gradient(90deg, #1aaa54 0%, #2dc46d 100%)',
              transformOrigin: 'right center',
              animationDelay: '0.3s',
            }}
          />
          <div
            className="absolute inset-y-0 ai-line"
            style={{
              right: `${pctConfirmed}%`,
              width: `${pctPending}%`,
              background: '#f4d56e',
              transformOrigin: 'right center',
              animationDelay: '0.5s',
            }}
          />
          <div
            className="absolute inset-y-0 ai-line"
            style={{
              right: `${pctConfirmed + pctPending}%`,
              width: `${pctDeclined}%`,
              background: '#d97a85',
              transformOrigin: 'right center',
              animationDelay: '0.7s',
            }}
          />
        </div>
        <div
          className="flex items-center justify-between text-[11px] text-[var(--color-ink-mute)]"
          dir="ltr"
          style={{ fontFamily: 'var(--font-latin)' }}
        >
          <span>0</span>
          <span style={{ color: 'var(--color-ink-soft)' }} className="font-bold">
            {pctConfirmed}% مؤكّد
          </span>
          <span>{STATS.invited}</span>
        </div>

        {/* Quick meta stats */}
        <div className="mt-6 pt-5 border-t border-[var(--color-line-soft)] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <MiniStat label="إجمالي الحاضرين" value={STATS.attendees} hint="+ المرافقون" />
          <MiniStat label="عدد الأطفال" value={STATS.children} hint="منطقة الأطفال جاهزة" />
          <MiniStat label="تفضيلات غذائية" value={STATS.dietary} hint="حساسيات + بدائل" />
          <MiniStat label="احتياجات وصول" value={STATS.accessibility} hint="كرسي متحرّك + رعاية" />
        </div>
      </article>
    </section>
  );
}

function StatBlock({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: 'green' | 'amber' | 'rose';
}) {
  const palette = {
    green: { bg: 'rgba(26, 170, 84, 0.08)', text: '#0f7a3c', accent: '#1aaa54' },
    amber: { bg: 'rgba(184, 138, 30, 0.10)', text: '#8a6817', accent: '#d4a93a' },
    rose: { bg: 'rgba(217, 122, 133, 0.10)', text: '#a04050', accent: '#d97a85' },
  }[tone];
  return (
    <div
      className="rounded-2xl p-4 text-center"
      style={{ background: palette.bg, border: `1px solid ${palette.accent}33` }}
    >
      <div
        className="font-black"
        style={{
          color: palette.text,
          fontSize: 'clamp(28px, 5vw, 42px)',
          lineHeight: 1,
          fontFamily: 'var(--font-latin)',
          letterSpacing: -1,
        }}
      >
        {value}
      </div>
      <div
        className="mt-2 text-[11px] uppercase tracking-[2px] font-bold"
        style={{ color: palette.text }}
      >
        {label}
      </div>
    </div>
  );
}

function MiniStat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="text-center sm:text-right">
      <div className="text-[10px] uppercase tracking-[2px] font-bold text-[var(--color-ink-mute)] mb-1">
        {label}
      </div>
      <div
        className="font-extrabold text-[var(--color-ink)] mb-0.5"
        style={{ fontSize: 22, fontFamily: 'var(--font-latin)', letterSpacing: -0.5 }}
      >
        {value}
      </div>
      <div className="text-[11px] text-[var(--color-ink-faint)] leading-tight">{hint}</div>
    </div>
  );
}

/* ============ Guest list ============ */

function GuestListPanel() {
  return (
    <article
      className="rounded-3xl bg-white overflow-hidden"
      style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <header className="flex items-center justify-between gap-3 p-5 sm:p-6 pb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1">
            قائمة الضيوف
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-ink)]">
            ٢٠٠ مدعوّ · ٨ آخرين تفاعلوا
          </h3>
        </div>
        <span className="text-[11px] font-bold text-[var(--color-gold-3)] hover:text-[var(--color-gold-4)] cursor-default">
          عرض الكل ←
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: 520, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-alt)' }}>
              <Th>الاسم</Th>
              <Th>الحالة</Th>
              <Th>الوجبة</Th>
              <Th>المرافقون</Th>
              <Th>ملاحظة</Th>
            </tr>
          </thead>
          <tbody>
            {GUESTS.map((g) => (
              <tr key={g.name} style={{ borderTop: '1px solid var(--color-line-soft)' }}>
                <Td>
                  <span className="font-bold text-[var(--color-ink)]">{g.name}</span>
                </Td>
                <Td>
                  <StatusChip status={g.status} />
                </Td>
                <Td>
                  <span className="text-[var(--color-ink-soft)]">{g.meal}</span>
                </Td>
                <Td>
                  <span
                    className="font-bold text-[var(--color-ink-soft)]"
                    style={{ fontFamily: 'var(--font-latin)' }}
                  >
                    {g.plus > 0 ? `+${g.plus}` : '—'}
                  </span>
                </Td>
                <Td>
                  <span className="text-[var(--color-ink-mute)] text-xs">{g.note}</span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-right p-3 sm:p-4 font-bold text-[var(--color-ink-mute)] text-[10px] uppercase tracking-widest whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="p-3 sm:p-4 text-right whitespace-nowrap">{children}</td>;
}

function StatusChip({ status }: { status: Guest['status'] }) {
  const variants = {
    confirmed: { label: 'مؤكّد', bg: 'rgba(26, 170, 84, 0.12)', text: '#0f7a3c', dot: '#1aaa54' },
    pending: {
      label: 'في الانتظار',
      bg: 'rgba(184, 138, 30, 0.12)',
      text: '#8a6817',
      dot: '#d4a93a',
    },
    declined: { label: 'اعتذر', bg: 'rgba(217, 122, 133, 0.12)', text: '#a04050', dot: '#d97a85' },
  }[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
      style={{ background: variants.bg, color: variants.text }}
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: variants.dot }}
      />
      {variants.label}
    </span>
  );
}

/* ============ Activity feed ============ */

function ActivityFeedPanel() {
  return (
    <article
      className="rounded-3xl bg-white p-5 sm:p-6"
      style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full ai-twinkle bg-[var(--color-gold-3)]"
            />
            نشاط حيّ
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-ink)]">
            آخر التحديثات
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {ACTIVITY.map((a, i) => (
          <div
            key={a.body}
            className="notif-enter rounded-2xl p-3.5"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-line-soft)',
              animationDelay: `${0.4 + i * 0.18}s`,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[var(--color-gold-4)]">
                {a.title}
              </span>
              <span
                className="text-[10px] text-[var(--color-ink-faint)]"
                style={{ fontFamily: 'var(--font-latin)' }}
              >
                {a.ago}
              </span>
            </div>
            <div className="text-[13px] leading-snug text-[var(--color-ink-soft)]">{a.body}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ============ Meal preferences ============ */

function MealPreferencesPanel() {
  return (
    <article
      className="rounded-3xl bg-white p-5 sm:p-6"
      style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1">
          تفضيلات الوجبات
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-ink)]">
          توزيع الوجبات للمطبخ
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {MEALS.map((m, i) => {
          const pct = Math.round((m.count / MEAL_TOTAL) * 100);
          return (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-[var(--color-ink)]">{m.label}</span>
                <span
                  className="text-xs font-extrabold text-[var(--color-ink-soft)]"
                  style={{ fontFamily: 'var(--font-latin)' }}
                >
                  {m.count} · {pct}%
                </span>
              </div>
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ background: 'var(--color-bg-alt)' }}
              >
                <div
                  className="h-full ai-line rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${m.color}aa 0%, ${m.color} 100%)`,
                    transformOrigin: 'right center',
                    animationDelay: `${0.4 + i * 0.12}s`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-[var(--color-ink-faint)]">
        تُصدَّر هذه الأرقام مباشرة لمنسّق الحفل بصيغة PDF أو Excel — لا أخطاء يدوية.
      </p>
    </article>
  );
}

/* ============ Demographics ============ */

function DemographicsPanel() {
  const items = [
    { label: 'بالغون', count: 194, color: '#1aaa54' },
    { label: 'أطفال', count: 24, color: '#d4a93a' },
    { label: 'VIP', count: 18, color: '#a04050' },
    { label: 'احتياجات خاصة', count: 4, color: '#5a7fa4' },
  ];
  const total = items.reduce((s, i) => s + i.count, 0);
  return (
    <article
      className="rounded-3xl bg-white p-5 sm:p-6"
      style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1">
          تكوين الحضور
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-ink)]">
          من سيكون معك
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((it, i) => (
          <div
            key={it.label}
            className="rounded-2xl p-4 ai-rise"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-line-soft)',
              animationDelay: `${0.3 + i * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full"
                style={{ background: it.color }}
              />
              <span className="text-[11px] uppercase tracking-widest font-bold text-[var(--color-ink-mute)]">
                {it.label}
              </span>
            </div>
            <div
              className="font-black text-[var(--color-ink)]"
              style={{
                fontSize: 28,
                lineHeight: 1,
                fontFamily: 'var(--font-latin)',
                letterSpacing: -0.5,
              }}
            >
              {it.count}
            </div>
            <div
              className="mt-1 text-[10px] text-[var(--color-ink-faint)]"
              style={{ fontFamily: 'var(--font-latin)' }}
            >
              {Math.round((it.count / total) * 100)}% من الحضور
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ============ Quick actions ============ */

function QuickActionsPanel() {
  const actions = [
    { icon: '📨', t: 'إرسال تذكير لـ ٣٥ في الانتظار', d: 'رسالة واتساب مخصّصة باسم كل ضيف' },
    { icon: '📥', t: 'تصدير القائمة الكاملة', d: 'Excel أو PDF أو CSV — مع كل التفضيلات' },
    { icon: '📷', t: 'امسح الباركود عند المدخل', d: 'تسجيل حضور لحظي لكل ضيف يدخل القاعة' },
    { icon: '💬', t: 'رسالة جماعية لضيوف VIP', d: '١٨ ضيفًا في قائمة الـ VIP المنفصلة' },
  ];
  return (
    <article
      className="rounded-3xl bg-white p-5 sm:p-7 mb-5"
      style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-1">
          إجراءات سريعة
        </div>
        <h3 className="text-base sm:text-lg font-extrabold text-[var(--color-ink)]">
          أفعلها بنقرة من اللوحة
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <div
            key={a.t}
            className="flex items-start gap-3 p-4 rounded-2xl ai-rise transition-colors hover:border-[var(--color-gold-2)]"
            style={{
              background: 'var(--color-bg-alt)',
              border: '1px solid var(--color-line-soft)',
              animationDelay: `${0.3 + i * 0.08}s`,
            }}
          >
            <span className="text-2xl shrink-0" aria-hidden="true">
              {a.icon}
            </span>
            <div>
              <div className="text-sm font-extrabold text-[var(--color-ink)] mb-0.5 leading-snug">
                {a.t}
              </div>
              <div className="text-xs text-[var(--color-ink-mute)] leading-relaxed">{a.d}</div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

/* ============ Final CTA ============ */

function FinalCtaPanel() {
  return (
    <section className="mt-10">
      <div
        className="rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden"
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
          هذه اللوحة تأتي مع كل دعوة
        </h2>
        <p className="text-base sm:text-lg text-white/75 mb-7 max-w-lg mx-auto relative">
          بلا اشتراك إضافي، ولا مدفوعات شهرية — جزء أصيل من باقتك مهما اخترت.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          <Link href="/pricing" className="btn-gold">
            اطّلع على الباقات ←
          </Link>
          <Link
            href="/order"
            className="px-6 py-3 rounded-full text-sm font-bold transition-colors"
            style={{
              border: '1.5px solid rgba(244, 213, 110, 0.45)',
              color: '#fff8d8',
            }}
          >
            ابدأ طلبك الآن
          </Link>
        </div>
      </div>
    </section>
  );
}
