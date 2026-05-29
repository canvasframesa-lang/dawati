import Link from 'next/link';
import { PageShell, H1, Lead, H2, Cta } from './PageShell';
import { TIERS, formatPrice } from '@/lib/tiers';

export interface OccasionConfig {
  title: string;
  hero: string;
  intro: string;
  bullets: string[];
  verseFragment: string;
  verseSource: string;
  vibes: string[];
  recommendedTier: 'mumayyaza' | 'fakhira' | 'malakiyya';
  cta: string;
}

export function OccasionLanding({ cfg }: { cfg: OccasionConfig }) {
  const tier = TIERS.find((t) => t.id === cfg.recommendedTier) ?? TIERS[1]!;
  return (
    <PageShell>
      <H1>{cfg.hero}</H1>
      <Lead>{cfg.intro}</Lead>

      <div className="mx-auto max-w-3xl rounded-3xl p-8 border text-center mb-10" style={{
        background: 'linear-gradient(180deg, rgba(244,208,107,0.10) 0%, rgba(184,138,30,0.05) 100%)',
        borderColor: 'rgba(244, 208, 107, 0.45)',
        backdropFilter: 'blur(14px)',
      }}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--color-gold-3)', fontFamily: 'var(--font-latin)' }}>
          ✦ آيـة المنـاسبة ✦
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(18px, 3vw, 24px)', color: 'var(--color-gold-1)', fontWeight: 700, lineHeight: 2 }}>
          {cfg.verseFragment}
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-gold-3)', fontFamily: 'var(--font-ui)' }}>
          {cfg.verseSource}
        </p>
      </div>

      <H2>ماذا تتضمّن دعوة {cfg.title}؟</H2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
        {cfg.bullets.map((b) => (
          <article key={b} className="p-5 rounded-2xl border flex gap-3 items-start" style={{
            borderColor: 'rgba(184, 138, 30, 0.25)',
            background: 'rgba(20, 14, 39, 0.4)',
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{ color: 'var(--color-gold-2)', fontSize: 18, flexShrink: 0 }}>✦</span>
            <span style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8 }}>{b}</span>
          </article>
        ))}
      </div>

      <H2>الباقة الموصى بها لـ {cfg.title}</H2>
      <div className="max-w-md mx-auto rounded-3xl p-7 border" style={{
        background: 'linear-gradient(180deg, rgba(255,253,245,0.10) 0%, rgba(244,208,107,0.12) 100%)',
        borderColor: 'rgba(244, 208, 107, 0.55)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 16px 40px rgba(184,138,30,0.25)',
      }}>
        <h3 className="text-gold-grad text-center" style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700 }}>
          {tier.name}
        </h3>
        <p className="text-center mt-2 mb-4 text-sm" style={{ color: 'var(--color-gold-1)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
          {tier.tagline}
        </p>
        <div className="text-center mb-4 text-gold-shim" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, lineHeight: 1 }}>
          {formatPrice(tier.price)}
        </div>
        <div className="text-center text-xs mb-6" style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-ui)', letterSpacing: 3 }}>
          تسليم خلال {tier.deliveryHours} ساعة
        </div>
        <Link
          href={`/order?tier=${tier.id}`}
          className="block text-center rounded-2xl py-4 font-bold"
          style={{
            background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
            color: '#2a1505',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 8px 22px rgba(184,138,30,0.45)',
            fontFamily: 'var(--font-display)',
            fontSize: 17,
          }}
        >
          {cfg.cta}
        </Link>
        <p className="text-center mt-4 text-xs">
          <Link href="/pricing" style={{ color: 'var(--color-gold-2)', textDecoration: 'underline' }}>
            استعرض كل الباقات والإضافات
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
