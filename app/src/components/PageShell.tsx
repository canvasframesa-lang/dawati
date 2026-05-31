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
          <FooterLink href="/dashboard-demo">لوحة التحكم</FooterLink>
          <FooterLink href="/brand-kit">الهوية البصرية</FooterLink>
          <FooterLink href="/faq">الأسئلة الشائعة</FooterLink>
          <FooterLink href="/privacy">الخصوصية</FooterLink>
          <FooterLink href="/terms">الشروط</FooterLink>
          <FooterLink href="/contact">تواصل</FooterLink>
        </div>

        <SisterServicesRow />

        <SocialRow />

        <p className="text-xs text-[var(--color-ink-faint)] text-center mt-6">
          © {new Date().getFullYear()} دعوتي · صُنع بحب في الرياض
        </p>
      </div>
    </footer>
  );
}

/* Social profiles. Replace these handles with the real ones — they're
   also referenced in organizationLd.sameAs (src/lib/seo.ts). */
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/dawati',
  tiktok:    'https://tiktok.com/@dawati',
  snapchat:  'https://snapchat.com/add/dawati',
  x:         'https://x.com/dawati',
} as const;

export function SocialRow() {
  const items: { href: string; label: string; icon: React.ReactNode }[] = [
    { href: SOCIAL_LINKS.instagram, label: 'إنستقرام',  icon: <InstagramGlyph /> },
    { href: SOCIAL_LINKS.tiktok,    label: 'تيك توك',     icon: <TikTokGlyph /> },
    { href: SOCIAL_LINKS.snapchat,  label: 'سناب شات',   icon: <SnapchatGlyph /> },
    { href: SOCIAL_LINKS.x,         label: 'إكس',          icon: <XGlyph /> },
  ];
  return (
    <div className="flex items-center justify-center gap-3">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`دعوتي على ${it.label}`}
          className="flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-[var(--color-ink)]"
          style={{
            width: 38,
            height: 38,
            background: '#ffffff',
            border: '1px solid var(--color-line)',
            color: 'var(--color-ink)',
          }}
        >
          <span className="transition-colors group-hover:text-white">
            {it.icon}
          </span>
        </a>
      ))}
    </div>
  );
}

/* ============ Social glyph SVGs ============ */

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function TikTokGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 6.8a5.4 5.4 0 0 1-3.4-1.3 5.4 5.4 0 0 1-1.6-3H11.6v12.2a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V8.8a5.6 5.6 0 1 0 4.8 5.5V9.4a8.7 8.7 0 0 0 5 1.6V7.5a5.5 5.5 0 0 1-.0-0.7Z" />
    </svg>
  );
}

function SnapchatGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.8 0 5 2.3 5 5.2 0 1 .1 1.9-.1 2.7.5.3 1 .2 1.5 0 .6-.2 1 .2 1 .7 0 .6-.5.9-1.2 1.2-.5.2-1.2.4-1.2.8 0 .8 2.4 3.3 4.5 3.8.3 0 .5.3.5.6 0 .8-2 1.4-3.4 1.6-.1.2-.2.7-.3 1-.1.3-.3.4-.7.3-.6-.1-1.4-.3-2.5 0-.6.2-1.2.6-1.9 1.1-.9.6-1.7 1.3-3.2 1.3s-2.4-.7-3.3-1.3c-.7-.5-1.3-.9-1.9-1.1-1.1-.3-1.9-.1-2.5 0-.4.1-.6 0-.7-.3-.1-.3-.2-.8-.3-1C2.3 17.5.3 16.9.3 16.1c0-.3.2-.6.5-.6 2.1-.5 4.5-3 4.5-3.8 0-.4-.7-.6-1.2-.8-.7-.3-1.2-.6-1.2-1.2 0-.5.4-.9 1-.7.5.2 1 .3 1.5 0-.2-.8-.1-1.7-.1-2.7C5.3 4.3 7.5 2 10.3 2H12Z" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] transition">
      {children}
    </Link>
  );
}

/* Sister-service callouts. Small + tasteful — no pressure to bundle. */
function SisterServicesRow() {
  return (
    <div className="mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
      <Link
        href="/marah"
        className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--color-line)] hover:border-[var(--color-gold-2)] transition"
      >
        <span
          aria-hidden="true"
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: 'linear-gradient(135deg, #ff7a3c 0%, #ffd400 100%)', color: '#ffffff' }}
        >
          🎉
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-extrabold text-[var(--color-ink)]">مرح دعوتي</div>
          <div className="text-[11px] text-[var(--color-ink-mute)] leading-tight">
            مهرّجين ورسم على الوجه وفقرات أطفال
          </div>
        </div>
        <span className="text-[var(--color-gold-3)] text-xs font-bold group-hover:translate-x-[-2px] transition">←</span>
      </Link>
      <Link
        href="/tanzeem"
        className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--color-line)] hover:border-[var(--color-gold-2)] transition"
      >
        <span
          aria-hidden="true"
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: '#0e1d2e', color: '#f4d56e', border: '1px solid #c9a23d' }}
        >
          ◆
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-extrabold text-[var(--color-ink)]">تنظيم دعوتي</div>
          <div className="text-[11px] text-[var(--color-ink-mute)] leading-tight">
            مشرفي قاعة وباركود وتنسيق ضيافة
          </div>
        </div>
        <span className="text-[var(--color-gold-3)] text-xs font-bold group-hover:translate-x-[-2px] transition">←</span>
      </Link>
    </div>
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
