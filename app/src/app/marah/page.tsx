import { ORANGE_THEME, PackageCard } from '@/components/PackageCard';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata = pageMetadata({
  title: 'مرح دعوتي — مهرّجات ورسم على الوجه وفقرات أطفال (فريق نسائي)',
  description:
    'فريق نسائي كامل لترفيه الأطفال — مهرّجة محترفة، رسم على الوجه، شخصيات كرتونيّة، بالونات، وألعاب تفاعليّة. باقات من 1,490 ﷼.',
  path: '/marah',
  extraKeywords: [
    'ترفيه أطفال حفلات',
    'مهرّجة للأعراس',
    'رسم على الوجه الرياض',
    'فقرات أطفال عرس',
    'شخصيات كرتونية حفلات',
    'بالونات حفلات الأطفال',
  ],
});

/* ============ Theme tokens ============ */

const T = {
  bg: 'linear-gradient(180deg, #fff8f0 0%, #fff1e0 50%, #fde6cd 100%)',
  surface: '#ffffff',
  surfaceMute: '#fff5e8',
  border: 'rgba(255, 122, 60, 0.22)',
  ink: '#3a1605',
  inkSoft: '#6a3a1c',
  inkMute: '#9a6f50',
  primary: '#ff7a3c',
  primaryDeep: '#c54a14',
  secondary: '#3cc7c7',
  accent: '#ffd400',
  shadow: '0 14px 36px rgba(197, 74, 20, 0.14)',
};

// All photos are objects/scenes only — no people. Cultural fit for the
// Saudi market: any "people" stock photo risks featuring women, which
// breaks the brand for our audience. Cakes, balloons, confetti, gifts,
// and decor read as authentic party visuals without that risk.

const HERO_IMG =
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&auto=format&fit=crop&q=80';

const GALLERY_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&auto=format&fit=crop&q=80',
    alt: 'كعكة عيد ميلاد بالشموع',
  },
  {
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80',
    alt: 'بالونات ملوّنة جاهزة للحفلة',
  },
  {
    url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&auto=format&fit=crop&q=80',
    alt: 'هدايا تذكاريّة مرتّبة',
  },
  {
    url: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&auto=format&fit=crop&q=80',
    alt: 'كعكة حفلة ملوّنة',
  },
  {
    url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&auto=format&fit=crop&q=80',
    alt: 'كونفيتي ومرح',
  },
  {
    url: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600&auto=format&fit=crop&q=80',
    alt: 'محطّة حلويات حفلة',
  },
];

/* ============ Page ============ */

export default function MarahPage() {
  return (
    <div
      style={{
        background: T.bg,
        color: T.ink,
        fontFamily: 'var(--font-cairo)',
        minHeight: '100vh',
      }}
    >
      <MarahHeader />
      <Hero />
      <Services />
      <Packages />
      <HowItWorks />
      <Gallery />
      <Faq />
      <FinalCta />
      <MarahFooter />
    </div>
  );
}

/* ============ Header ============ */

function MarahHeader() {
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-lg"
      style={{
        background: 'rgba(255, 248, 240, 0.85)',
        borderBottom: `1px solid ${T.border}`,
      }}
    >
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/marah" className="inline-flex items-center gap-2" aria-label="مرح دعوتي">
          <MarahMark />
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: T.ink,
              fontFamily: 'var(--font-cairo)',
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: T.primary }}>مرح</span> دعوتي
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
            معرض الصور
          </a>
          <a href="#faq" className="hover:opacity-70 transition">
            الأسئلة
          </a>
        </nav>
        <a
          href="#packages"
          className="rounded-full px-5 py-2.5 text-sm font-extrabold text-white transition hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDeep} 100%)`,
            boxShadow: '0 6px 18px rgba(197, 74, 20, 0.30)',
          }}
        >
          احجز فقرة
        </a>
      </div>
    </header>
  );
}

function MarahMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 36,
        height: 36,
        borderRadius: 12,
        background: `linear-gradient(135deg, ${T.primary} 0%, ${T.accent} 50%, ${T.secondary} 100%)`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 900,
        boxShadow: '0 4px 12px rgba(197, 74, 20, 0.25)',
      }}
    >
      ✦
    </span>
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
                background: 'rgba(255, 122, 60, 0.10)',
                border: `1px solid ${T.border}`,
                color: T.primaryDeep,
              }}
            >
              <span style={{ fontSize: 14 }}>🎉</span>
              <span className="text-[11px] uppercase tracking-[3px] font-extrabold">
                مرح · دعوتي
              </span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: T.surface,
                border: `1.5px solid ${T.primary}`,
                color: T.primaryDeep,
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
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: T.ink,
            }}
          >
            خلّي ضحكات الأطفال
            <br />
            <span style={{ color: T.primary }}>عنوان مناسبتك</span> ✨
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-7 max-w-xl"
            style={{ color: T.inkSoft }}
          >
            مهرّجات محترفات، رسم على الوجه، شخصيات كرتونيّة، بالونات، وفقرات سحر — ساعتان أو
            أربع، فريق نسائي بالكامل يخلّي الأطفال في حفلتك يضحكون من القلب.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href="#packages"
              className="rounded-full px-7 py-3.5 text-base font-extrabold text-white transition hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDeep} 100%)`,
                boxShadow: '0 10px 28px rgba(197, 74, 20, 0.35)',
              }}
            >
              اطّلع على الباقات ←
            </a>
            <a
              href="#services"
              className="rounded-full px-6 py-3.5 text-sm font-bold transition hover:bg-white/40"
              style={{ color: T.ink, border: `1.5px solid ${T.border}` }}
            >
              شوف الخدمات
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div
            className="rounded-3xl overflow-hidden relative"
            style={{
              boxShadow: '0 28px 60px rgba(197, 74, 20, 0.22), 0 8px 20px rgba(15, 15, 30, 0.10)',
              aspectRatio: '4/3',
            }}
          >
            <img
              src={HERO_IMG}
              alt="حفلة أطفال مليئة بالألوان والبالونات"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Floating sticker */}
          <div
            className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 hidden sm:block"
            style={{
              background: '#ffffff',
              border: `1.5px solid ${T.border}`,
              boxShadow: T.shadow,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.primary})` }}
              >
                🎈
              </div>
              <div>
                <div className="text-xs font-extrabold" style={{ color: T.ink }}>
                  +200 حفلة في 2026
                </div>
                <div className="text-[10px]" style={{ color: T.inkMute }}>
                  تقييم 4.9 من 5
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
      icon: '🤡',
      t: 'مهرّجة محترفة',
      d: 'مهرّجة بخبرة طويلة في حفلات الأطفال السعودية — تأخذ الأطفال في رحلة مرح بفقرة تفاعلية كاملة.',
    },
    {
      icon: '🎨',
      t: 'رسم على الوجه',
      d: 'رسّامة محترفة بألوان آمنة طبيًّا، رسومات لكل طفل يختارها بنفسه — فراشة، أسد، أبطال خارقين.',
    },
    {
      icon: '🎭',
      t: 'شخصيات كرتونية',
      d: 'شخصيات محبّبة للأطفال — تتفاعل معهم وتلتقط الصور التذكاريّة بحضور نسائي كامل.',
    },
    {
      icon: '🎈',
      t: 'فقرة بالونات',
      d: 'فنّانة بالونات تصنع الأشكال أمام عيون الأطفال — سيوف، حيوانات، أزهار. يأخذها كل طفل معه.',
    },
    {
      icon: '🪄',
      t: 'ساحرة الأطفال',
      d: 'فقرة سحر مذهلة بعقد خفّة اليد — ٢٠ دقيقة من الانبهار، مناسبة لكل الأعمار.',
    },
    {
      icon: '🎁',
      t: 'محطّة هدايا تذكاريّة',
      d: 'كل طفل يذهب بهدية صغيرة من ذكرى المناسبة — كأنّها بطاقة شكر متحرّكة.',
    },
  ];
  return (
    <section id="services" className="py-16 sm:py-24" style={{ background: T.surfaceMute }}>
      <div className="mx-auto max-w-6xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.primary }}
          >
            الخدمات
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: T.ink }}>
            كل شي يحتاجه أطفال حفلتك
          </h2>
          <p className="text-base leading-relaxed" style={{ color: T.inkSoft }}>
            اختر من الخدمات أدناه — أو خذ باقة جاهزة بكل شيء.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <article
              key={s.t}
              className="rounded-3xl p-6 transition hover:-translate-y-1"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                boxShadow: T.shadow,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{
                  background: `linear-gradient(135deg, ${T.primary}1f 0%, ${T.accent}1f 100%)`,
                }}
              >
                {s.icon}
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
      name: 'باقة الفقرة',
      tagline: 'ساعتان · مناسب للحفلات الصغيرة',
      price: 1490,
      features: [
        'مهرّجة محترفة + رسم على الوجه',
        'مدّة الفقرة: ٢ ساعات',
        'حتى ٢٥ طفلًا',
        'جميع الأدوات والمستلزمات',
        'فريق ودود يصل قبل ساعة من البدء',
      ],
    },
    {
      name: 'باقة المرح الكاملة',
      tagline: 'الأكثر طلبًا · ثلاث ساعات من البهجة',
      price: 2790,
      recommended: true,
      features: [
        'كل ما في باقة الفقرة — بالإضافة إلى:',
        'شخصية كرتونية + فقرة بالونات',
        'مدّة: ٣ ساعات',
        'حتى ٥٠ طفلًا',
        'محطّة تصوير مع الشخصيات',
        'هدية تذكارية لكل طفل',
      ],
    },
    {
      name: 'باقة الكرنفال',
      tagline: 'تجربة متكاملة · ٤ ساعات بكل العناصر',
      price: 4690,
      features: [
        'كل ما في باقة المرح — بالإضافة إلى:',
        'ساحر أطفال محترف',
        'مدّة: ٤ ساعات',
        'حتى ٨٠ طفلًا',
        'محطّة هدايا تذكارية كاملة',
        'منسّق فقرات يدير الجدول',
        'تصوير احترافي لذكريات الحفلة',
      ],
    },
  ];

  return (
    <section id="packages" className="py-16 sm:py-24" style={{ background: T.bg }}>
      <div className="mx-auto max-w-6xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.primary }}
          >
            الباقات
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: T.ink }}>
            اختر باقتك المناسبة
          </h2>
          <p className="text-base leading-relaxed" style={{ color: T.inkSoft }}>
            كل الباقات شاملة الضريبة، توصيل الفريق، وإعداد المكان.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((p, i) => (
            <PackageCard
              key={p.name}
              name={p.name}
              tagline={p.tagline}
              price={p.price}
              deliveryText="شامل الضريبة · إعداد على الموقع"
              features={p.features}
              recommended={p.recommended}
              theme={ORANGE_THEME}
              ctaHref={`https://wa.me/966550047481?text=${encodeURIComponent(`السلام عليكم، أريد حجز ${p.name} من مرح دعوتي`)}`}
              ctaLabel={`احجز ${p.name} ←`}
              index={i}
            />
          ))}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: T.inkMute }}>
          عندك مناسبة خاصة أو عدد أكثر؟{' '}
          <a
            href="https://wa.me/966550047481?text=أريد عرض سعر مخصّص لـ مرح دعوتي"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: T.primary, fontWeight: 800, textDecoration: 'underline' }}
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
      t: 'احجز عبر واتساب',
      d: 'كلّمنا على واتساب، اعطنا تاريخ الحفلة والمكان وعدد الأطفال — نرجع لك بعرض في نصف ساعة.',
    },
    { n: '٢', t: 'ثبّت الحجز', d: 'تأكيد بسيط ودفعة ٣٠٪ لتثبيت التاريخ. الباقي يوم الحفلة.' },
    {
      n: '٣',
      t: 'احنا نوصل ونجهّز',
      d: 'الفريق يصل قبل ساعة، يجهّز الأدوات، يقدّم الفقرات في وقتها، ويترك المكان نظيفًا.',
    },
  ];
  return (
    <section className="py-16 sm:py-20" style={{ background: T.surfaceMute }}>
      <div className="mx-auto max-w-5xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.primary }}
          >
            كيف يعمل
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: T.ink }}>
            ٣ خطوات وتمّ الحجز
          </h2>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-3xl p-6 text-center"
              style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                boxShadow: T.shadow,
              }}
            >
              <div
                className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black mb-4"
                style={{
                  background: `linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDeep} 100%)`,
                  color: '#ffffff',
                  boxShadow: '0 6px 18px rgba(197, 74, 20, 0.30)',
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
  return (
    <section id="gallery" className="py-16 sm:py-24" style={{ background: T.bg }}>
      <div className="mx-auto max-w-6xl px-5">
        <header className="text-center mb-10 max-w-2xl mx-auto">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.primary }}
          >
            من حفلاتنا
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: T.ink }}>
            لحظات من المرح الحقيقي
          </h2>
          <p className="text-base leading-relaxed" style={{ color: T.inkSoft }}>
            صور من حفلات نفّذناها — كل ابتسامة هنا من ضيف صغير سعيد.
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {GALLERY_PHOTOS.map((p) => (
            <div
              key={p.url}
              className="rounded-2xl overflow-hidden"
              style={{ aspectRatio: '1/1', boxShadow: T.shadow }}
            >
              <img
                src={p.url}
                alt={p.alt}
                className="w-full h-full object-cover transition hover:scale-105"
              />
            </div>
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
      q: 'كم قبل الحفلة يحتاج الحجز؟',
      a: 'الأفضل قبل أسبوعين. في الحالات العاجلة نقبل الحجز قبل ٤٨ ساعة لو فيه فريق متاح.',
    },
    {
      q: 'هل تخدمون خارج الرياض؟',
      a: 'حاليًّا الرياض وضواحيها. لمدن أخرى (جدة، الدمام، الطائف) يحتاج الحجز قبل أسبوعين وبتكلفة مواصلات إضافية.',
    },
    {
      q: 'الألوان المستخدمة في الرسم على الوجه آمنة؟',
      a: 'نعم، كلها معتمدة طبيًّا (FDA approved) وقابلة للإزالة بالماء والصابون. لو طفل عنده حساسية، احكي لنا قبل.',
    },
    {
      q: 'هل الفقرات مناسبة لكل الأعمار؟',
      a: 'الفقرات تتكيّف لأعمار ٣–١٢ سنة. لو أعمار أكبر أو أصغر، أخبرنا ونرتّب فقرات مناسبة.',
    },
    {
      q: 'هل الفريق نسائي بالكامل؟',
      a: 'نعم — كل موظّفاتنا في مرح دعوتي نساء (ومعهنّ أطفال صغار للفقرات). مناسب تمامًا لحفلات النساء والأطفال السعودية بكل خصوصيّة.',
    },
  ];
  return (
    <section id="faq" className="py-16 sm:py-20" style={{ background: T.surfaceMute }}>
      <div className="mx-auto max-w-3xl px-5">
        <header className="text-center mb-10">
          <div
            className="text-[10px] uppercase tracking-[3px] font-extrabold mb-2"
            style={{ color: T.primary }}
          >
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: T.ink }}>
            ما ينقصك تعرفه
          </h2>
        </header>
        <div className="space-y-3">
          {items.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl p-5 cursor-pointer transition"
              style={{ background: T.surface, border: `1px solid ${T.border}` }}
            >
              <summary
                className="flex items-center justify-between gap-3 list-none font-extrabold text-base"
                style={{ color: T.ink }}
              >
                <span>{q}</span>
                <span
                  className="text-2xl transition-transform group-open:rotate-45"
                  style={{ color: T.primary }}
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
          className="rounded-3xl p-10 sm:p-14 text-center text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${T.primaryDeep} 0%, ${T.primary} 50%, ${T.accent} 130%)`,
            boxShadow: '0 32px 64px rgba(197, 74, 20, 0.30)',
          }}
        >
          <div className="relative">
            <div className="text-6xl mb-4" aria-hidden="true">
              🎉
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-3">مستعدّ لحفلة لا تُنسى؟</h2>
            <p className="text-base sm:text-lg text-white/90 mb-7 max-w-xl mx-auto">
              عطنا تفاصيل مناسبتك على واتساب وفريقنا يرسم لك أفضل تجربة لأطفالك وضيوفك.
            </p>
            <a
              href="https://wa.me/966550047481?text=أريد حجز فقرة مع مرح دعوتي"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 text-base font-extrabold transition hover:scale-105"
              style={{
                background: '#ffffff',
                color: T.primaryDeep,
                boxShadow: '0 10px 24px rgba(0, 0, 0, 0.20)',
              }}
            >
              احجز عبر واتساب ←
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */

function MarahFooter() {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.border}` }}>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <MarahMark />
            <div>
              <div className="text-sm font-extrabold" style={{ color: T.ink }}>
                <span style={{ color: T.primary }}>مرح</span> دعوتي
              </div>
              <div className="text-xs" style={{ color: T.inkMute }}>
                قسم ترفيه الأطفال من عائلة دعوتي
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
            <Link href="/tanzeem" className="hover:opacity-70 transition">
              تنظيم دعوتي
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
          © {new Date().getFullYear()} مرح دعوتي · صُنع بحب في الرياض
        </p>
      </div>
    </footer>
  );
}
