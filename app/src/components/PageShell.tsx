import Link from 'next/link';
import { BrandMark, BrandWordmark } from '@/components/Brand';

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
          <BrandMark size={30} />
          <BrandWordmark fontSize={22} />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--color-ink-soft)]">
          <Link href="/occasions" className="hover:text-[var(--color-ink)] transition">المناسبات</Link>
          <Link href="/how-it-works" className="hover:text-[var(--color-ink)] transition">آلية العمل</Link>
          <Link href="/examples" className="hover:text-[var(--color-ink)] transition">أمثلة</Link>
          <Link href="/pricing" className="hover:text-[var(--color-ink)] transition">الباقات</Link>
        </nav>
        <Link href="/order" className="btn-gold text-sm py-2.5 px-5">
          اطلب دعوتك
        </Link>
      </div>
    </header>
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
          <FooterLink href="/how-it-works">آلية العمل</FooterLink>
          <FooterLink href="/faq">الأسئلة الشائعة</FooterLink>
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

/**
 * PageBanner — a proper banner header for info/marketing sub-pages.
 * Gold-tinted background, eyebrow badge, large heading, optional emoji.
 * Sits at the top of a page; use H1 only for very text-dense pages.
 */
export function PageBanner({
  eyebrow,
  title,
  subtitle,
  emoji,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  emoji?: string;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #fdf6e3 0%, #faf2dc 60%, var(--color-bg) 100%)',
        borderBottom: '1px solid var(--color-line)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,213,110,0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,213,110,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:py-20 text-center">
        {emoji && (
          <div className="text-5xl mb-3" aria-hidden="true">
            {emoji}
          </div>
        )}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white border border-[#f4d56e]/60">
            <span className="text-[var(--color-gold-3)] text-sm">✦</span>
            <span className="text-[var(--color-gold-4)] text-sm font-bold">{eyebrow}</span>
          </div>
        )}
        <h1
          className="text-balance font-black tracking-tight text-[var(--color-ink)]"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.2 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 mx-auto max-w-2xl text-balance text-[var(--color-ink-soft)] leading-relaxed"
            style={{ fontSize: 'clamp(16px, 2vw, 19px)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

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
