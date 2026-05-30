import Link from 'next/link';
import { serviceLd } from '@/lib/seo';
import { SampleCardTile, type SampleStyle } from '@/components/SampleCardTile';
import { LiveNotifications } from '@/components/LiveNotifications';
import { BrandMark, BrandWordmark } from '@/components/Brand';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <SiteHeader />

      <main>
        <Hero />
        <TrustBar />
        <OccasionTeaser />
        <HowItWorks />
        <FeaturesShowcase />
        <SampleGallery />
        <Testimonial />
        <Cta />
      </main>

      <SiteFooter />
    </>
  );
}

/* ============ Header ============ */

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line-soft)] bg-[rgba(250,250,247,0.85)] backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="دعوتي">
          <BrandMark size={30} />
          <BrandWordmark fontSize={22} />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--color-ink-soft)]">
          <Link href="/occasions" className="hover:text-[var(--color-ink)] transition">
            المناسبات
          </Link>
          <Link href="/how-it-works" className="hover:text-[var(--color-ink)] transition">
            آلية العمل
          </Link>
          <Link href="/examples" className="hover:text-[var(--color-ink)] transition">
            أمثلة
          </Link>
          <Link href="/pricing" className="hover:text-[var(--color-ink)] transition">
            الباقات
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/order" className="btn-gold text-sm py-2.5 px-5">
            اطلب دعوتك
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ============ Hero ============ */

function Hero() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden">
      {/* Soft decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,213,110,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,210,200,0.25) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="mx-auto max-w-6xl px-5 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-[var(--color-gold-bg)] border border-[#f4d56e]/40">
            <span className="text-[var(--color-gold-3)] text-sm">✦</span>
            <span className="text-[var(--color-gold-4)] text-sm font-semibold">
              دعوات سعودية تليق بأهم لحظاتك
            </span>
          </div>

          <h1
            className="text-balance font-black tracking-tight text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.15 }}
          >
            نحن نُصمّم دعوتك،
            <br />
            <span className="text-gradient-gold">وأنت تستقبل ضيوفك.</span>
          </h1>

          <p
            className="mt-7 mx-auto max-w-2xl text-balance text-[var(--color-ink-mute)] leading-relaxed"
            style={{ fontSize: 'clamp(16px, 2vw, 19px)' }}
          >
            بطاقات دعوة إلكترونية فاخرة، يُصمّمها فريقنا وفقًا لتفاصيل طلبك.
            شاركها عبر واتساب، وتابع حضور ضيوفك من لوحة تحكم احترافية — كل التفاصيل في مكان واحد.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/order" className="btn-gold w-full sm:w-auto">
              اطلب دعوتك الآن ←
            </Link>
            <Link href="/examples" className="btn-ghost w-full sm:w-auto">
              استعرض الأمثلة
            </Link>
          </div>

          <p className="mt-6 text-sm text-[var(--color-ink-faint)]">
            تسليم خلال 12–48 ساعة · استرداد كامل قبل بدء التصميم
          </p>
        </div>

        {/* Hero visual — a stylized device showing a card */}
        <div className="mt-16 sm:mt-24 mx-auto max-w-3xl">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* Soft glow behind */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[60px] -m-8 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244,213,110,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* iPhone 17 Pro Max — Cosmic Orange (actual proportions) */}
      <div className="relative mx-auto" style={{ width: 420 }}>
        {/* Side buttons — vibrant Cosmic Orange anodized aluminum */}
        <span
          aria-hidden="true"
          className="absolute -right-[5px] top-[210px] w-[5px] h-[95px] rounded-l-sm z-10"
          style={{ background: 'linear-gradient(180deg, #ff8a4d, #b8410f, #ff8a4d)' }}
        />
        <span
          aria-hidden="true"
          className="absolute -left-[5px] top-[130px] w-[5px] h-[36px] rounded-r-sm z-10"
          style={{ background: 'linear-gradient(180deg, #ff8a4d, #b8410f, #ff8a4d)' }}
        />
        <span
          aria-hidden="true"
          className="absolute -left-[5px] top-[200px] w-[5px] h-[65px] rounded-r-sm z-10"
          style={{ background: 'linear-gradient(180deg, #ff8a4d, #b8410f, #ff8a4d)' }}
        />
        <span
          aria-hidden="true"
          className="absolute -left-[5px] top-[285px] w-[5px] h-[65px] rounded-r-sm z-10"
          style={{ background: 'linear-gradient(180deg, #ff8a4d, #b8410f, #ff8a4d)' }}
        />

        {/* Cosmic Orange titanium frame — iPhone 17 Pro Max */}
        <div
          className="relative rounded-[64px] p-[10px]"
          style={{
            background:
              'linear-gradient(135deg, #ffa977 0%, #ff7a36 22%, #ff5a14 45%, #c43d0a 65%, #ff6320 85%, #ffa977 100%)',
            boxShadow:
              '0 50px 110px rgba(210, 74, 24, 0.55), 0 14px 30px rgba(180, 60, 18, 0.35), inset 0 0 0 1px rgba(255, 191, 155, 0.6), inset 0 -2px 4px rgba(120, 40, 10, 0.4)',
          }}
        >
          {/* Inner black bezel (thin — iPhone 17 Pro has the slimmest bezels yet) */}
          <div
            className="rounded-[56px] p-[3px]"
            style={{ background: '#0a0604' }}
          >
            {/* Screen — iPhone 17 Pro Max is 6.9", aspect ratio ~9:19.5 */}
            <div
              className="rounded-[52px] overflow-hidden relative"
              style={{
                aspectRatio: '9 / 19.5',
                background: '#020207',
              }}
            >
              {/* Dynamic Island — slightly larger on iPhone 17 Pro */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full z-30 flex items-center justify-end pr-2.5"
                style={{
                  width: 128,
                  height: 36,
                  background: '#000',
                }}
              >
                {/* Camera dot */}
                <span
                  className="block rounded-full"
                  style={{
                    width: 8,
                    height: 8,
                    background: 'radial-gradient(circle at 30% 30%, #2a4a6a, #050a14)',
                    boxShadow: 'inset 0 0 0 1px rgba(60,80,120,0.5)',
                  }}
                />
              </div>

              {/* iOS status bar */}
              <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-7 z-20 pt-1">
                <span
                  className="text-white text-[13px] font-semibold"
                  style={{ fontFamily: 'var(--font-latin)' }}
                >
                  9:41
                </span>
                <div className="flex items-center gap-1.5 text-white">
                  {/* Signal */}
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
                    <rect x="0"  y="7" width="3" height="4" rx="0.5" />
                    <rect x="4"  y="5" width="3" height="6" rx="0.5" />
                    <rect x="8"  y="3" width="3" height="8" rx="0.5" />
                    <rect x="12" y="1" width="3" height="10" rx="0.5" />
                  </svg>
                  {/* Wifi */}
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
                    <path d="M8 11l1.5-1.5a2 2 0 00-3 0L8 11zM3 6a7 7 0 0110 0l-1 1a5.5 5.5 0 00-8 0L3 6zM0 3a11 11 0 0116 0l-1 1a9.5 9.5 0 00-14 0L0 3z" />
                  </svg>
                  {/* Battery */}
                  <div className="flex items-center">
                    <div
                      className="border border-white/60 rounded-sm relative flex items-center"
                      style={{ width: 22, height: 11, padding: 1.2 }}
                    >
                      <div
                        className="bg-white rounded-[1px]"
                        style={{ width: '85%', height: '100%' }}
                      />
                    </div>
                    <div
                      className="bg-white/60 rounded-r-sm"
                      style={{ width: 1.5, height: 4 }}
                    />
                  </div>
                </div>
              </div>

              {/* Card content area */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 pt-16 pb-10"
                style={{
                  background: `
                    radial-gradient(ellipse 60% 50% at 30% 20%, rgba(244, 208, 107, 0.22) 0%, transparent 60%),
                    radial-gradient(ellipse 60% 50% at 80% 90%, rgba(217, 152, 120, 0.15) 0%, transparent 60%),
                    #020207
                  `,
                }}
              >
                {/* Mini glass card */}
                <div
                  className="w-full rounded-2xl p-5 text-center"
                  style={{
                    background:
                      'linear-gradient(155deg, rgba(255,255,255,0.85) 0%, rgba(244,208,107,0.40) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.7)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 30px rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    className="text-[9px] tracking-[3px] mb-2"
                    style={{ color: '#8a6817', fontFamily: 'var(--font-latin)' }}
                  >
                    WEDDING · 1448 H
                  </div>
                  <div
                    className="font-black mb-1 text-gradient-gold"
                    style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 22, lineHeight: 1.2 }}
                  >
                    وَمَوَدَّةً وَرَحْمَة
                  </div>
                  <div className="text-[10px] mb-3" style={{ color: '#8a6817' }}>
                    الروم: ٢١
                  </div>
                  <div className="text-[10px] mb-1" style={{ color: '#8a6817', letterSpacing: 2 }}>
                    العَريس
                  </div>
                  <div
                    className="font-bold mb-2 text-gradient-gold"
                    style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 14, lineHeight: 1.2 }}
                  >
                    فيصل بن محمد الراجحي
                  </div>
                  <div
                    className="text-xl"
                    style={{ color: '#b88a1e', fontFamily: 'var(--font-aref-ruqaa)' }}
                  >
                    و
                  </div>
                  <div
                    className="text-[10px] mb-1 mt-2"
                    style={{ color: '#8a6817', letterSpacing: 2 }}
                  >
                    العَروس
                  </div>
                  <div
                    className="font-bold mb-3 text-gradient-gold"
                    style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 14, lineHeight: 1.2 }}
                  >
                    كريمة عبد الله الفوزان
                  </div>
                  <div
                    className="text-[11px] pt-3 border-t"
                    style={{ borderColor: 'rgba(184, 138, 30, 0.3)', color: '#4a2c0a' }}
                  >
                    الجمعة ٤ محرّم ١٤٤٨
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: '#4a2c0a' }}>
                    الرياض · قاعة الفيصلية
                  </div>
                </div>
              </div>

              {/* Live RSVP notifications — cycle every 3.2s */}
              <LiveNotifications />

              {/* Home indicator */}
              <div
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-white/40 z-30"
                style={{ width: 110, height: 4 }}
              />

              {/* Subtle screen reflection */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Floating stats cards — solid white + soft border so contrast
            holds against the dark phone behind them */}
        <div
          className="hidden md:block absolute -right-12 top-1/3 rounded-2xl p-4 bg-white"
          style={{
            animation: 'float-soft 4s ease-in-out infinite',
            border: '1px solid rgba(15, 15, 30, 0.08)',
            boxShadow: '0 14px 36px rgba(15, 15, 30, 0.18), 0 4px 8px rgba(15, 15, 30, 0.08)',
            minWidth: 140,
          }}
        >
          <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-mute)] mb-1 font-bold">
            أكّدوا الحضور
          </div>
          <div className="text-2xl font-black text-[var(--color-success-dark)] leading-none" dir="ltr" style={{ fontFamily: 'var(--font-latin)' }}>142</div>
          <div className="text-[11px] text-[var(--color-ink-mute)] mt-1.5" dir="ltr" style={{ fontFamily: 'var(--font-latin)' }}>من أصل 200</div>
          <div className="mt-2 h-1 rounded-full bg-[var(--color-line)] overflow-hidden">
            <div className="h-full bg-[var(--color-success)]" style={{ width: '71%' }} />
          </div>
        </div>

        <div
          className="hidden md:block absolute -left-12 bottom-1/4 rounded-2xl p-4 bg-white"
          style={{
            animation: 'float-soft 5s ease-in-out infinite reverse',
            border: '1px solid rgba(15, 15, 30, 0.08)',
            boxShadow: '0 14px 36px rgba(15, 15, 30, 0.18), 0 4px 8px rgba(15, 15, 30, 0.08)',
            minWidth: 200,
          }}
        >
          <div className="text-[10px] uppercase tracking-widest text-[var(--color-ink-mute)] mb-1 font-bold">
            رسالة جديدة
          </div>
          <div className="text-sm font-bold text-[var(--color-ink)]">«مبارك يا غالي 🌹»</div>
          <div className="text-[11px] text-[var(--color-ink-mute)] mt-1.5">قبل 3 دقائق · أبو فيصل</div>
        </div>
      </div>
    </div>
  );
}

/* ============ Trust bar ============ */

function TrustBar() {
  const stats = [
    { v: '1448', l: 'هـ — موسم العام' },
    { v: '12–48', l: 'ساعة للتسليم' },
    { v: '100%', l: 'استرداد قبل البدء' },
    { v: 'PDPL', l: 'متوافقون' },
  ];
  return (
    <section className="border-y border-[var(--color-line-soft)] bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-6xl px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-[var(--color-ink)]">{s.v}</div>
            <div className="text-xs md:text-sm text-[var(--color-ink-mute)] mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ How it works ============ */

function OccasionTeaser() {
  const cats = [
    { emoji: '💍', label: 'الأعراس', n: 9, href: '/occasions#wedding', highlight: true },
    { emoji: '🌙', label: 'الأعياد', n: 7, href: '/occasions' },
    { emoji: '👨‍👩‍👧‍👦', label: 'الأسرة', n: 9, href: '/occasions' },
    { emoji: '🎓', label: 'التخرّجات', n: 8, href: '/occasions' },
    { emoji: '🏢', label: 'الأعمال', n: 6, href: '/occasions' },
    { emoji: '🇸🇦', label: 'الوطنية', n: 4, href: '/occasions' },
    { emoji: '🤝', label: 'اجتماعية', n: 8, href: '/occasions' },
    { emoji: '✨', label: 'أخرى', n: 1, href: '/occasions' },
  ];
  return (
    <section className="section bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white border border-[var(--color-line)]">
            <span className="text-[var(--color-gold-3)] text-sm">✦</span>
            <span className="text-[var(--color-ink-soft)] text-sm font-semibold">52 مناسبة في قائمتنا</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
            ليست مجرّد دعوات زفاف
          </h2>
          <p className="text-lg text-[var(--color-ink-mute)] max-w-2xl mx-auto">
            من ليلة الحنّاء إلى حفلات التخرّج — لكل مناسبة بطاقة تليق بها.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {cats.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white border transition-all hover:-translate-y-1"
              style={{
                borderColor: c.highlight ? 'var(--color-gold-2)' : 'var(--color-line)',
                boxShadow: c.highlight ? '0 8px 22px rgba(184, 138, 30, 0.15)' : 'var(--shadow-xs)',
              }}
            >
              <span className="text-4xl mb-2" aria-hidden="true">{c.emoji}</span>
              <span className="text-base font-bold text-[var(--color-ink)] mb-0.5 group-hover:text-[var(--color-gold-4)] transition-colors">
                {c.label}
              </span>
              <span className="text-xs text-[var(--color-ink-mute)]" dir="ltr" style={{ fontFamily: 'var(--font-latin)' }}>
                {c.n} مناسبة
              </span>
              {c.highlight && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold-3)] mt-2">
                  الأكثر طلبًا
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/occasions" className="btn-ghost">
            استعرض كل المناسبات (52) ←
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: '01',
      t: 'قدّم طلبك',
      d: 'املأ نموذجًا موجزًا يتضمّن تفاصيل مناسبتك ووصف التصميم الذي تتخيّله.',
      icon: '📝',
    },
    {
      n: '02',
      t: 'نتواصل ونُصمّم',
      d: 'يبدأ فريق المصمّمين فور تأكيد طلبك — تصميم مخصّص يليق بمناسبتك.',
      icon: '🎨',
    },
    {
      n: '03',
      t: 'استلم وراجع',
      d: 'تستعرض المعاينة، تطلب التعديل إن لزم، ثم تعتمد التصميم النهائي.',
      icon: '✓',
    },
    {
      n: '04',
      t: 'شارك وتابع',
      d: 'تشارك الدعوة عبر واتساب، ولوحة التحكم تعرض حضور ضيوفك ورسائلهم لحظيًّا.',
      icon: '📊',
    },
  ];
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
            عملية مبسّطة لا تستهلك وقتك
          </h2>
          <p className="text-lg text-[var(--color-ink-mute)] max-w-xl mx-auto">
            أربع خطوات تفصلك عن دعوة تليق بمناسبتك.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <article
              key={s.n}
              className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-line)] hover:shadow-lg transition-shadow"
              style={{ boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono text-[var(--color-ink-faint)] tracking-widest">
                  {s.n}
                </span>
                <span className="text-2xl" aria-hidden="true">{s.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-ink)] mb-2">{s.t}</h3>
              <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Features showcase ============ */

function FeaturesShowcase() {
  return (
    <section className="section bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-white border border-[var(--color-line)]">
            <span className="text-[var(--color-gold-3)] text-sm">✦</span>
            <span className="text-[var(--color-ink-soft)] text-sm font-semibold">
              لوحة تحكم احترافية مع كل دعوة
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
            كل ما تحتاجه لإدارة ضيوفك
          </h2>
          <p className="text-lg text-[var(--color-ink-mute)] max-w-2xl mx-auto">
            ليست مجرّد دعوة — بل تجربة متكاملة لك ولضيوفك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.t}
              className="bg-white rounded-2xl p-6 border border-[var(--color-line)] hover:shadow-lg transition-all hover:-translate-y-0.5"
              style={{ boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="text-3xl mb-4" aria-hidden="true">{f.icon}</div>
              <h3 className="text-base font-bold text-[var(--color-ink)] mb-2">{f.t}</h3>
              <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: '📊', t: 'عدّاد لحظي', d: 'عدد المؤكّدين والمعتذرين ومن لم يردّ بعد — تحديث آنيّ مستمر.' },
  { icon: '💬', t: 'رسائل الضيوف', d: 'كل دعاء أو رسالة من ضيف تصل إلى لوحتك مرتّبة بالاسم.' },
  { icon: '🎟', t: 'باركود لكل ضيف', d: 'تسجيل دخول الضيوف بمسح الباركود عند مدخل القاعة.' },
  { icon: '🍽', t: 'تفضيلات الطعام', d: 'يختار الضيف نوع الوجبة والحساسيات عند تأكيد الحضور.' },
  { icon: '👶', t: 'عدد المرافقين', d: 'تعرف مسبقًا عدد الأطفال المرافقين لكل ضيف.' },
  { icon: '♿', t: 'احتياجات خاصة', d: 'تجهّز القاعة وفقًا لمتطلبات ضيوفك من ذوي الاحتياجات.' },
  { icon: '📥', t: 'تصدير القائمة', d: 'بصيغة Excel أو PDF — لمنظّم الحفل أو لقائمة الدخول.' },
  { icon: '⏰', t: 'تذكير تلقائي', d: 'تذكير ضيوفك يصلهم قبل الحفل بـ 24 ساعة بشكل تلقائي.' },
  { icon: '🌍', t: 'إحصاءات ذكية', d: 'تعرف من أيّ مدينة فتح الضيوف الدعوة، ومتى ذروة المشاركة.' },
];

/* ============ Sample gallery ============ */

function SampleGallery() {
  const samples: { style: SampleStyle; occasion: string; topLine?: string; groomName: string; brideName?: string; date: string; venue: string; tierLabel: string; href: string }[] = [
    {
      style: 'royal-cosmos',
      occasion: 'زواج',
      topLine: 'دعوة زواج',
      groomName: 'فيصل الراجحي',
      brideName: 'كريمة الفوزان',
      date: 'الجمعة ٤ محرّم ١٤٤٨',
      venue: 'الرياض · الفيصلية',
      tierLabel: 'الفاخرة',
      href: '/order?tier=fakhira',
    },
    {
      style: 'botanical-rose',
      occasion: 'خطوبة',
      topLine: 'خطوبة',
      groomName: 'سلطان البابطين',
      brideName: 'كريمة الزامل',
      date: 'الأحد ٢٦ صفر ١٤٤٨',
      venue: 'الرياض · حطّين',
      tierLabel: 'المميّزة',
      href: '/order?tier=mumayyaza',
    },
    {
      style: 'modern-minimal',
      occasion: 'زواج',
      topLine: 'Save the Date',
      groomName: 'عبد العزيز التويجري',
      brideName: 'كريمة السديري',
      date: 'الخميس ١٦ صفر ١٤٤٨',
      venue: 'جدة · شاطئ السلام',
      tierLabel: 'الملكية',
      href: '/order?tier=malakiyya',
    },
  ];
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-2">
              أنماط تليق بكل ذوق
            </h2>
            <p className="text-[var(--color-ink-mute)]">
              لكل بطاقة شخصيتها — فخامة كلاسيكية، نعومة عصرية، زخارف أندلسية، وغيرها.
            </p>
          </div>
          <Link
            href="/examples"
            className="text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-gold-3)] transition"
          >
            شف كل الأمثلة ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {samples.map((s) => (
            <SampleCardTile key={s.style} data={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Testimonial ============ */

function Testimonial() {
  return (
    <section className="section bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-3xl px-5">
        <div className="bg-white rounded-3xl p-10 border border-[var(--color-line)] text-center" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <div className="text-6xl mb-4" aria-hidden="true">"</div>
          <blockquote className="text-xl sm:text-2xl font-medium text-[var(--color-ink)] leading-relaxed mb-6">
            دعوة خالي صمّمتها دعوتي — والله أعجبته جدًّا.
            <br />
            كل ضيف فتح الرابط حسّ إنه أمام شي مختلف.
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f4d56e] to-[#8a6817] flex items-center justify-center text-white font-bold">
              ع
            </div>
            <div className="text-right">
              <div className="font-bold text-[var(--color-ink)]">عبدالرحمن</div>
              <div className="text-sm text-[var(--color-ink-mute)]">عميل، مايو ٢٠٢٦</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Final CTA ============ */

function Cta() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl px-5">
        <div
          className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a0a14 0%, #1a1a25 50%, #2a1505 100%)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(244,213,110,0.6) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gradient-gold relative">
            جاهز للبدء؟
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-md mx-auto relative">
            دون حاجة لتسجيل الدخول — جرّب النموذج، وادفع عند الاعتماد، ليبدأ فريقنا بالتصميم.
          </p>
          <Link
            href="/order"
            className="btn-gold relative"
          >
            اطلب دعوتك الآن ←
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */

function SiteFooter() {
  return (
    <footer className="bg-[var(--color-bg-alt)] border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BrandMark size={30} />
              <BrandWordmark fontSize={22} />
            </div>
            <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed max-w-sm">
              منصّة سعودية لبطاقات الدعوة الإلكترونية الفاخرة.
              نُصمّمها لك، وتشاركها مع ضيوفك بنقرة واحدة.
            </p>
          </div>
          <FooterCol
            title="المناسبات"
            links={[
              ['دعوة زواج', '/wedding'],
              ['دعوة خطوبة', '/engagement'],
              ['دعوة عيد', '/eid'],
              ['دعوة عقيقة', '/aqiqa'],
              ['دعوة تخرّج', '/graduation'],
            ]}
          />
          <FooterCol
            title="معلومات"
            links={[
              ['آلية العمل', '/how-it-works'],
              ['الباقات', '/pricing'],
              ['أمثلة', '/examples'],
              ['الأسئلة الشائعة', '/faq'],
              ['تواصل معنا', '/contact'],
            ]}
          />
        </div>

        <div className="border-t border-[var(--color-line)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-5 text-xs text-[var(--color-ink-faint)]">
            <Link href="/privacy" className="hover:text-[var(--color-ink-mute)] transition">الخصوصية</Link>
            <Link href="/terms" className="hover:text-[var(--color-ink-mute)] transition">الشروط</Link>
          </div>
          <p className="text-xs text-[var(--color-ink-faint)]">
            © {new Date().getFullYear()} دعوتي · صُنع بشغفٍ في الرياض
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-[var(--color-ink)] mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="text-sm text-[var(--color-ink-mute)] hover:text-[var(--color-ink)] transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
