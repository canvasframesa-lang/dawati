import Link from 'next/link';
import { Cosmos } from '@/components/Cosmos';
import { GoldDust } from '@/components/GoldDust';
import { TIERS, formatPrice } from '@/lib/tiers';
import { serviceLd } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <Cosmos />
      <GoldDust />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-8 sm:pt-12">
        <Header />
        <Hero />
        <HowItWorks />
        <DashboardCallout />
        <SampleCardCallout />
        <Pricing />
        <Faq />
        <Footer />
      </main>
    </>
  );
}

/* ============================================================ */

function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-3" aria-label="دعوتي — الصفحة الرئيسية">
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
          className="hidden sm:inline text-[color:var(--color-ink-light)] hover:text-[color:var(--color-gold-2)] transition text-sm"
        >
          الباقات
        </Link>
        <Link
          href="/how-it-works"
          className="hidden sm:inline text-[color:var(--color-ink-light)] hover:text-[color:var(--color-gold-2)] transition text-sm"
        >
          كيف يشتغل
        </Link>
        <Link
          href="/order"
          className="rounded-full px-5 py-2 text-sm font-bold"
          style={{
            background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
            color: '#2a1505',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.55), 0 6px 18px rgba(184,138,30,0.4)',
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
    <svg
      viewBox="0 0 40 40"
      width="34"
      height="34"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(184,138,30,0.5))' }}
    >
      <defs>
        <linearGradient id="bm" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff8d8" />
          <stop offset="50%" stopColor="#f4d06b" />
          <stop offset="100%" stopColor="#8a6817" />
        </linearGradient>
      </defs>
      <g transform="translate(20 20)">
        <polygon points="0,-15 4,-4 15,0 4,4 0,15 -4,4 -15,0 -4,-4" fill="url(#bm)" />
        <polygon
          points="0,-15 4,-4 15,0 4,4 0,15 -4,4 -15,0 -4,-4"
          fill="url(#bm)"
          transform="rotate(45)"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="mt-10 sm:mt-16 text-center">
      <p
        className="text-xs tracking-[0.5em] uppercase mb-4"
        style={{ color: 'var(--color-gold-3)', fontFamily: 'var(--font-latin)' }}
      >
        ✦  دعوتك تستاهل تصميم احترافي  ✦
      </p>
      <h1
        className="text-gold-shim text-balance"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(36px, 7vw, 64px)',
          lineHeight: 1.25,
          filter: 'drop-shadow(0 2px 12px rgba(244,208,107,0.3))',
        }}
      >
        احنا نصمّم دعوتك<br />وأنت تستقبل ضيوفك
      </h1>
      <p
        className="mt-6 mx-auto max-w-2xl text-balance"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(17px, 3vw, 22px)',
          color: 'var(--color-ink-light)',
          lineHeight: 1.8,
        }}
      >
        املأ تفاصيل دعوتك ووصف اللي تبيه — فريقنا يصمّمها لك بدقّة وفخامة،
        ويسلّمك الرابط ولوحة تحكم احترافية لمتابعة ضيوفك من جوّالك.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/order"
          className="rounded-2xl px-8 py-4 font-bold text-lg w-full sm:w-auto"
          style={{
            background: 'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
            color: '#2a1505',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.55), 0 10px 28px rgba(184,138,30,0.5)',
            fontFamily: 'var(--font-display)',
          }}
        >
          اطلب دعوتك الآن ←
        </Link>
        <Link
          href="/preview"
          className="rounded-2xl px-8 py-4 font-bold text-lg w-full sm:w-auto border-2"
          style={{
            borderColor: 'rgba(244, 208, 107, 0.55)',
            color: 'var(--color-gold-1)',
            fontFamily: 'var(--font-display)',
            backgroundColor: 'rgba(20, 14, 39, 0.4)',
            backdropFilter: 'blur(8px)',
          }}
        >
          شف عيّنة
        </Link>
      </div>

      <p
        className="mt-6 text-sm"
        style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-body)' }}
      >
        تسليم يبدأ من ١٢ ساعة · ضمان جودة · استرداد كامل قبل أوّل فتح من ضيف ✓
      </p>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: '١',
      title: 'املأ تفاصيلك',
      body: 'الأسماء، التاريخ، المكان، اللون اللي تحبّه، أيّ ملاحظات — كل اللي يخصّ مناسبتك',
    },
    {
      n: '٢',
      title: 'ادفع طلبك',
      body: 'مدى، Apple Pay، STC Pay، فيزا — كلها مقبولة وآمنة',
    },
    {
      n: '٣',
      title: 'فريقنا يصمّمها',
      body: 'مصمّمون محترفون يبدؤون على طلبك فورًا — تصميم مخصّص يليق بمناسبتك',
    },
    {
      n: '٤',
      title: 'استلم وشارك',
      body: 'يصلك رابط الدعوة + بيانات لوحة تحكمك — تشاركها على واتس وتتابع ضيوفك',
    },
  ];
  return (
    <section className="mt-24 sm:mt-32" aria-labelledby="how-heading">
      <h2
        id="how-heading"
        className="text-gold-shim text-center mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 42px)',
        }}
      >
        كيف يشتغل؟
      </h2>
      <p
        className="text-center mb-12 text-balance"
        style={{
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 2.5vw, 18px)',
        }}
      >
        ٤ خطوات — وأنت بكامل راحتك. التسليم من ١٢ ساعة (الملكية) إلى ٤٨ ساعة (المميّزة)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s) => (
          <article
            key={s.n}
            className="p-6 rounded-2xl border text-center"
            style={{
              background:
                'linear-gradient(155deg, rgba(255,255,255,0.06) 0%, rgba(244,208,107,0.04) 100%)',
              borderColor: 'rgba(184, 138, 30, 0.3)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-gold-grad"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, rgba(244,208,107,0.25), rgba(184,138,30,0.1))',
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {s.n}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-gold-1)',
                fontWeight: 700,
                fontSize: 20,
              }}
            >
              {s.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-ink-light)',
                opacity: 0.85,
              }}
            >
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DashboardCallout() {
  const items = [
    { icon: '📊', t: 'عدّاد لحظي', d: 'كم ضيف أكّد حضوره، كم اعتذر — مُحدّث كل ١٠ ثوانٍ' },
    { icon: '💬', t: 'رسائل الضيوف', d: 'كل دعاء أو رسالة من ضيف تصلك في لوحتك مرتّبة' },
    { icon: '🎟', t: 'باركود لكل ضيف', d: 'في الفاخرة والملكية — تسجيل دخول بالمسح عند القاعة' },
    { icon: '📥', t: 'تصدير القائمة', d: 'Excel و PDF — لمنظّم الحفل أو لطباعة قائمة الدخول' },
    { icon: '🌍', t: 'إحصاءات', d: 'من أيّ مدينة فتحوا الدعوة، متى وصلت ذروة المشاركة' },
    { icon: '🔔', t: 'تذكيرات تلقائية', d: 'قبل ٢٤ ساعة من الحفل، يصل تذكير لكل من أكّد' },
  ];
  return (
    <section className="mt-24 sm:mt-32" aria-labelledby="dash-heading">
      <h2
        id="dash-heading"
        className="text-gold-shim text-center mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 42px)',
        }}
      >
        لوحة تحكم احترافية مع كل دعوة
      </h2>
      <p
        className="text-center mb-12 text-balance mx-auto max-w-2xl"
        style={{
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 2.5vw, 18px)',
        }}
      >
        مع كل دعوة، نسلّمك لوحة خاصة بك — تتابع منها كل ضيوفك، تفضيلاتهم، ورسائلهم.
        تفتحها من أيّ جهاز، أي وقت.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((it) => (
          <article
            key={it.t}
            className="p-5 rounded-2xl border flex gap-4"
            style={{
              borderColor: 'rgba(184, 138, 30, 0.25)',
              background: 'rgba(20, 14, 39, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="text-3xl flex-shrink-0" aria-hidden="true">
              {it.icon}
            </div>
            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-gold-1)',
                  fontWeight: 700,
                  fontSize: 17,
                }}
              >
                {it.t}
              </h3>
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-ink-light)',
                  opacity: 0.85,
                }}
              >
                {it.d}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SampleCardCallout() {
  return (
    <section className="mt-24 sm:mt-32 text-center" aria-labelledby="sample-heading">
      <h2
        id="sample-heading"
        className="text-gold-shim mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 42px)',
        }}
      >
        شف عيّنة قبل ما تطلب
      </h2>
      <p
        className="mx-auto max-w-2xl text-balance mb-8"
        style={{
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 2.5vw, 18px)',
        }}
      >
        افتح المعاينة على جوّالك، انقر، اسحب، شف الورد ينفجر، الأسماء تتلألأ بالذهب،
        واضغط «سأحضر» لتشوف الألعاب النارية — كل دعوة تليق بك مماثلة في جمالها.
      </p>
      <Link
        href="/preview"
        className="inline-block rounded-2xl px-10 py-4 font-bold border-2"
        style={{
          borderColor: 'rgba(244, 208, 107, 0.55)',
          color: 'var(--color-gold-1)',
          fontFamily: 'var(--font-display)',
          backgroundColor: 'rgba(20, 14, 39, 0.4)',
          backdropFilter: 'blur(8px)',
          fontSize: 18,
        }}
      >
        افتح المعاينة الكاملة ←
      </Link>
    </section>
  );
}

function Pricing() {
  return (
    <section className="mt-24 sm:mt-32" aria-labelledby="pricing-heading">
      <h2
        id="pricing-heading"
        className="text-gold-shim text-center mb-4"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 42px)',
        }}
      >
        اختر الباقة اللي تليق فيك
      </h2>
      <p
        className="text-center mb-12 text-balance"
        style={{
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 2.5vw, 18px)',
        }}
      >
        كل الباقات شامل ضريبة القيمة المضافة · دفعة واحدة · بدون اشتراك · مع لوحة تحكم احترافية
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <article
            key={tier.id}
            className="relative p-7 rounded-3xl border flex flex-col"
            style={{
              background: tier.recommended
                ? 'linear-gradient(180deg, rgba(255,253,245,0.10) 0%, rgba(244,208,107,0.12) 100%)'
                : 'linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(244,208,107,0.04) 100%)',
              borderColor: tier.recommended
                ? 'rgba(244, 208, 107, 0.55)'
                : 'rgba(184, 138, 30, 0.3)',
              backdropFilter: 'blur(14px)',
              boxShadow: tier.recommended
                ? '0 16px 40px rgba(184,138,30,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
                : '0 8px 22px rgba(0,0,0,0.4)',
              transform: tier.recommended ? 'translateY(-8px)' : undefined,
            }}
          >
            {tier.recommended && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'linear-gradient(180deg, #fff8d8 0%, #f4d06b 100%)',
                  color: '#4a2c0a',
                  fontFamily: 'var(--font-ui)',
                  letterSpacing: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                الأكثر طلبًا
              </div>
            )}

            <h3
              className="text-gold-grad text-center mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {tier.name}
            </h3>
            <p
              className="text-center mb-6 text-sm leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-gold-1)',
                opacity: 0.9,
                fontStyle: 'italic',
              }}
            >
              {tier.tagline}
            </p>

            <div
              className="text-center mb-2 text-gold-shim"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1,
              }}
            >
              {formatPrice(tier.price)}
            </div>
            <div
              className="text-center mb-6 text-xs"
              style={{
                color: 'var(--color-ink-dim)',
                fontFamily: 'var(--font-ui)',
                letterSpacing: 3,
              }}
            >
              تسليم خلال {tier.deliveryHours} ساعة
            </div>

            <ul
              className="space-y-3 mb-8 flex-1"
              style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}
            >
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2" style={{ color: 'var(--color-ink-light)' }}>
                  <span style={{ color: 'var(--color-gold-2)', flexShrink: 0 }}>
                    {f.startsWith('كل ما في') ? '↑' : '✓'}
                  </span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/order?tier=${tier.id}`}
              className="block text-center rounded-2xl py-4 font-bold transition"
              style={
                tier.recommended
                  ? {
                      background:
                        'linear-gradient(180deg, #f4d06b 0%, #d4a93a 50%, #8a6817 100%)',
                      color: '#2a1505',
                      boxShadow:
                        'inset 0 1px 0 rgba(255,255,255,0.55), 0 8px 22px rgba(184,138,30,0.45)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 17,
                    }
                  : {
                      backgroundColor: 'rgba(20, 14, 39, 0.5)',
                      color: 'var(--color-gold-1)',
                      border: '1.5px solid rgba(244, 208, 107, 0.55)',
                      fontFamily: 'var(--font-display)',
                      fontSize: 17,
                    }
              }
            >
              اطلب {tier.name}
            </Link>
          </article>
        ))}
      </div>

      <p
        className="mt-10 text-center text-sm"
        style={{
          color: 'var(--color-ink-light)',
          fontFamily: 'var(--font-body)',
          opacity: 0.85,
        }}
      >
        💡 المطبوعات الورقية + شارات VIP + التسجيل الصوتي وغيرها متاحة كإضافات اختيارية في صفحة الطلب
      </p>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: 'وش الفرق بين الباقات؟',
      a: 'المميّزة (٧٠٠ ر.س): تصميم احترافي + لوحة تحكم بسيطة. الفاخرة (١٢٠٠ ر.س): تصميم مخصّص + باركود لكل ضيف + لوحة متقدّمة + ثنائي اللغة. الملكية (٢٠٠٠ ر.س): استشارة تصميم + شعار عائلي + مدير حساب + كل شيء.',
    },
    {
      q: 'كم وقت يأخذ التصميم؟',
      a: 'الملكية ١٢ ساعة، الفاخرة ٢٤ ساعة، المميّزة ٤٨ ساعة من اعتماد التفاصيل. الحالات العاجلة (٦ ساعات) متاحة بإضافة بسيطة.',
    },
    {
      q: 'هل تطبعون لي البطاقة فيزيائيًّا؟',
      a: 'نعم — تقدر تختار من إضافات الطباعة عند الطلب (١٠٠ / ٢٥٠ / ٥٠٠ بطاقة + خيار البريميوم بنقش ذهبي وتأثير بارز). نوصّل للرياض وجدة خلال ٣-٥ أيام.',
    },
    {
      q: 'كيف ألوحة التحكم تشتغل؟',
      a: 'بعد التسليم نرسلك رابط لوحتك مع كلمة سرّ خاصّة. تفتحها من أيّ جهاز، تشوف عدد الحاضرين والمعتذرين لحظيًّا، رسائل الضيوف، إحصاءات، ومن أيّ مدينة فتحوا الدعوة.',
    },
    {
      q: 'كم ضيف أقدر أرسل له الدعوة؟',
      a: 'بدون حد. تنشر رابطًا واحدًا وتشاركه مع أيّ عدد على واتساب. في الفاخرة والملكية، كل ضيف يحصل على رابط شخصي وباركود مستقل للدخول.',
    },
    {
      q: 'إذا غيّرت رأيي بعد ما دفعت؟',
      a: 'استرداد كامل إذا ألغيت قبل بدء التصميم. بعد بدء التصميم، تقدر تطلب تعديلات حسب الباقة (مرة في المميّزة، ٣ في الفاخرة، غير محدودة في الملكية).',
    },
    {
      q: 'وش وسائل الدفع المتاحة؟',
      a: 'مدى، Apple Pay، STC Pay، فيزا، ماستركارد. والفاتورة الضريبية تصلك على الإيميل خلال يوم.',
    },
    {
      q: 'بياناتي وبيانات ضيوفي آمنة؟',
      a: 'كل البيانات مشفّرة، ما نشاركها مع أحد، وبيانات ضيوفك ملكك أنت — تحذفها أيّ وقت من لوحتك. متوافقون مع نظام حماية البيانات السعودي (PDPL).',
    },
  ];
  return (
    <section className="mt-24 sm:mt-32 max-w-3xl mx-auto" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-gold-shim text-center mb-12"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 5vw, 42px)',
        }}
      >
        أسئلة شائعة
      </h2>
      <div className="space-y-4">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl p-5 border cursor-pointer transition"
            style={{
              borderColor: 'rgba(184, 138, 30, 0.3)',
              background: 'rgba(20, 14, 39, 0.4)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <summary
              className="flex items-center justify-between list-none"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-gold-1)',
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              <span>{it.q}</span>
              <span
                className="text-2xl transition-transform group-open:rotate-45"
                style={{ color: 'var(--color-gold-2)' }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p
              className="mt-4 leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-ink-light)',
                fontSize: 16,
              }}
            >
              {it.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="mt-24 pt-10 border-t text-center"
      style={{ borderColor: 'rgba(184, 138, 30, 0.2)' }}
    >
      <div className="flex justify-center gap-6 mb-6 text-sm">
        <Link href="/privacy" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الخصوصية
        </Link>
        <Link href="/terms" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الشروط
        </Link>
        <Link href="/faq" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          الأسئلة
        </Link>
        <a href="mailto:hello@da3wati.com" className="hover:text-[color:var(--color-gold-2)] transition" style={{ color: 'var(--color-ink-dim)' }}>
          تواصل
        </a>
      </div>
      <p
        className="text-xs"
        style={{ color: 'var(--color-ink-dim)', fontFamily: 'var(--font-latin)' }}
      >
        © {new Date().getFullYear()} دعوتي · صُنع بحب في الرياض 🌙
      </p>
    </footer>
  );
}
