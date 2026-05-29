import Link from 'next/link';

/**
 * Shared chrome for all marketing / info pages.
 * Light, modern, Tajawal — matches the landing.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line-soft)] bg-[rgba(250,250,247,0.85)] backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="دعوتي">
          <BrandMark />
          <span className="text-lg font-extrabold text-[var(--color-ink)]">دعوتي</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--color-ink-soft)]">
          <Link href="/how-it-works" className="hover:text-[var(--color-ink)] transition">كيف يشتغل</Link>
          <Link href="/examples" className="hover:text-[var(--color-ink)] transition">أمثلة</Link>
          <Link href="/pricing" className="hover:text-[var(--color-ink)] transition">الباقات</Link>
          <Link href="/faq" className="hover:text-[var(--color-ink)] transition">الأسئلة</Link>
        </nav>
        <Link href="/order" className="btn-gold text-sm py-2.5 px-5">
          اطلب دعوتك
        </Link>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <defs>
        <linearGradient id="bm-shell" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
      </defs>
      <g transform="translate(16 16)">
        <polygon points="0,-12 3.5,-3.5 12,0 3.5,3.5 0,12 -3.5,3.5 -12,0 -3.5,-3.5" fill="url(#bm-shell)" />
        <polygon points="0,-12 3.5,-3.5 12,0 3.5,3.5 0,12 -3.5,3.5 -12,0 -3.5,-3.5" fill="url(#bm-shell)" transform="rotate(45)" opacity="0.55" />
      </g>
    </svg>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[var(--color-bg-alt)] border-t border-[var(--color-line)] mt-24">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-6 text-sm">
          <FooterLink href="/wedding">دعوة زواج</FooterLink>
          <FooterLink href="/engagement">خطوبة</FooterLink>
          <FooterLink href="/eid">عيد</FooterLink>
          <FooterLink href="/aqiqa">عقيقة</FooterLink>
          <FooterLink href="/pricing">الباقات</FooterLink>
          <FooterLink href="/how-it-works">كيف يشتغل</FooterLink>
          <FooterLink href="/faq">الأسئلة</FooterLink>
          <FooterLink href="/privacy">الخصوصية</FooterLink>
          <FooterLink href="/terms">الشروط</FooterLink>
          <FooterLink href="/contact">تواصل</FooterLink>
        </div>
        <p className="text-xs text-[var(--color-ink-faint)] text-center">
          © {new Date().getFullYear()} دعوتي · صُنع بحب في الرياض
        </p>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] transition">
      {children}
    </Link>
  );
}

/* ============ Shared primitives used on info pages ============ */

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-balance text-center font-black tracking-tight text-[var(--color-ink)] mb-5"
      style={{ fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1.2 }}
    >
      {children}
    </h1>
  );
}

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mx-auto max-w-2xl text-balance text-center text-[var(--color-ink-mute)] leading-relaxed mb-16"
      style={{ fontSize: 'clamp(16px, 2vw, 19px)' }}
    >
      {children}
    </p>
  );
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-center font-extrabold text-[var(--color-ink)] mt-20 mb-8"
      style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}
    >
      {children}
    </h2>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto max-w-3xl space-y-4 text-[var(--color-ink-soft)] leading-relaxed"
      style={{ fontSize: 17 }}
    >
      {children}
    </div>
  );
}

export function Cta({ href, label }: { href: string; label: string }) {
  return (
    <div className="text-center my-20">
      <Link href={href} className="btn-gold">
        {label} ←
      </Link>
    </div>
  );
}

/* Page-level container that adds top padding under the sticky header */
export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-5 pt-12 pb-20">{children}</div>;
}
