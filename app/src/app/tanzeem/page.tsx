import { NAVY_THEME, PackageCard } from '@/components/PackageCard';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'تنظيم دعوتي — إدارة حفلك بطاقم نسائي كامل',
  description:
    'فريق نسائي محترف لتنظيم مناسبتك — مشرفات قاعة، استقبال، باركود الضيوف، تنسيق الضيافة، وشارات VIP. باقات من 1,990 ﷼.',
  path: '/tanzeem',
  extraKeywords: [
    'تنظيم حفلات الرياض',
    'مشرفات قاعة عرس',
    'منسّقة حفل زفاف نساء',
    'باركود ضيوف عرس',
    'شارات VIP حفلات',
    'إدارة استقبال ضيوف',
  ],
});

/* ============ Theme tokens ============ */

const T = {
  bg: 'linear-gradient(180deg, #faf9f5 0%, #f4f1ea 100%)',
  surface: '#ffffff',
  surfaceMute: '#f0ede5',
  border: 'rgba(14, 29, 46, 0.14)',
  borderGold: 'rgba(212, 169, 58, 0.30)',
  ink: '#0e1d2e',
  inkSoft: '#1a2840',
  inkMute: '#5a6a82',
  primary: '#0e1d2e',
  primaryDeep: '#050a14',
  gold: '#c9a23d',
  goldLight: '#f4d56e',
  shadow: '0 14px 36px rgba(14, 29, 46, 0.10)',
};

// Zero photographs anywhere — pure SVG + CSS visuals throughout. Both
// the hero scene and what used to be the photo gallery are rendered
// from vector art and feature blocks. Guarantees no human faces.

/* ============ Page ============ */

export default function TanzeemPage() {
  return (
    <div
      style={{
        background: T.bg,
        color: T.ink,
        fontFamily: 'var(--font-tajawal)',
        minHeight: '100vh',
      }}
    >
      <TanzeemHeader />
      <Hero />
      <Services />
      <Packages />
      <HowItWorks />
      <Gallery />
      <Faq />
      <FinalCta />
      <TanzeemFooter />
    </div>
  );
}

/* ============ Header ============ */

function TanzeemHeader() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-lg"
      style={{
        background: 'rgba(250, 249, 245, 0.90)',
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/tanzeem" className="inline-flex items-center gap-2.5" aria-label="تنظيم دعوتي">
          <TanzeemMark />
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: T.ink,
              fontFamily: 'var(--font-reem-kufi)',
              letterSpacing: '-0.01em',
            }}
          >
            <span style={{ color: T.gold }}>تنظيم</span> دعوتي
          </span>
        </Link>
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-bold"
          style={{ color: T.inkSoft }}
        >
          <a href="#services" className="hover:opacity-70 transition">
            الخدمات
          </a>
          <a href="#packages" className="hover:opacity-70 transition">
            الباقات
          </a>
          <a href="#gallery" className="hover:opacity-70 transition">
            من حفلاتنا
          </a>
          <a href="#faq" className="hover:opacity-70 transition">
            الأسئلة
          </a>
        </nav>
        <a
          href="#packages"
          className="rounded-full px-5 py-2.5 text-sm font-extrabold transition hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDeep} 100%)`,
            color: T.goldLight,
            boxShadow: '0 6px 18px rgba(14, 29, 46, 0.25)',
          }}
        >
          استشر فريقنا
        </a>
      </div>
    </header>
  );
}

function TanzeemMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: T.primary,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: T.goldLight,
        fontSize: 20,
        fontWeight: 900,
        boxShadow: '0 4px 12px rgba(14, 29, 46, 0.25)',
        border: `1px solid ${T.gold}`,
      }}
    >
      ◆
    </span>
  );
}

/* ============ Hero scene (pure SVG — no photos) ============ */

function TanzeemHeroScene() {
  return (
    <div
      className="rounded-3xl relative overflow-hidden"
      style={{
        aspectRatio: '4/3',
        background: `radial-gradient(ellipse 60% 50% at 50% 25%, ${T.goldLight}22 0%, transparent 60%), linear-gradient(180deg, #1a2840 0%, ${T.primary} 100%)`,
        boxShadow: '0 28px 60px rgba(14, 29, 46, 0.32), 0 8px 20px rgba(15, 15, 30, 0.10)',
        border: `1px solid ${T.gold}`,
      }}
    >
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="tz-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={T.goldLight} />
            <stop offset="60%" stopColor={T.gold} />
            <stop offset="100%" stopColor="#8a6817" />
          </linearGradient>
        </defs>

        {/* Chandelier (top center) */}
        <g transform="translate(200 30)">
          {/* Chain */}
          <line x1="0" y1="0" x2="0" y2="32" stroke="url(#tz-gold)" strokeWidth="1.3" />
          {/* Central body */}
          <ellipse cx="0" cy="40" rx="14" ry="6" fill="url(#tz-gold)" />
          {/* Arms */}
          {[-50, -25, 0, 25, 50].map((x) => (
            <g key={x}>
              <path d={`M 0 42 Q ${x * 0.6} 55 ${x} 70`} stroke="url(#tz-gold)" strokeWidth="1.3" fill="none" />
              {/* Candle flames */}
              <circle cx={x} cy="68" r="3.2" fill={T.goldLight} opacity="0.9" />
              <circle cx={x} cy="68" r="6" fill={T.goldLight} opacity="0.25" />
            </g>
          ))}
          {/* Crystal pendants */}
          <path d="M -14 46 L -10 60 L -14 65 L -18 60 Z" fill={T.goldLight} opacity="0.65" />
          <path d="M 14 46 L 18 60 L 14 65 L 10 60 Z" fill={T.goldLight} opacity="0.65" />
          <path d="M 0 50 L 4 78 L 0 84 L -4 78 Z" fill={T.goldLight} opacity="0.8" />
        </g>

        {/* Table with centerpiece (bottom) */}
        <g transform="translate(200 230)">
          {/* Tablecloth */}
          <ellipse cx="0" cy="0" rx="130" ry="14" fill={T.goldLight} opacity="0.18" />
          <rect x="-115" y="-2" width="230" height="14" fill="url(#tz-gold)" opacity="0.35" />
          {/* Centerpiece vase */}
          <path d="M -14 -2 L -10 -22 L 10 -22 L 14 -2 Z" fill="url(#tz-gold)" opacity="0.6" />
          {/* Roses (geometric, no faces) */}
          <circle cx="-4" cy="-30" r="6" fill={T.goldLight} opacity="0.85" />
          <circle cx="6" cy="-32" r="5" fill={T.goldLight} opacity="0.7" />
          <circle cx="0" cy="-38" r="4" fill={T.goldLight} opacity="0.9" />
          {/* Candles around */}
          {[-80, -50, 50, 80].map((x) => (
            <g key={x}>
              <rect x={x - 2} y="-30" width="4" height="28" fill={T.goldLight} opacity="0.7" />
              <ellipse cx={x} cy="-34" rx="2.5" ry="4.5" fill={T.goldLight} />
              <ellipse cx={x} cy="-34" rx="6" ry="8" fill={T.goldLight} opacity="0.18" />
            </g>
          ))}
        </g>

        {/* Twinkling stars (ambient) */}
        {[
          { x: 50, y: 60, s: 10 },
          { x: 340, y: 80, s: 12 },
          { x: 70, y: 150, s: 8 },
          { x: 330, y: 160, s: 9 },
        ].map((s, i) => (
          <text
            key={i}
            x={s.x}
            y={s.y}
            fontSize={s.s}
            fill={T.goldLight}
            opacity="0.5"
          >
            ✦
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ============ Hero ============ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-[1.05fr,1fr] gap-10 items-center">
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap gap-2 mb-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(14, 29, 46, 0.05)',
                border: `1px solid ${T.borderGold}`,
                color: T.gold,
              }}
            >
              <span aria-hidden="true">◆</span>
              <span className="text-[11px] uppercase tracking-[3px] font-extrabold">
                تنظيم · دعوتي
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: T.primary,
                color: T.goldLight,
                border: `1px solid ${T.gold}`,
              }}
            >
              <span aria-hidden="true">♀</span>
              <span className="text-[11px] font-extrabold">فريق نسائي كامل</span>
            </div>
          </div>
          <h1
            className="font-black mb-5"
            style={{
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: T.ink,
              fontFamily: 'var(--font-reem-kufi)',
            }}
          >
            حفلك يُدار باحترافيّة
            <br />
            <span style={{ color: T.gold }}>أنت تستقبل ضيوفك فقط</span>
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-7 max-w-xl"
            style={{ color: T.inkSoft }}
          >
            فريق نسائي متكامل — من استقبال الضيفات، إلى مسح الباركود، إلى تنسيق الضيافة والمداخل.
            مناسب تمامًا لحفلات النساء السعوديّة بكلّ خصوصيّة.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href="#packages"
              className="rounded-full px-7 py-3.5 text-base font-extrabold transition hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDeep} 100%)`,
                color: T.goldLight,
                boxShadow: '0 10px 28px rgba(14, 29, 46, 0.30)',
              }}
            >
              اطّلع على الباقات ←
            </a>
            <a
              href="#services"
              className="rounded-full px-6 py-3.5 text-sm font-bold transition hover:bg-white"
              style={{ color: T.ink, border: `1.5px solid ${T.primary}` }}
            >
              شوف الخدمات
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <TanzeemHeroScene />
          {/* Floating proof chip */}
          <div
            className="absolute -bottom-4 -right-4 rounded-2xl px-4 py-3 hidden sm:block"
            style={{
              background: T.surface,
              border: `1px solid ${T.borderGold}`,
              boxShadow: T.shadow,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: T.primary, color: T.goldLight, fontSize: 18 }}
              >
                ✓
              </div>
              <div>
                <div className="text-xs font-extrabold" style={{ color: T.ink }}>
                  + ١٢٠ حفلًا نُظّم في ٢٠٢٦
                </div>
                <div className="text-[10px]" style={{ color: T.inkMute }}>
                  صفر اعتذار · رضا تامّ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Services ============ */

function Services() {
  const services = [
    {
      i: '👜',
      t: 'مشرفات قاعة',
      d: 'فريق نسائي مدرّب لإدارة الحفل من بدايته لنهايته — جدول الفقرات، انتقال الضيفات، الإشارات للجميع.',
    },
    {
      i: '📷',
      t: 'مسح الباركود',
      d: 'موظّفة تسجّل حضور الضيفات بمسح باركود الدعوة عند المدخل — رقم دقيق للحاضرات بدون لُبس.',
    },
    {
      i: '🍽️',
      t: 'تنسيق الضيافة',
      d: 'منسّقات يتابعن الوجبات حسب تفضيلات الضيفات (لحم/دجاج/نباتي/حساسيات) — توصيلها للطاولة الصحيحة.',
    },
    {
      i: '🚪',
      t: 'إدارة المداخل',
      d: 'موظّفات استقبال على كل مدخل — توجيه الضيفات بأناقة وحفاظ تامّ على خصوصيّة قسم النساء.',
    },
    {
      i: '🏷️',
      t: 'شارات الضيفات',
      d: 'شارات مطبوعة باسم كلّ ضيفة ورقم طاولتها — لمسة احترافيّة في الحفلات الفاخرة.',
    },
    {
      i: '✨',
      t: 'تنسيق الفقرات',
      d: 'منسّقة حفل تدير الجدول كاملًا — وقت العشاء، وقت الزفّة، وقت التصوير، ولحظات المغادرة.',
    },
  ];
  return (
    <section id="services" className="py-16 sm:py-24" style={{ background: T.surfaceMute }}>
      <div className="mx-auto max-w-6xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.gold }}
          >
            الخدمات
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: T.ink, fontFamily: 'var(--font-reem-kufi)' }}
          >
            كل ما يلزم حفلك خلف الكواليس
          </h2>
          <p className="text-base leading-relaxed" style={{ color: T.inkSoft }}>
            اختر الخدمات اللي تحتاجها، أو خذ باقة شاملة تغطّي كل شي.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article
              key={s.t}
              className="rounded-3xl p-6 transition hover:-translate-y-1"
              style={{
                background: T.surface,
                border: `1px solid ${T.borderGold}`,
                boxShadow: T.shadow,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{
                  background: T.primary,
                  color: T.goldLight,
                  border: `1px solid ${T.gold}`,
                }}
              >
                {s.i}
              </div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: T.ink }}>
                {s.t}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: T.inkSoft }}>
                {s.d}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Packages ============ */

function Packages() {
  const packages = [
    {
      name: 'باقة الأساسية',
      tagline: 'لحفلات حتى ١٠٠ ضيف · خدمة جوهريّة',
      price: 1990,
      features: [
        'مشرفتان للقاعة (٥ ساعات لكلّ واحدة)',
        'مسح باركود الضيفات عند المدخل',
        'تنسيق المداخل الرئيسيّة',
        'فريق نسائي يصل قبل ساعة من بدء الحفل',
        'تقرير حضور لحظي يصلك على واتساب',
      ],
    },
    {
      name: 'باقة المتكاملة',
      tagline: 'الأكثر طلبًا · لحفلات حتى ٢٥٠ ضيف',
      price: 4990,
      recommended: true,
      features: [
        'كل ما في الأساسية — بالإضافة إلى:',
        '٤ مشرفات + منسّقة رئيسيّة',
        'تنسيق الضيافة (متابعة وجبات الطاولات)',
        'إدارة المداخل وقسم VIP النسائي',
        'فريق استقبال متخصّص',
        'صور توثيقيّة (للأغراض والمشاهد فقط)',
      ],
    },
    {
      name: 'باقة الحفلات الكبرى',
      tagline: 'تنظيم شامل · حتى ٥٠٠ ضيف',
      price: 8990,
      features: [
        'كل ما في المتكاملة — بالإضافة إلى:',
        'مديرة حفل مخصّصة تدير الجدول كاملًا',
        '٨ مشرفات موزّعات على الأقسام',
        'شارات الضيفات الفاخرة (مطبوعة بأسمائهنّ)',
        'فريق استقبال موسّع',
        'إدارة منطقة VIP منفصلة',
        'تقرير ما بعد الحفل (إحصاءات الحضور)',
      ],
    },
  ];

  return (
    <section id="packages" className="py-16 sm:py-24" style={{ background: T.bg }}>
      <div className="mx-auto max-w-6xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.gold }}
          >
            الباقات
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: T.ink, fontFamily: 'var(--font-reem-kufi)' }}
          >
            باقات بحسب حجم حفلك
          </h2>
          <p className="text-base leading-relaxed" style={{ color: T.inkSoft }}>
            كل الباقات شاملة الضريبة، التنسيق المسبق، والوصول قبل الحفل.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((p, i) => (
            <PackageCard
              key={p.name}
              name={p.name}
              tagline={p.tagline}
              price={p.price}
              deliveryText="شامل الضريبة · تنسيق مسبق كامل"
              features={p.features}
              recommended={p.recommended}
              theme={NAVY_THEME}
              ctaHref={`https://wa.me/966550047481?text=${encodeURIComponent(`السلام عليكم، أريد ${p.name} من تنظيم دعوتي`)}`}
              ctaLabel={`اطلب ${p.name} ←`}
              index={i}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: T.inkMute }}>
          أكثر من ٥٠٠ ضيف أو احتياجات خاصة؟{' '}
          <a
            href="https://wa.me/966550047481?text=أريد عرض سعر مخصّص لـ تنظيم دعوتي"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: T.gold, fontWeight: 800, textDecoration: 'underline' }}
          >
            اطلب عرض سعر مخصّص
          </a>
        </p>
      </div>
    </section>
  );
}

/* ============ How it works ============ */

function HowItWorks() {
  const steps = [
    {
      n: '١',
      t: 'استشارة مجانيّة',
      d: 'كلّمنا قبل الحفل بأسبوعَين، نسمع عدد الضيوف، حجم القاعة، تفاصيل المناسبة — ونرجع لك بخطّة كاملة.',
    },
    {
      n: '٢',
      t: 'تنسيق وتحضير',
      d: 'نلتقي مع منسّق القاعة، نمشي معك على الجدول، نتأكّد من كل تفصيلة قبل اليوم الموعود.',
    },
    {
      n: '٣',
      t: 'يوم الحفل · بأمان',
      d: 'الفريق يصل قبل ساعة، يدير الحفل من أوّل ضيف لآخر مغادرة — أنت تركّز على لحظاتك فقط.',
    },
  ];
  return (
    <section className="py-16 sm:py-20" style={{ background: T.surfaceMute }}>
      <div className="mx-auto max-w-5xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.gold }}
          >
            آلية العمل
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: T.ink, fontFamily: 'var(--font-reem-kufi)' }}
          >
            ثلاث خطوات · حفل مثاليّ
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-3xl p-6 text-center"
              style={{
                background: T.surface,
                border: `1px solid ${T.borderGold}`,
                boxShadow: T.shadow,
              }}
            >
              <div
                className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black mb-4"
                style={{
                  background: T.primary,
                  color: T.goldLight,
                  boxShadow: '0 6px 18px rgba(14, 29, 46, 0.30)',
                  border: `1px solid ${T.gold}`,
                }}
              >
                {s.n}
              </div>
              <h3 className="text-lg font-extrabold mb-2" style={{ color: T.ink }}>
                {s.t}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: T.inkSoft }}>
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Gallery ============ */

function Gallery() {
  const stats: { big: string; small: string; glyph: string }[] = [
    { big: '+120',   small: 'حفلًا نُظّم في 2026',          glyph: '◆' },
    { big: '0',      small: 'حالات اعتذار أو شكاوى',         glyph: '✓' },
    { big: '100%',   small: 'فريق نسائي · صفر رجال',          glyph: '♀' },
  ];
  const promises: { t: string; d: string; glyph: string }[] = [
    { glyph: '⏰', t: 'الالتزام بالجدول',         d: 'كل فقرة في وقتها — العشاء، الزفّة، التصوير، المغادرة. صفر تأخير، صفر فوضى.' },
    { glyph: '🔒', t: 'خصوصيّة تامّة لقسم النساء', d: 'لا يدخل أيّ موظّف ذكر في قسم النساء — حتى للتوصيل والتجهيز. أمان كامل لضيفاتك.' },
    { glyph: '📊', t: 'تقرير ما بعد الحفل',         d: 'تستلمين خلال 24 ساعة: عدد الحاضرين، تفضيلات الوجبات الفعلية، ملاحظات منسّقة القاعة.' },
  ];
  return (
    <section id="gallery" className="py-16 sm:py-24" style={{ background: T.bg }}>
      <div className="mx-auto max-w-6xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.gold }}
          >
            معاييرنا
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black mb-3"
            style={{ color: T.ink, fontFamily: 'var(--font-reem-kufi)' }}
          >
            تنظيم يحكي عن نفسه
          </h2>
          <p className="text-base leading-relaxed" style={{ color: T.inkSoft }}>
            أرقامنا، وعودنا، وما لا نتنازل عنه — كلّه تحت ضمانة طاقم نسائي بالكامل.
          </p>
        </header>

        {/* Big stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-8">
          {stats.map((s) => (
            <div
              key={s.small}
              className="rounded-2xl p-4 sm:p-6 text-center"
              style={{ background: T.surface, border: `1px solid ${T.borderGold}`, boxShadow: T.shadow }}
            >
              <div className="text-2xl mb-2" style={{ color: T.gold }} aria-hidden="true">{s.glyph}</div>
              <div
                className="font-black mb-1"
                style={{
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  color: T.ink,
                  fontFamily: 'var(--font-latin)',
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {s.big}
              </div>
              <div className="text-[11px] sm:text-xs font-bold" style={{ color: T.inkSoft }}>
                {s.small}
              </div>
            </div>
          ))}
        </div>

        {/* Promise cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promises.map((p) => (
            <article
              key={p.t}
              className="rounded-3xl p-6 transition hover:-translate-y-1"
              style={{ background: T.surface, border: `1px solid ${T.borderGold}`, boxShadow: T.shadow }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: T.primary, color: T.goldLight, border: `1px solid ${T.gold}` }}
              >
                {p.glyph}
              </div>
              <h3 className="text-base font-extrabold mb-2" style={{ color: T.ink }}>{p.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color: T.inkSoft }}>{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */

function Faq() {
  const items: { q: string; a: string }[] = [
    {
      q: 'كم قبل الحفل يحتاج الحجز؟',
      a: 'الأفضل قبل أسبوعين. للحفلات الكبرى (+٣٠٠ ضيف) يحتاج قبل أربعة أسابيع للتنسيق الكامل مع منسّق القاعة.',
    },
    {
      q: 'هل تخدمون خارج الرياض؟',
      a: 'نعم — الرياض وجدة والدمام والخبر بدون تكلفة إضافيّة. مدن أخرى تُحسب رسوم سفر بسيطة.',
    },
    {
      q: 'الفريق هل يلبس زيًّا موحّدًا؟',
      a: 'نعم. كل المشرفات بزيّ رسمي موحّد (أسود بشعار دعوتي الذهبي) — يضمن مظهرًا احترافيًّا متناسقًا مع فخامة حفلك.',
    },
    {
      q: 'هل الفريق نسائي بالكامل؟',
      a: 'نعم تمامًا — كلّ موظّفاتنا في تنظيم دعوتي نساء سعوديّات مدرّبات. مناسب تمامًا لحفلات النساء بكلّ خصوصيّة، ولا يحضر فريقنا في الأقسام الرجاليّة من الحفلات المختلطة.',
    },
    {
      q: 'كيف تتعاملون مع الطوارئ يوم الحفل؟',
      a: 'مديرة الفريق متواصلة مع منسّقة القاعة طوال الحفل. أيّ طارئ (تأخّر ضيفة VIP، تغيير في الجدول، نقص في الكراسي) يُحلّ خلال دقائق بدون إزعاجك.',
    },
  ];
  return (
    <section id="faq" className="py-16 sm:py-20" style={{ background: T.surfaceMute }}>
      <div className="mx-auto max-w-3xl px-5">
        <header className="text-center mb-10">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.gold }}
          >
            الأسئلة الشائعة
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black"
            style={{ color: T.ink, fontFamily: 'var(--font-reem-kufi)' }}
          >
            ما يهمّك تعرفه
          </h2>
        </header>
        <div className="space-y-3">
          {items.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl p-5 cursor-pointer transition"
              style={{ background: T.surface, border: `1px solid ${T.borderGold}` }}
            >
              <summary
                className="flex items-center justify-between gap-3 list-none font-extrabold text-base"
                style={{ color: T.ink }}
              >
                <span>{q}</span>
                <span
                  className="text-2xl transition-transform group-open:rotate-45"
                  style={{ color: T.gold }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: T.inkSoft }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Final CTA ============ */

function FinalCta() {
  return (
    <section className="py-16 sm:py-24" style={{ background: T.bg }}>
      <div className="mx-auto max-w-5xl px-5">
        <div
          className="rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${T.primaryDeep} 0%, ${T.primary} 50%, #2a3a55 100%)`,
            boxShadow: '0 32px 64px rgba(14, 29, 46, 0.30)',
            color: T.goldLight,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle, ${T.goldLight}66 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }}
          />
          <div className="relative">
            <div className="text-5xl mb-4" aria-hidden="true">
              ◆
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black mb-3"
              style={{ fontFamily: 'var(--font-reem-kufi)' }}
            >
              ركّز أنت على لحظاتك
            </h2>
            <p className="text-base sm:text-lg mb-7 max-w-xl mx-auto" style={{ color: '#e8d895' }}>
              عطنا تفاصيل حفلك وفريقنا يجهّز لك خطّة تنظيم متكاملة — استشارة مجانية بدون التزام.
            </p>
            <a
              href="https://wa.me/966550047481?text=أريد استشارة تنظيم حفل من تنظيم دعوتي"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 text-base font-extrabold transition hover:scale-105"
              style={{
                background: T.goldLight,
                color: T.primary,
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.25)',
              }}
            >
              استشارة مجانية ←
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */

function TanzeemFooter() {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.borderGold}` }}>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <TanzeemMark />
            <div>
              <div className="text-sm font-extrabold" style={{ color: T.ink }}>
                <span style={{ color: T.gold }}>تنظيم</span> دعوتي
              </div>
              <div className="text-xs" style={{ color: T.inkMute }}>
                قسم تنظيم الحفلات من عائلة دعوتي
              </div>
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold"
            style={{ color: T.inkSoft }}
          >
            <Link href="/" className="hover:opacity-70 transition">
              دعوتي · الدعوات
            </Link>
            <Link href="/marah" className="hover:opacity-70 transition">
              مرح دعوتي
            </Link>
            <a
              href="https://wa.me/966550047481"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition"
            >
              واتساب
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-center" style={{ color: T.inkMute }}>
          © {new Date().getFullYear()} تنظيم دعوتي · صُنع بشغف في الرياض
        </p>
      </div>
    </footer>
  );
}
