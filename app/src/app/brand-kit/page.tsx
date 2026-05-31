import { PageShell, PageBanner, PageContainer } from '@/components/PageShell';
import { BrandMark } from '@/components/Brand';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'الهوية البصرية',
  description:
    'شعار دعوتي وألوانها وخطوطها — حمّل الملفات الجاهزة للنشر والشراكات والصحافة',
  path: '/brand-kit',
  extraKeywords: [
    'شعار دعوتي',
    'هوية بصرية دعوتي',
    'تحميل شعار',
    'press kit دعوة',
  ],
});

/* ============ Page ============ */

export default function BrandKitPage() {
  return (
    <PageShell>
      <PageBanner
        eyebrow="الهوية البصرية"
        title="الشعار والألوان والخطوط"
        subtitle="كل ما تحتاجه لاستخدام شعار دعوتي في النشر، الشراكات، الإعلام — بصيغ جاهزة للتحميل."
      />
      <PageContainer>
        <LogoSection />
        <PaletteSection />
        <TypographySection />
        <UsageSection />
        <PressContact />
      </PageContainer>
    </PageShell>
  );
}

/* ============ Logo showcase + downloads ============ */

function LogoSection() {
  const variants: { label: string; file: string; bg: string; isDark: boolean }[] = [
    { label: 'النسخة السوداء',           file: 'dawati-mark-black.svg', bg: '#ffffff',                 isDark: false },
    { label: 'النسخة الذهبية',           file: 'dawati-mark-gold.svg',  bg: '#0e0e14',                 isDark: true  },
    { label: 'النسخة البيضاء',           file: 'dawati-mark-white.svg', bg: '#0e0e14',                 isDark: true  },
  ];

  return (
    <section className="mb-20">
      <SectionHeader
        eyebrow="الشعار"
        title="ثلاث نسخ — لكل خلفية"
        sub="استخدم النسخة المناسبة لخلفية المنشور: السوداء على الفاتح، والذهبية أو البيضاء على الداكن."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {variants.map((v) => (
          <article
            key={v.file}
            className="rounded-3xl overflow-hidden bg-white"
            style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}
          >
            <div
              className="flex items-center justify-center px-6"
              style={{ background: v.bg, minHeight: 200 }}
            >
              {/* SVG embedded directly so the preview matches the download */}
              <img
                src={`/brand/${v.file}`}
                alt={`شعار دعوتي · ${v.label}`}
                style={{ width: '70%', maxWidth: 280, height: 'auto' }}
              />
            </div>
            <div className="p-5 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-extrabold text-[var(--color-ink)]">{v.label}</div>
                <div
                  className="text-[10px] uppercase tracking-[2px] text-[var(--color-ink-faint)] mt-0.5"
                  style={{ fontFamily: 'var(--font-latin)' }}
                >
                  SVG · vector
                </div>
              </div>
              <a
                href={`/brand/${v.file}`}
                download
                className="text-xs font-bold text-[var(--color-gold-3)] hover:text-[var(--color-gold-4)] transition"
              >
                تحميل ↓
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/brand/dawati-mark-black.svg"
          download
          className="btn-gold"
        >
          تحميل الحزمة الكاملة (SVG) ↓
        </a>
      </div>
    </section>
  );
}

/* ============ Color palette ============ */

function PaletteSection() {
  const palette: { hex: string; name: string; role: string; isDark?: boolean }[] = [
    { hex: '#0e0e14', name: 'الحبر العميق',    role: 'الشعار والنصوص الرئيسية', isDark: true },
    { hex: '#1a1a25', name: 'الحبر الناعم',    role: 'النصوص الثانوية',          isDark: true },
    { hex: '#fff8d8', name: 'الذهب الفاتح',    role: 'الهايلايت والكلمات المميّزة' },
    { hex: '#f4d56e', name: 'الذهب الرئيسي',  role: 'الأزرار والإطارات الذهبية' },
    { hex: '#c9a23d', name: 'الذهب المتوسّط', role: 'الأكسنتات والحدود' },
    { hex: '#8a6817', name: 'الذهب العميق',    role: 'الأيقونات والنصوص الصغيرة' },
    { hex: '#fdf6e3', name: 'كريمي مذهَّب',     role: 'الخلفيات الفاخرة', },
    { hex: '#fafaf7', name: 'الكريمي الأساسي', role: 'خلفية الصفحات' },
  ];

  return (
    <section className="mb-20">
      <SectionHeader
        eyebrow="الباليتة"
        title="الذهب على الحبر — بلا تشتيت"
        sub="باليتة محدودة بإصرار: ظلال الذهب على الحبر الأسود الفاخر، تكفي كل سيناريوهات النشر."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {palette.map((c) => (
          <article
            key={c.hex}
            className="rounded-2xl overflow-hidden bg-white"
            style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="h-24" style={{ background: c.hex }} />
            <div className="p-3.5">
              <div className="text-sm font-extrabold text-[var(--color-ink)] mb-0.5">
                {c.name}
              </div>
              <div className="text-[10px] text-[var(--color-ink-mute)] leading-tight mb-2">
                {c.role}
              </div>
              <div
                className="text-[11px] font-bold text-[var(--color-ink-soft)]"
                style={{ fontFamily: 'var(--font-latin)' }}
                dir="ltr"
              >
                {c.hex.toUpperCase()}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============ Typography ============ */

function TypographySection() {
  const fonts: {
    name: string;
    cssVar: string;
    role: string;
    sample: string;
    weight: number;
  }[] = [
    { name: 'Cairo Black',  cssVar: 'var(--font-cairo)',      role: 'الـwordmark والعناوين القوية', sample: 'دعوتي',                                weight: 900 },
    { name: 'Tajawal',       cssVar: 'var(--font-tajawal)',    role: 'الواجهة والنصوص العامّة',     sample: 'بطاقات دعوة إلكترونية فاخرة',          weight: 700 },
    { name: 'Aref Ruqaa',   cssVar: 'var(--font-aref-ruqaa)', role: 'محتوى البطاقات الفعلية',        sample: 'يتشرّفُ آلُ الفُلان بدعوتكم',          weight: 700 },
    { name: 'Amiri',         cssVar: 'var(--font-amiri)',      role: 'الآيات والاقتباسات الدينية',   sample: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',     weight: 700 },
    { name: 'Reem Kufi',    cssVar: 'var(--font-reem-kufi)',  role: 'العناوين الكوفية الهندسية',     sample: 'دعوة خطوبة كريمة',                     weight: 700 },
    { name: 'El Messiri',   cssVar: 'var(--font-el-messiri)', role: 'المناسبات النسائية الناعمة',    sample: 'استقبال كريمة',                        weight: 700 },
  ];

  return (
    <section className="mb-20">
      <SectionHeader
        eyebrow="الخطوط"
        title="ستة خطوط · لكل دور وظيفة"
        sub="كل خط له دور محدّد. لا تخلطها داخل النموذج الواحد، ولا تستبدلها بخطوط نظام (Arial, Times)."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fonts.map((f) => (
          <article
            key={f.name}
            className="rounded-2xl bg-white p-5"
            style={{ border: '1px solid var(--color-line)', boxShadow: 'var(--shadow-xs)' }}
          >
            <div className="flex items-baseline justify-between gap-3 mb-3">
              <div
                className="text-sm font-extrabold text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-latin)' }}
              >
                {f.name}
              </div>
              <div
                className="text-[10px] uppercase tracking-[2px] font-bold text-[var(--color-gold-3)]"
                style={{ fontFamily: 'var(--font-latin)' }}
              >
                weight {f.weight}
              </div>
            </div>
            <div className="text-xs text-[var(--color-ink-mute)] mb-4 leading-relaxed">
              {f.role}
            </div>
            <div
              className="text-2xl sm:text-3xl text-[var(--color-ink)] leading-snug"
              style={{ fontFamily: f.cssVar, fontWeight: f.weight }}
            >
              {f.sample}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============ Usage rules ============ */

function UsageSection() {
  const dos = [
    'استخدم النسخة السوداء على الخلفيات الفاتحة، والذهبية أو البيضاء على الداكنة',
    'احتفظ بـ"مساحة تنفّس" حول الشعار لا تقلّ عن ارتفاع المعيّن الذهبي بجانبه',
    'احترم نسبة الـwidth/height للشعار (1080 × 759) — لا تمدّ أو تضغط',
    'الـwordmark بخطّ Cairo بوزن 900 فقط، باللون #0e0e14',
  ];
  const donts = [
    'لا تعيد تلوين الشعار بألوان خارج الباليتة',
    'لا تضع الشعار على صورة مزدحمة بدون خلفية شفّافة هادئة',
    'لا تدوّر الشعار أو تطبّق عليه ظلال أو إطارات إضافية',
    'لا تستبدل الـwordmark بخطّ ثاني، حتى لو شبيه (Tajawal, Cairo Bold)',
  ];

  return (
    <section className="mb-20">
      <SectionHeader
        eyebrow="قواعد الاستخدام"
        title="ماذا نفعل · وماذا نتجنّب"
        sub="بضع قواعد بسيطة تحفظ هيبة العلامة في كل ظهور."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <article
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(26, 170, 84, 0.06)',
            border: '1px solid rgba(26, 170, 84, 0.25)',
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[3px] font-bold mb-4"
            style={{ color: '#0f7a3c' }}
          >
            افعل
          </div>
          <ul className="space-y-3">
            {dos.map((d) => (
              <li key={d} className="flex gap-2.5 items-start text-sm text-[var(--color-ink-soft)] leading-relaxed">
                <span className="text-[#0f7a3c] font-black shrink-0 mt-0.5" aria-hidden="true">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </article>

        <article
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(217, 122, 133, 0.06)',
            border: '1px solid rgba(217, 122, 133, 0.25)',
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[3px] font-bold mb-4"
            style={{ color: '#a04050' }}
          >
            تجنّب
          </div>
          <ul className="space-y-3">
            {donts.map((d) => (
              <li key={d} className="flex gap-2.5 items-start text-sm text-[var(--color-ink-soft)] leading-relaxed">
                <span className="text-[#a04050] font-black shrink-0 mt-0.5" aria-hidden="true">✕</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

/* ============ Press contact ============ */

function PressContact() {
  return (
    <section className="mb-24">
      <div
        className="rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a25 50%, #2a1505 100%)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(244,213,110,0.5) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div className="relative">
          <div className="inline-block mb-4">
            <BrandMark size={42} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-gradient-gold">
            تحتاج أصول إضافية؟
          </h2>
          <p className="text-base text-white/75 mb-6 max-w-lg mx-auto">
            للصحافة، الشراكات الإعلامية، أو ملفّات بأحجام مخصّصة — تواصل معنا
            مباشرة وفريقنا يجهّز ما تحتاجه خلال يوم.
          </p>
          <a
            href="mailto:press@da3wati.com"
            className="btn-gold inline-block"
          >
            press@da3wati.com ←
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============ Section header helper ============ */

function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <header className="text-center mb-8 max-w-2xl mx-auto">
      <div className="text-[10px] uppercase tracking-[3px] font-bold text-[var(--color-gold-3)] mb-2">
        {eyebrow}
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-ink)] mb-2">
        {title}
      </h2>
      {sub && (
        <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed">{sub}</p>
      )}
    </header>
  );
}
