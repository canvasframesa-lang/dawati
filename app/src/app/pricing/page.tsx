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
    'باقات بطاقات الدعوة الإلكترونية الفاخرة — 700 / 1,200 / 2,000 ﷼ مع إضافات اختيارية للطباعة والشارات والتسليم السريع',
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
        <TrustBar />
        <AddOnsSection />
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

/* ============ Trust bar ============ */

function TrustBar() {
  const items = [
    { t: 'بوّابة دفع آمنة معتمدة',  d: 'مدى · Apple Pay · فيزا · ماستركارد' },
    { t: 'دفعة واحدة، لا اشتراك',     d: 'تدفع مرّة وتمتلك كل ما في الباقة' },
    { t: 'استرداد قبل بدء التصميم',  d: '١٠٠٪ — قبل ما يلمس فريقنا التصميم' },
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
