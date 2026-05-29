import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, H1, Lead, Cta } from '@/components/PageShell';
import { TIERS, ADD_ONS, formatPrice } from '@/lib/tiers';

export const metadata: Metadata = {
  title: 'الباقات والأسعار',
  description: 'باقات بطاقات الدعوة الإلكترونية الفاخرة — ٧٠٠ / ١٢٠٠ / ٢٠٠٠ ر.س مع إضافات اختيارية للطباعة والشارات والتسليم السريع',
};

export default function PricingPage() {
  return (
    <PageShell>
      <H1>اختر باقتك</H1>
      <Lead>
        ثلاث باقات تليق بكل ذوق وميزانية. كل الأسعار شامل ضريبة القيمة المضافة ١٥٪.
        دفعة واحدة بدون اشتراك. مع لوحة تحكم احترافية في كل الباقات.
      </Lead>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <article
            key={tier.id}
            className="relative p-7 rounded-3xl border flex flex-col"
            style={{
              background: tier.recommended
                ? 'linear-gradient(180deg, rgba(255,253,245,0.10) 0%, rgba(244,208,107,0.12) 100%)'
                : 'linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(244,208,107,0.04) 100%)',
              borderColor: tier.recommended ? 'rgba(244, 208, 107, 0.55)' : 'rgba(184, 138, 30, 0.3)',
              backdropFilter: 'blur(14px)',
              boxShadow: tier.recommended
                ? '0 16px 40px rgba(184,138,30,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
                : '0 8px 22px rgba(0,0,0,0.4)',
              transform: tier.recommended ? 'translateY(-8px)' : undefined,
            }}
          >
            {tier.recommended && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'linear-gradient(180deg, #fff8d8 0%, #f4d06b 100%)',
                  color: '#4a2c0a',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                الأكثر طلبًا
              </div>
            )}

            <h3 className="text-gold-grad text-center mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700 }}>
              {tier.name}
            </h3>
            <p className="text-center mb-6 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-gold-1)', opacity: 0.9, fontStyle: 'italic' }}>
              {tier.tagline}
            </p>

            <div className="text-center mb-2 text-gold-shim" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 48, lineHeight: 1 }}>
              {formatPrice(tier.price)}
            </div>
            <div className="text-center mb-6 text-xs" style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-ui)', letterSpacing: 3 }}>
              تسليم خلال {tier.deliveryHours} ساعة
            </div>

            <ul className="space-y-3 mb-8 flex-1" style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2" style={{ color: 'var(--color-ink-light)' }}>
                  <span style={{ color: 'var(--color-gold-2)', flexShrink: 0 }}>{f.startsWith('كل ما في') ? '↑' : '✓'}</span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/order?tier=${tier.id}`}
              className="block text-center rounded-2xl py-4 font-bold"
              style={
                tier.recommended
                  ? {
                      background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
                      color: '#2a1505',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 8px 22px rgba(184,138,30,0.45)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 17,
                    }
                  : {
                      backgroundColor: 'rgba(20, 14, 39, 0.5)',
                      color: 'var(--color-gold-1)',
                      border: '1.5px solid rgba(244, 208, 107, 0.55)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 17,
                    }
              }
            >
              اطلب {tier.name}
            </Link>
          </article>
        ))}
      </div>

      <h2 className="text-gold-shim text-center mt-20 mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 34px)' }}>
        إضافات اختيارية
      </h2>
      <p className="text-center mb-10 max-w-2xl mx-auto" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)' }}>
        تختارها عند تعبئة طلبك حسب الباقة المناسبة لها
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
        {ADD_ONS.map((a) => (
          <div
            key={a.id}
            className="p-5 rounded-2xl border"
            style={{
              borderColor: 'rgba(184, 138, 30, 0.25)',
              background: 'rgba(20, 14, 39, 0.45)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex justify-between gap-3 mb-2">
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-gold-1)', fontWeight: 700, fontSize: 16 }}>
                {a.name}
              </h3>
              <span className="text-gold-shim font-bold whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>
                + {formatPrice(a.price)}
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-light)', fontFamily: 'var(--font-body)', opacity: 0.85 }}>
              {a.description}
            </p>
            <div className="text-xs mt-2" style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-ui)' }}>
              متاحة في:{' '}
              {a.availableFor.map((t, i) => (
                <span key={t}>
                  {i > 0 && '، '}
                  {t === 'mumayzaza' ? 'المميّزة' : t === 'fakhira' ? 'الفاخرة' : 'الملكية'}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Cta href="/order" label="ابدأ طلبك الآن" />
    </PageShell>
  );
}
