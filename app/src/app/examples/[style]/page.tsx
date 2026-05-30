import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell, PageContainer } from '@/components/PageShell';
import { SampleCardTile } from '@/components/SampleCardTile';
import { STYLE_DETAILS, ALL_STYLE_SLUGS } from '@/lib/style-details';
import { TIER_BY_ID, formatPrice } from '@/lib/tiers';

export function generateStaticParams() {
  return ALL_STYLE_SLUGS.map((style) => ({ style }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ style: string }>;
}): Promise<Metadata> {
  const { style } = await params;
  const detail = STYLE_DETAILS[style as keyof typeof STYLE_DETAILS];
  if (!detail) return { title: 'نمط غير موجود' };
  return {
    title: `${detail.name} · ${detail.hero}`,
    description: detail.philosophy[0],
  };
}

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await params;
  const detail = STYLE_DETAILS[style as keyof typeof STYLE_DETAILS];
  if (!detail) notFound();

  return (
    <PageShell>
      <PageContainer>
        <BreadcrumbBack />
        <Hero detail={detail} />
        <PhilosophySection detail={detail} />
        <FeaturesSection detail={detail} />
        <PaletteAndFontSection detail={detail} />
        <WhenSection detail={detail} />
        <TestimonialSection detail={detail} />
        <CtaSection detail={detail} />
      </PageContainer>
    </PageShell>
  );
}

/* ============ Sub-sections ============ */

function BreadcrumbBack() {
  return (
    <Link
      href="/examples"
      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] transition mb-8"
    >
      ← الرجوع لكل الأنماط
    </Link>
  );
}

function Hero({ detail }: { detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS] }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-12 items-center mb-20">
      <div>
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-[var(--color-gold-bg)] border border-[#f4d56e]/40">
          <span className="text-[var(--color-gold-3)] text-sm">✦</span>
          <span className="text-[var(--color-gold-4)] text-sm font-semibold">{detail.name}</span>
        </div>
        <h1
          className="text-balance font-black tracking-tight text-[var(--color-ink)] mb-5"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.2 }}
        >
          {detail.hero}
        </h1>
        <p className="text-lg text-[var(--color-ink-mute)] leading-relaxed mb-8">
          {detail.philosophy[0]}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {detail.moods.map((m) => (
            <span
              key={m}
              className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[var(--color-line)] text-[var(--color-ink-soft)]"
            >
              {m}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/order?tier=${detail.tiers[0]}`} className="btn-gold">
            اطلب هذا النمط ←
          </Link>
          <span className="text-sm text-[var(--color-ink-mute)]">
            متوفر في:{' '}
            {detail.tiers
              .map((t) => TIER_BY_ID[t].name)
              .join(' · ')}
          </span>
        </div>
      </div>

      <div className="max-w-sm mx-auto w-full">
        <SampleCardTile
          data={{
            style: detail.slug,
            occasion: detail.sampleOccasion,
            topLine: detail.sampleTopLine,
            groomName: detail.sampleGroom,
            brideName: detail.sampleBride,
            date: detail.sampleDate,
            venue: detail.sampleVenue,
            tierLabel: TIER_BY_ID[detail.tiers[0]!].name,
            href: `/order?tier=${detail.tiers[0]!}`,
          }}
        />
      </div>
    </section>
  );
}

function PhilosophySection({
  detail,
}: {
  detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS];
}) {
  if (detail.philosophy.length <= 1) return null;
  return (
    <section className="mb-20">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] mb-6 text-center">
        روح هذا النمط
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {detail.philosophy.slice(1).map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-[var(--color-ink-soft)]">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection({
  detail,
}: {
  detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS];
}) {
  return (
    <section className="mb-20">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] mb-2 text-center">
        وش يميّز هذا النمط؟
      </h2>
      <p className="text-center text-[var(--color-ink-mute)] mb-10">
        ست تفاصيل تجتمع لتصنع شخصيّته
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {detail.features.map((f) => (
          <article
            key={f.t}
            className="p-6 rounded-2xl bg-white border border-[var(--color-line)]"
            style={{ boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="text-3xl mb-3" aria-hidden="true">{f.icon}</div>
            <h3 className="text-base font-bold text-[var(--color-ink)] mb-2">{f.t}</h3>
            <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed">{f.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PaletteAndFontSection({
  detail,
}: {
  detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS];
}) {
  return (
    <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Palette */}
      <div className="bg-white rounded-2xl p-6 border border-[var(--color-line)]" style={{ boxShadow: 'var(--shadow-xs)' }}>
        <h2 className="text-xl font-extrabold text-[var(--color-ink)] mb-1">لوحة الألوان</h2>
        <p className="text-sm text-[var(--color-ink-mute)] mb-6">
          الدرجات المستخدمة في هذا النمط — كل واحدة لها دور.
        </p>
        <div className="space-y-3">
          {detail.palette.map((p) => (
            <div key={p.hex} className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl border border-[var(--color-line)] shrink-0"
                style={{ background: p.hex, boxShadow: 'var(--shadow-xs)' }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[var(--color-ink)]">{p.label}</div>
                <div
                  className="text-xs text-[var(--color-ink-mute)] font-mono uppercase"
                  style={{ fontFamily: 'var(--font-latin)' }}
                >
                  {p.hex}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font specimen */}
      <div className="bg-white rounded-2xl p-6 border border-[var(--color-line)]" style={{ boxShadow: 'var(--shadow-xs)' }}>
        <h2 className="text-xl font-extrabold text-[var(--color-ink)] mb-1">الخط</h2>
        <p className="text-sm text-[var(--color-ink-mute)] mb-6">{detail.font.sampleNote}</p>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-[var(--color-ink-mute)] mb-2 font-semibold">
              اسم الخط
            </div>
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: detail.font.cssVar, color: 'var(--color-ink)' }}
            >
              {detail.font.family}
            </div>
          </div>

          <div className="border-t border-[var(--color-line)] pt-5">
            <div className="text-xs uppercase tracking-widest text-[var(--color-ink-mute)] mb-3 font-semibold">
              عيّنة
            </div>
            <div
              className="text-4xl sm:text-5xl mb-3 text-[var(--color-ink)]"
              style={{ fontFamily: detail.font.cssVar, fontWeight: 700, lineHeight: 1.3 }}
            >
              {detail.font.sampleAr}
            </div>
            <div
              className="text-xl text-[var(--color-ink-soft)]"
              style={{ fontFamily: detail.font.cssVar, fontWeight: 500 }}
            >
              {detail.font.sampleAr}
            </div>
            <div
              className="text-sm text-[var(--color-ink-mute)] mt-2"
              style={{ fontFamily: detail.font.cssVar, fontWeight: 400 }}
            >
              {detail.font.sampleAr}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhenSection({
  detail,
}: {
  detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS];
}) {
  return (
    <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        className="rounded-2xl p-7 bg-white border-2"
        style={{ borderColor: 'var(--color-success)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✓</span>
          <h2 className="text-xl font-extrabold text-[var(--color-success-dark)]">
            متى تختار هذا النمط
          </h2>
        </div>
        <ul className="space-y-3">
          {detail.whenToChoose.map((s) => (
            <li key={s} className="flex gap-3">
              <span className="text-[var(--color-success)] font-bold shrink-0">✓</span>
              <span className="text-[var(--color-ink-soft)] leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-2xl p-7 bg-white border-2"
        style={{ borderColor: 'var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⚠</span>
          <h2 className="text-xl font-extrabold text-[var(--color-ink-mute)]">
            قد لا يناسبك إذا
          </h2>
        </div>
        <ul className="space-y-3">
          {detail.notFor.map((s) => (
            <li key={s} className="flex gap-3">
              <span className="text-[var(--color-ink-faint)] shrink-0">·</span>
              <span className="text-[var(--color-ink-mute)] leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-[var(--color-ink-mute)] italic">
          نوصّيك في هذي الحالات بنمط آخر —{' '}
          <Link href="/examples" className="text-[var(--color-gold-3)] underline">
            شف الستة كلهم
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function TestimonialSection({
  detail,
}: {
  detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS];
}) {
  return (
    <section className="mb-20">
      <div
        className="max-w-3xl mx-auto rounded-3xl p-10 text-center bg-[var(--color-gold-bg)] border border-[#f4d56e]/50"
      >
        <div className="text-5xl mb-4 text-[var(--color-gold-3)]" aria-hidden="true">"</div>
        <blockquote
          className="text-xl sm:text-2xl font-medium text-[var(--color-ink)] leading-relaxed mb-5"
        >
          {detail.testimonial.quote}
        </blockquote>
        <div className="text-sm font-bold text-[var(--color-gold-4)]">
          — {detail.testimonial.author}
        </div>
      </div>
    </section>
  );
}

function CtaSection({
  detail,
}: {
  detail: typeof STYLE_DETAILS[keyof typeof STYLE_DETAILS];
}) {
  const primaryTier = detail.tiers[0]!;
  const tierDef = TIER_BY_ID[primaryTier];
  return (
    <section className="mb-12">
      <div
        className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
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
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 text-gradient-gold relative">
          جاهز لتجرّبه؟
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-md mx-auto relative">
          باقة <span className="font-bold text-[var(--color-gold-1)]">{tierDef.name}</span>{' '}
          تبدأ من <span className="font-bold text-[var(--color-gold-1)]">{formatPrice(tierDef.price)}</span>{' '}
          — تسليم خلال {tierDef.deliveryHours} ساعة من اعتماد التفاصيل.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={`/order?tier=${primaryTier}`} className="btn-gold">
            اطلب نمط {detail.name} ←
          </Link>
          <Link
            href="/examples"
            className="text-[var(--color-gold-1)] underline text-sm hover:text-white transition"
          >
            ولّا شف بقيّة الأنماط
          </Link>
        </div>
      </div>
    </section>
  );
}
