import Link from 'next/link';
import { serviceLd } from '@/lib/seo';

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
          <BrandMark />
          <span className="text-lg font-extrabold text-[var(--color-ink)]">دعوتي</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--color-ink-soft)]">
          <Link href="/how-it-works" className="hover:text-[var(--color-ink)] transition">
            كيف يشتغل
          </Link>
          <Link href="/examples" className="hover:text-[var(--color-ink)] transition">
            أمثلة
          </Link>
          <Link href="/pricing" className="hover:text-[var(--color-ink)] transition">
            الباقات
          </Link>
          <Link href="/faq" className="hover:text-[var(--color-ink)] transition">
            الأسئلة
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

function BrandMark() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <defs>
        <linearGradient id="bm" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f4d56e" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
      </defs>
      <g transform="translate(16 16)">
        <polygon points="0,-12 3.5,-3.5 12,0 3.5,3.5 0,12 -3.5,3.5 -12,0 -3.5,-3.5" fill="url(#bm)" />
        <polygon
          points="0,-12 3.5,-3.5 12,0 3.5,3.5 0,12 -3.5,3.5 -12,0 -3.5,-3.5"
          fill="url(#bm)"
          transform="rotate(45)"
          opacity="0.55"
        />
      </g>
    </svg>
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
            احنا نصمّم دعوتك،
            <br />
            <span className="text-gradient-gold">وأنت تستقبل ضيوفك.</span>
          </h1>

          <p
            className="mt-7 mx-auto max-w-2xl text-balance text-[var(--color-ink-mute)] leading-relaxed"
            style={{ fontSize: 'clamp(16px, 2vw, 19px)' }}
          >
            بطاقات دعوة إلكترونية فاخرة، يصمّمها فريقنا حسب طلبك.
            تشاركها على واتساب، وتتابع ضيوفك من لوحة احترافية — كل التفاصيل في مكان واحد.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/order" className="btn-gold w-full sm:w-auto">
              اطلب دعوتك الآن ←
            </Link>
            <Link href="/examples" className="btn-ghost w-full sm:w-auto">
              شف الأمثلة
            </Link>
          </div>

          <p className="mt-6 text-sm text-[var(--color-ink-faint)]">
            تسليم خلال ١٢–٤٨ ساعة · استرداد كامل قبل بدء التصميم
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
        className="absolute inset-0 rounded-[40px] -m-8 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244,213,110,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Phone frame mockup */}
      <div className="relative mx-auto" style={{ maxWidth: 380 }}>
        <div
          className="rounded-[40px] p-3 border"
          style={{
            background: 'linear-gradient(180deg, #1a1a25 0%, #0a0a14 100%)',
            borderColor: '#2a2a35',
            boxShadow: '0 30px 80px rgba(15, 15, 30, 0.25), 0 8px 20px rgba(15, 15, 30, 0.12)',
          }}
        >
          <div
            className="rounded-[28px] overflow-hidden aspect-[9/16] relative"
            style={{
              background: '#020207',
            }}
          >
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />

            {/* Mock card content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              style={{
                background: `
                  radial-gradient(ellipse 60% 50% at 30% 20%, rgba(244, 208, 107, 0.20) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 50% at 80% 90%, rgba(217, 152, 120, 0.15) 0%, transparent 60%),
                  #020207
                `,
              }}
            >
              {/* Mini glass card */}
              <div
                className="w-full rounded-2xl p-5 text-center"
                style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.85) 0%, rgba(244,208,107,0.40) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 30px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div className="text-[9px] tracking-[3px] mb-2" style={{ color: '#8a6817', fontFamily: 'var(--font-latin)' }}>
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
                <div className="text-xl" style={{ color: '#b88a1e', fontFamily: 'var(--font-aref-ruqaa)' }}>و</div>
                <div className="text-[10px] mb-1 mt-2" style={{ color: '#8a6817', letterSpacing: 2 }}>
                  العَروس
                </div>
                <div
                  className="font-bold mb-3 text-gradient-gold"
                  style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 14, lineHeight: 1.2 }}
                >
                  كريمة عبد الله الفوزان
                </div>
                <div className="text-[11px] pt-3 border-t" style={{ borderColor: 'rgba(184, 138, 30, 0.3)', color: '#4a2c0a' }}>
                  الجمعة ٤ محرّم ١٤٤٨
                </div>
                <div className="text-[10px] mt-1" style={{ color: '#4a2c0a' }}>
                  الرياض · قاعة الفيصلية
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stats card */}
        <div
          className="hidden md:block absolute -right-12 top-1/3 glass-strong rounded-2xl p-4"
          style={{ animation: 'float-soft 4s ease-in-out infinite' }}
        >
          <div className="text-xs text-[var(--color-ink-mute)] mb-1">أكّدوا الحضور</div>
          <div className="text-2xl font-extrabold text-[var(--color-success)]">142</div>
          <div className="text-[10px] text-[var(--color-ink-faint)]">من أصل 200</div>
        </div>

        <div
          className="hidden md:block absolute -left-12 bottom-1/4 glass-strong rounded-2xl p-4"
          style={{ animation: 'float-soft 5s ease-in-out infinite reverse' }}
        >
          <div className="text-xs text-[var(--color-ink-mute)] mb-1">رسالة جديدة</div>
          <div className="text-sm font-semibold text-[var(--color-ink)]">«مبارك يا غالي 🌹»</div>
          <div className="text-[10px] text-[var(--color-ink-faint)] mt-1">قبل ٣ دقائق</div>
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

function HowItWorks() {
  const steps = [
    {
      n: '01',
      t: 'ارفع طلبك',
      d: 'املأ نموذج بسيط — التفاصيل اللي تخصّ مناسبتك ووصف اللي تتخيّله.',
      icon: '📝',
    },
    {
      n: '02',
      t: 'نتواصل ونصمّم',
      d: 'فريق المصمّمين يبدأ على طلبك فورًا — تصميم مخصّص يليق بمناسبتك.',
      icon: '🎨',
    },
    {
      n: '03',
      t: 'استلم وراجِع',
      d: 'تشوف المعاينة، تطلب تعديل إن أحببت، ثم تعتمد التصميم النهائي.',
      icon: '✓',
    },
    {
      n: '04',
      t: 'شاركها وتابع',
      d: 'تشاركها على واتساب، ولوحة تحكمك تعرض كل ضيوفك ورسائلهم لحظيًّا.',
      icon: '📊',
    },
  ];
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-3">
            بسيطة وما تستهلك وقتك
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
            كل اللي تحتاجه لإدارة ضيوفك
          </h2>
          <p className="text-lg text-[var(--color-ink-mute)] max-w-2xl mx-auto">
            ما هي مجرد دعوة — هي تجربة كاملة لك ولضيوفك.
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
  { icon: '📊', t: 'عدّاد لحظي', d: 'كم ضيف أكّد، كم اعتذر، كم لسّا ما رد — مُحدّث آنيًّا.' },
  { icon: '💬', t: 'رسائل الضيوف', d: 'كل دعاء أو رسالة من ضيف تصلك في لوحتك مرتّبة.' },
  { icon: '🎟', t: 'باركود لكل ضيف', d: 'تسجيل دخول بمسح الباركود عند مدخل القاعة.' },
  { icon: '🍽', t: 'تفضيلات الطعام', d: 'الضيف يختار نوع الوجبة وحساسياته عند تأكيد الحضور.' },
  { icon: '👶', t: 'عدد الأطفال', d: 'تعرف مسبقًا كم طفل بيحضر مع كل ضيف.' },
  { icon: '♿', t: 'احتياجات خاصة', d: 'تجهّز القاعة بناءً على متطلبات ضيوفك.' },
  { icon: '📥', t: 'تصدير القائمة', d: 'Excel و PDF — لمنظّم الحفل أو لطباعة قائمة الدخول.' },
  { icon: '⏰', t: 'تذكير تلقائي', d: 'يصل لضيوفك قبل الحفل بـ ٢٤ ساعة تلقائيًّا.' },
  { icon: '🌍', t: 'إحصاءات ذكية', d: 'من أيّ مدينة فتح الضيوف الدعوة، ومتى ذروة المشاركة.' },
];

/* ============ Sample gallery ============ */

function SampleGallery() {
  const samples = [
    { occasion: 'زواج', families: 'الراجحي ✦ الفوزان', date: 'الجمعة ٤ محرّم ١٤٤٨', palette: 'gold' as const },
    { occasion: 'زواج', families: 'التويجري ✦ السديري', date: 'الخميس ١٦ صفر ١٤٤٨', palette: 'rose' as const },
    { occasion: 'خطوبة', families: 'البابطين ✦ الزامل', date: 'الأحد ٢٦ صفر ١٤٤٨', palette: 'midnight' as const },
  ];
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-ink)] mb-2">
              أمثلة من تصاميمنا
            </h2>
            <p className="text-[var(--color-ink-mute)]">
              كل بطاقة مصمّمة من الصفر — لا قوالب جاهزة.
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
          {samples.map((s, i) => (
            <SampleCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleCard({
  occasion,
  families,
  date,
  palette,
}: {
  occasion: string;
  families: string;
  date: string;
  palette: 'gold' | 'rose' | 'midnight';
}) {
  const bg = {
    gold: 'linear-gradient(155deg, #fdf6e3 0%, #f4d56e 100%)',
    rose: 'linear-gradient(155deg, #fdf2ee 0%, #e09a85 100%)',
    midnight: 'linear-gradient(155deg, #f4f0fa 0%, #b8a3e0 100%)',
  }[palette];

  return (
    <article className="rounded-2xl overflow-hidden border border-[var(--color-line)] bg-white hover:shadow-lg transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
      <div
        className="aspect-[3/4] flex flex-col items-center justify-center p-6 text-center"
        style={{ background: bg }}
      >
        <div className="text-[10px] tracking-[3px] mb-3 font-semibold" style={{ color: '#8a6817' }}>
          دَعوَة · {occasion}
        </div>
        <div
          className="font-bold mb-3 text-gradient-gold leading-tight"
          style={{ fontFamily: 'var(--font-aref-ruqaa)', fontSize: 22 }}
        >
          {families}
        </div>
        <div className="text-xs" style={{ color: '#4a2c0a' }}>
          {date}
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--color-ink-mute)]">{occasion}</span>
        <Link href="/order" className="text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-gold-3)] transition">
          مثل هذي ←
        </Link>
      </div>
    </article>
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
            جاهز تبدأ؟
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-md mx-auto relative">
            ما يحتاج تسجّل دخول — جرّب النموذج، إذا عجبك ادفع، وفريقنا يصمّمها لك.
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
              <BrandMark />
              <span className="text-lg font-extrabold text-[var(--color-ink)]">دعوتي</span>
            </div>
            <p className="text-sm text-[var(--color-ink-mute)] leading-relaxed max-w-sm">
              منصّة سعودية لبطاقات الدعوة الإلكترونية الفاخرة.
              نصمّمها لك، وتشاركها مع ضيوفك بضغطة.
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
              ['كيف يشتغل', '/how-it-works'],
              ['الباقات', '/pricing'],
              ['أمثلة', '/examples'],
              ['الأسئلة', '/faq'],
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
            © {new Date().getFullYear()} دعوتي · صُنع بحب في الرياض
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
