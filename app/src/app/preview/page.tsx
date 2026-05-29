import type { Metadata } from 'next';
import Link from 'next/link';
import { cardPageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...cardPageMetadata,
  title: 'معاينة الدعوة',
};

/**
 * Placeholder for the live card preview.
 * Hermes: extract the Nuwairi card markup from reference-templates/01-card-template.html
 * into a `<Card data={sampleWeddingCard} />` React component and render it here.
 *
 * For now, embed the reference HTML directly via an iframe pointing to the Nuwairi
 * live URL (proves the visual bar to landing page visitors).
 */
export default function PreviewPage() {
  return (
    <div className="min-h-dvh">
      <div className="fixed top-3 left-3 z-50">
        <Link
          href="/"
          className="text-sm rounded-full px-4 py-2 font-bold"
          style={{
            background: 'rgba(5, 7, 20, 0.85)',
            color: 'var(--color-gold-1)',
            border: '1px solid rgba(244, 208, 107, 0.45)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-display)',
          }}
        >
          ← الرجوع
        </Link>
      </div>

      <iframe
        src="https://canvasframesa-lang.github.io/nuwairi-wedding/"
        title="معاينة دعوة فاخرة"
        className="w-full h-dvh border-0"
        loading="lazy"
      />

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
        <Link
          href="/order"
          className="rounded-full px-6 py-3 font-bold text-sm"
          style={{
            background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
            color: '#2a1505',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.55), 0 8px 22px rgba(184,138,30,0.45)',
            fontFamily: 'var(--font-display)',
          }}
        >
          أطلب دعوة مثلها ←
        </Link>
      </div>
    </div>
  );
}
