import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, PageBanner, PageContainer } from '@/components/PageShell';
import {
  WEDDING_OCCASIONS,
  RELIGIOUS_OCCASIONS,
  FAMILY_OCCASIONS,
  MILESTONE_OCCASIONS,
  COMMERCIAL_OCCASIONS,
  NATIONAL_OCCASIONS,
  SOCIAL_OCCASIONS,
  CATEGORY_LABELS,
  type Occasion,
} from '@/lib/occasions';

export const metadata: Metadata = {
  title: 'كل المناسبات',
  description: 'بطاقات دعوة لكل مناسبة سعودية — أعراس، أعياد، تخرّجات، مناسبات وطنية، احتفالات أسرية وتجارية',
};

export default function OccasionsPage() {
  return (
    <PageShell>
      <PageBanner
        eyebrow="52 مناسبة في قائمتنا"
        emoji="🎉"
        title="كل مناسباتك في مكان واحد"
        subtitle="من أعراس العمر، إلى أعياد العائلة، إلى تخرّج أبنائك — نصمّم لك بطاقة تخصّ كل مناسبة، لا تقتصر على الأعراس وحدها."
      />
      <PageContainer>

        {/* WEDDING SECTION — featured prominently */}
        <WeddingsSection />

        {/* Other categories */}
        <CategoryBlock
          title={CATEGORY_LABELS.religious.ar}
          emoji={CATEGORY_LABELS.religious.emoji}
          tagline={CATEGORY_LABELS.religious.tagline}
          occasions={RELIGIOUS_OCCASIONS}
        />
        <CategoryBlock
          title={CATEGORY_LABELS.family.ar}
          emoji={CATEGORY_LABELS.family.emoji}
          tagline={CATEGORY_LABELS.family.tagline}
          occasions={FAMILY_OCCASIONS}
        />
        <CategoryBlock
          title={CATEGORY_LABELS.milestone.ar}
          emoji={CATEGORY_LABELS.milestone.emoji}
          tagline={CATEGORY_LABELS.milestone.tagline}
          occasions={MILESTONE_OCCASIONS}
        />
        <CategoryBlock
          title={CATEGORY_LABELS.commercial.ar}
          emoji={CATEGORY_LABELS.commercial.emoji}
          tagline={CATEGORY_LABELS.commercial.tagline}
          occasions={COMMERCIAL_OCCASIONS}
        />
        <CategoryBlock
          title={CATEGORY_LABELS.national.ar}
          emoji={CATEGORY_LABELS.national.emoji}
          tagline={CATEGORY_LABELS.national.tagline}
          occasions={NATIONAL_OCCASIONS}
        />
        <CategoryBlock
          title={CATEGORY_LABELS.social.ar}
          emoji={CATEGORY_LABELS.social.emoji}
          tagline={CATEGORY_LABELS.social.tagline}
          occasions={SOCIAL_OCCASIONS}
        />

        <NotFoundCta />
      </PageContainer>
    </PageShell>
  );
}

/* ============ Weddings — featured large block ============ */

function WeddingsSection() {
  return (
    <section className="mb-24">
      <div
        className="rounded-3xl p-8 sm:p-12 mb-10 text-center"
        style={{
          background: 'linear-gradient(135deg, #fdf6e3 0%, #f4ead0 100%)',
          border: '1px solid #f4d56e',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div className="text-5xl mb-4" aria-hidden="true">💍</div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          {CATEGORY_LABELS.wedding.ar}
        </h2>
        <p className="text-base sm:text-lg text-[var(--color-ink-soft)] max-w-2xl mx-auto leading-relaxed mb-2">
          {CATEGORY_LABELS.wedding.tagline}
        </p>
        <p className="text-sm text-[var(--color-ink-mute)] max-w-xl mx-auto">
          ٧٠٪ من طلباتنا أعراس. نخصّص لها أفضل مصمّمينا ومستوى تفصيل أعمق.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WEDDING_OCCASIONS.map((o) => (
          <WeddingTile key={o.id} occasion={o} />
        ))}
      </div>
    </section>
  );
}

function WeddingTile({ occasion }: { occasion: Occasion }) {
  return (
    <Link
      href={`/order?occasion=${occasion.id}`}
      className="block group rounded-2xl p-6 bg-white border border-[var(--color-line)] hover:border-[var(--color-gold-2)] transition-all hover:-translate-y-0.5"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl" aria-hidden="true">{occasion.emoji}</span>
        {occasion.popular && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold-3)] bg-[var(--color-gold-bg)] px-2 py-1 rounded-full">
            الأكثر طلبًا
          </span>
        )}
      </div>
      <h3 className="text-lg font-extrabold text-[var(--color-ink)] mb-1.5 group-hover:text-[var(--color-gold-4)] transition-colors">
        {occasion.label}
      </h3>
      <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed mb-3">
        {occasion.description}
      </p>
      <span className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-gold-3)] transition-colors">
        اطلب الآن ←
      </span>
    </Link>
  );
}

/* ============ Other categories — compact tile grid ============ */

function CategoryBlock({
  title,
  emoji,
  tagline,
  occasions,
}: {
  title: string;
  emoji: string;
  tagline: string;
  occasions: Occasion[];
}) {
  return (
    <section className="mb-20">
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl" aria-hidden="true">{emoji}</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)]">{title}</h2>
      </div>
      <p className="text-[var(--color-ink-mute)] mb-8 mr-12">{tagline}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {occasions.map((o) => (
          <OccasionTile key={o.id} occasion={o} />
        ))}
      </div>
    </section>
  );
}

function OccasionTile({ occasion }: { occasion: Occasion }) {
  return (
    <Link
      href={`/order?occasion=${occasion.id}`}
      className="block group rounded-xl p-4 bg-white border border-[var(--color-line)] hover:border-[var(--color-gold-2)] hover:bg-[var(--color-gold-bg)] transition-all"
      style={{ boxShadow: 'var(--shadow-xs)' }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl" aria-hidden="true">{occasion.emoji}</span>
        <h3 className="text-base font-bold text-[var(--color-ink)] group-hover:text-[var(--color-gold-4)] transition-colors">
          {occasion.label}
        </h3>
        {occasion.popular && (
          <span className="ml-auto text-[9px] font-bold uppercase tracking-wide text-[var(--color-gold-3)]">
            ⭐
          </span>
        )}
      </div>
      <p className="text-xs text-[var(--color-ink-mute)] leading-relaxed mb-2">
        {occasion.description}
      </p>
      <span className="text-xs font-bold text-[var(--color-ink-mute)] group-hover:text-[var(--color-gold-3)] transition-colors">
        اطلب ←
      </span>
    </Link>
  );
}

/* ============ Not found CTA ============ */

function NotFoundCta() {
  return (
    <section className="mt-12">
      <div
        className="rounded-2xl p-8 text-center bg-white border-2 border-dashed"
        style={{ borderColor: 'var(--color-line)' }}
      >
        <div className="text-4xl mb-3" aria-hidden="true">✨</div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] mb-2">
          ما لقيت مناسبتك؟
        </h2>
        <p className="text-[var(--color-ink-mute)] mb-6 max-w-md mx-auto">
          كل مناسبة لها قصّة. اطلب دعوتك واكتب لنا تفاصيلها — نصمّمها لك من الصفر.
        </p>
        <Link href="/order?occasion=other" className="btn-gold">
          اطلب دعوة لمناسبة أخرى ←
        </Link>
      </div>
    </section>
  );
}
