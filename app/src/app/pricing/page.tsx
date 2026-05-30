import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, H1, Lead, PageContainer } from '@/components/PageShell';
import { TIERS, ADD_ONS, formatPriceNumber } from '@/lib/tiers';

export const metadata: Metadata = {
  title: 'الباقات والأسعار',
  description: 'باقات بطاقات الدعوة الإلكترونية الفاخرة — 700 / 1,200 / 2,000 ﷼ مع إضافات اختيارية للطباعة والشارات والتسليم السريع',
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageContainer>
        <H1>اختر باقتك</H1>
        <Lead>
          ثلاث باقات تليق بكل ذوق وميزانية. كل الأسعار شامل ضريبة القيمة المضافة 15٪.
          دفعة واحدة بدون اشتراك. مع لوحة تحكم احترافية في كل الباقات.
        </Lead>

        {/* Tier comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* Add-ons */}
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
          الإضافات الاختيارية
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-10 text-[var(--color-ink-mute)] leading-relaxed">
          المطبوعات الفيزيائية وخدمات إضافية تختارها عند تعبئة طلبك — مستقلّة عن سعر الباقة.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto mb-12">
          {ADD_ONS.map((a) => (
            <AddOnRow key={a.id} addon={a} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/order" className="btn-gold">
            ابدأ طلبك الآن ←
          </Link>
        </div>
      </PageContainer>
    </PageShell>
  );
}

/* ============ Tier Card ============ */

function TierCard({ tier }: { tier: (typeof TIERS)[number] }) {
  return (
    <article
      className="relative bg-white rounded-3xl flex flex-col overflow-hidden"
      style={{
        border: tier.recommended ? '1.5px solid #f4d56e' : '1px solid var(--color-line)',
        boxShadow: tier.recommended ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: tier.recommended ? 'translateY(-8px)' : undefined,
      }}
    >
      {tier.recommended && (
        <div
          className="text-center py-2 text-xs font-bold uppercase tracking-[4px]"
          style={{
            background: 'linear-gradient(180deg, #f4d56e 0%, #d4a93a 100%)',
            color: '#2a1505',
            fontFamily: 'var(--font-latin)',
          }}
        >
          ⭐ الأكثر طلبًا
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">
        {/* Tier name */}
        <h3
          className="text-center text-[var(--color-ink)] mb-1"
          style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}
        >
          {tier.name}
        </h3>

        {/* Tagline */}
        <p className="text-center mb-7 text-sm leading-relaxed text-[var(--color-ink-mute)]">
          {tier.tagline}
        </p>

        {/* Price block */}
        <div className="text-center mb-2">
          <div
            className="inline-flex items-baseline gap-2"
            dir="ltr"
            style={{ fontFamily: 'var(--font-latin)' }}
          >
            <span
              className="text-gradient-gold font-black"
              style={{ fontSize: 56, lineHeight: 1, letterSpacing: -1 }}
            >
              {formatPriceNumber(tier.price)}
            </span>
            <span
              className="font-extrabold text-[var(--color-gold-3)]"
              style={{ fontSize: 24 }}
            >
              ﷼
            </span>
          </div>
        </div>
        <div className="text-center mb-7 text-xs text-[var(--color-ink-mute)] uppercase tracking-[3px] font-semibold">
          تسليم خلال {tier.deliveryHours} ساعة · شامل الضريبة
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-line)] mb-6" />

        {/* Features list */}
        <ul className="space-y-3 mb-8 flex-1 text-sm">
          {tier.features.map((f) => {
            const isHeader = f.startsWith('كل ما في');
            return (
              <li
                key={f}
                className="flex gap-2.5 items-start leading-relaxed"
                style={isHeader ? { color: 'var(--color-gold-4)', fontWeight: 700, marginBottom: 8 } : { color: 'var(--color-ink-soft)' }}
              >
                <span className="shrink-0 mt-0.5" style={{ color: isHeader ? 'var(--color-gold-3)' : 'var(--color-success)' }}>
                  {isHeader ? '⇡' : '✓'}
                </span>
                <span>{f}</span>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <Link
          href={`/order?tier=${tier.id}`}
          className={tier.recommended ? 'btn-gold' : 'btn-ghost'}
          style={{ width: '100%' }}
        >
          اطلب باقة {tier.name}  ←
        </Link>
      </div>
    </article>
  );
}

/* ============ Add-on Row ============ */

function AddOnRow({ addon }: { addon: (typeof ADD_ONS)[number] }) {
  const tierNames: Record<string, string> = {
    mumayyaza: 'المميّزة',
    fakhira: 'الفاخرة',
    malakiyya: 'الملكية',
  };
  return (
    <div
      className="p-5 rounded-2xl bg-white border border-[var(--color-line)]"
      style={{ boxShadow: 'var(--shadow-xs)' }}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className="text-sm font-bold text-[var(--color-ink)] leading-snug">
          {addon.name}
        </h3>
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
