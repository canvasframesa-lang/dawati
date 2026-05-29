import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, H1, Lead } from '@/components/PageShell';
import { sampleCards } from '@/lib/sample-cards';
import { TIER_BY_ID, formatPrice } from '@/lib/tiers';

export const metadata: Metadata = {
  title: 'أمثلة من تصاميمنا',
  description: 'استعرض نماذج من بطاقات الدعوة الإلكترونية التي صمّمناها — زواج، خطوبة، عيد، عقيقة، تخرّج',
};

const OCCASION_AR: Record<string, string> = {
  wedding: 'زواج',
  engagement: 'خطوبة',
  eid: 'عيد',
  aqiqa: 'عقيقة',
  graduation: 'تخرّج',
  opening: 'افتتاح',
  iftar: 'إفطار',
};

export default function ExamplesPage() {
  return (
    <PageShell>
      <H1>أمثلة من تصاميمنا</H1>
      <Lead>
        نماذج توضيحية بأسماء افتراضية — كل بطاقة تعرض إمكانية مختلفة من نظامنا.
        اختر النموذج الأقرب لذوقك، ثم اطلب دعوتك بمواصفاتك.
      </Lead>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {sampleCards.map((card) => (
          <article
            key={card.slug}
            className="rounded-2xl border overflow-hidden flex flex-col"
            style={{
              borderColor: 'rgba(184, 138, 30, 0.3)',
              background: 'rgba(20, 14, 39, 0.45)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Card preview thumbnail (simplified glass card) */}
            <div
              className="aspect-[3/4] p-6 flex flex-col items-center justify-center text-center"
              style={{
                background: paletteBg(card.palette),
              }}
            >
              <div
                className="text-[10px] tracking-[0.3em] mb-2"
                style={{ color: '#8a6817', fontFamily: 'var(--font-latin)', opacity: 0.85 }}
              >
                دَعوَة · {OCCASION_AR[card.occasion]}
              </div>
              {(card.groomFamily || card.brideFamily) && (
                <div
                  className="font-bold mb-3 leading-tight"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#8a6817',
                    fontSize: 'clamp(14px, 2.5vw, 18px)',
                  }}
                >
                  آل {card.groomFamily}
                  {card.brideFamily && (
                    <>
                      {' ✦ '}آل {card.brideFamily}
                    </>
                  )}
                </div>
              )}
              <div
                className="font-bold mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  background:
                    'linear-gradient(180deg, #8a6817 0%, #b88a1e 35%, #f4d06b 65%, #b88a1e 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 'clamp(16px, 3vw, 22px)',
                  lineHeight: 1.3,
                }}
              >
                {card.groom?.fullName || card.host?.fullName}
              </div>
              {card.bride && (
                <>
                  <div
                    className="my-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 28,
                      color: '#b88a1e',
                      lineHeight: 1,
                    }}
                  >
                    و
                  </div>
                  <div
                    className="font-bold mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      background:
                        'linear-gradient(180deg, #8a6817 0%, #b88a1e 35%, #f4d06b 65%, #b88a1e 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: 'clamp(16px, 3vw, 22px)',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.bride.fullName}
                  </div>
                </>
              )}
              <div
                className="text-xs mt-2"
                style={{ color: '#4a2c0a', fontFamily: 'var(--font-body)' }}
              >
                {card.date.hijriLabel}
              </div>
              <div
                className="text-xs mt-1"
                style={{ color: '#4a2c0a', fontFamily: 'var(--font-body)', opacity: 0.85 }}
              >
                {card.venue.city} — {card.venue.area}
              </div>
            </div>

            {/* Meta */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(244, 208, 107, 0.15)',
                    color: 'var(--color-gold-1)',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                  }}
                >
                  {OCCASION_AR[card.occasion]}
                </span>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(244, 208, 107, 0.05)',
                    color: 'var(--color-gold-2)',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    border: '1px solid rgba(244, 208, 107, 0.3)',
                  }}
                >
                  {TIER_BY_ID[card.tier].name} · {formatPrice(TIER_BY_ID[card.tier].price)}
                </span>
              </div>
              <Link
                href={`/order?tier=${card.tier}`}
                className="block text-center rounded-xl py-3 text-sm font-bold mt-auto"
                style={{
                  background: 'rgba(20, 14, 39, 0.5)',
                  color: 'var(--color-gold-1)',
                  border: '1px solid rgba(244, 208, 107, 0.55)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                اطلب دعوة مثل هذي ←
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/preview"
          className="inline-block rounded-2xl px-8 py-4 font-bold border-2"
          style={{
            borderColor: 'rgba(244, 208, 107, 0.55)',
            color: 'var(--color-gold-1)',
            fontFamily: 'var(--font-display)',
            backgroundColor: 'rgba(20, 14, 39, 0.4)',
            backdropFilter: 'blur(8px)',
            fontSize: 17,
          }}
        >
          شف معاينة حيّة كاملة ←
        </Link>
      </div>
    </PageShell>
  );
}

function paletteBg(p: string): string {
  const map: Record<string, string> = {
    gold:
      'radial-gradient(ellipse at top, rgba(255,253,245,0.95) 0%, rgba(244,208,107,0.35) 100%)',
    'rose-gold':
      'radial-gradient(ellipse at top, rgba(255,253,245,0.95) 0%, rgba(217,152,120,0.32) 100%)',
    'royal-midnight':
      'radial-gradient(ellipse at top, rgba(255,253,245,0.92) 0%, rgba(120,80,180,0.20) 100%)',
    'olive-arabic':
      'radial-gradient(ellipse at top, rgba(255,253,245,0.92) 0%, rgba(150,140,80,0.30) 100%)',
    emerald:
      'radial-gradient(ellipse at top, rgba(255,253,245,0.92) 0%, rgba(80,160,100,0.25) 100%)',
  };
  return map[p] ?? map.gold!;
}
