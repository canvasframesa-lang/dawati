import Link from 'next/link';
import { Cosmos } from './Cosmos';
import { GoldDust } from './GoldDust';

/**
 * Shared chrome for all marketing/info pages.
 * Wraps content in cosmos background + sticky header + footer.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cosmos />
      <GoldDust />
      <main className="relative z-10 mx-auto max-w-5xl px-4 pb-24 pt-8 sm:pt-12">
        <PageHeader />
        {children}
        <PageFooter />
      </main>
    </>
  );
}

function PageHeader() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-3" aria-label="دعوتي — الرئيسية">
        <BrandMark />
        <span
          className="text-gold-shim font-bold text-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          دعوتي
        </span>
      </Link>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/pricing"
          className="hidden sm:inline text-sm hover:text-[color:var(--color-gold-2)] transition"
          style={{ color: 'var(--color-ink-light)' }}
        >
          الباقات
        </Link>
        <Link
          href="/how-it-works"
          className="hidden sm:inline text-sm hover:text-[color:var(--color-gold-2)] transition"
          style={{ color: 'var(--color-ink-light)' }}
        >
          كيف يشتغل
        </Link>
        <Link
          href="/examples"
          className="hidden sm:inline text-sm hover:text-[color:var(--color-gold-2)] transition"
          style={{ color: 'var(--color-ink-light)' }}
        >
          الأمثلة
        </Link>
        <Link
          href="/order"
          className="rounded-full px-5 py-2 text-sm font-bold"
          style={{
            background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
            color: '#2a1505',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 6px 18px rgba(184,138,30,0.4)',
            fontFamily: 'var(--font-display)',
          }}
        >
          اطلب دعوتك
        </Link>
      </nav>
    </header>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true" style={{ filter: 'drop-shadow(0 2px 6px rgba(184,138,30,0.5))' }}>
      <defs>
        <linearGradient id="bm-shell" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff8d8" />
          <stop offset="50%" stopColor="#f4d06b" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
      </defs>
      <g transform="translate(20 20)">
        <polygon points="0,-15 4,-4 15,0 4,4 0,15 -4,4 -15,0 -4,-4" fill="url(#bm-shell)" />
        <polygon points="0,-15 4,-4 15,0 4,4 0,15 -4,4 -15,0 -4,-4" fill="url(#bm-shell)" transform="rotate(45)" opacity="0.55" />
      </g>
    </svg>
  );
}

function PageFooter() {
  return (
    <footer className="mt-24 pt-10 border-t text-center" style={{ borderColor: 'rgba(184, 138, 30, 0.2)' }}>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6 text-sm">
        <Link href="/wedding" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          دعوة زواج
        </Link>
        <Link href="/engagement" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          خطوبة
        </Link>
        <Link href="/eid" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          عيد
        </Link>
        <Link href="/aqiqa" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          عقيقة
        </Link>
        <Link href="/pricing" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الباقات
        </Link>
        <Link href="/how-it-works" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          كيف يشتغل
        </Link>
        <Link href="/faq" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الأسئلة
        </Link>
        <Link href="/privacy" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الخصوصية
        </Link>
        <Link href="/terms" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الشروط
        </Link>
        <Link href="/contact" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          تواصل
        </Link>
      </div>
      <p className="text-xs" style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-latin)' }}>
        © {new Date().getFullYear()} دعوتي · صُنع بحب في الرياض 🌙
      </p>
    </footer>
  );
}

/* ============ shared bits exposed for page authors ============ */

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-gold-shim text-balance text-center mb-6"
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(32px, 6vw, 54px)',
        lineHeight: 1.3,
        filter: 'drop-shadow(0 2px 12px rgba(244,208,107,0.3))',
      }}
    >
      {children}
    </h1>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mx-auto max-w-2xl text-balance text-center mb-12"
      style={{
        color: 'var(--color-ink-light)',
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(16px, 2.8vw, 19px)',
        lineHeight: 1.8,
      }}
    >
      {children}
    </p>
  );
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-gold-shim text-center mt-16 mb-6"
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(24px, 4vw, 34px)',
      }}
    >
      {children}
    </h2>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto max-w-3xl space-y-4"
      style={{
        color: 'var(--color-ink-light)',
        fontFamily: 'var(--font-body)',
        fontSize: 17,
        lineHeight: 1.9,
      }}
    >
      {children}
    </div>
  );
}

export function Cta({ href, label }: { href: string; label: string }) {
  return (
    <div className="text-center mt-12">
      <Link
        href={href}
        className="inline-block rounded-2xl px-10 py-4 font-bold"
        style={{
          background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
          color: '#2a1505',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55), 0 10px 28px rgba(184,138,30,0.5)',
          fontFamily: 'var(--font-display)',
          fontSize: 18,
        }}
      >
        {label} ←
      </Link>
    </div>
  );
}
