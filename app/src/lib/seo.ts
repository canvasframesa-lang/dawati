import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://da3wati.com';
const SITE_NAME = 'دعوتي';
const DEFAULT_DESC =
  'بطاقات دعوة زواج وخطوبة وأعياد إلكترونية، فاخرة وتفاعلية، مع تأكيد حضور وردود الضيوف — ترسلها على واتساب بنقرة.';

/* ============ Keyword bank ============
   MSA terms drive the title/description copy across the site (per the
   "خلك محترف" rule). Najdi colloquial terms live ONLY here in the
   keywords array, because that's where Saudi users actually type
   queries into Google ("ابغى دعوة عرس", "وش افضل موقع دعوات", etc).
   Don't move these strings into visible copy. */

const KW_MSA_CORE = [
  'دعوة زواج إلكترونية',
  'بطاقة دعوة إلكترونية',
  'دعوة عرس',
  'بطاقة زفاف',
  'دعوة خطوبة',
  'دعوة ملكة',
  'بطاقة دعوة سعودية',
  'دعوة فاخرة',
  'بطاقة دعوة ذهبية',
  'تصميم دعوة زواج اونلاين',
  'دعوة مع تأكيد حضور',
  'دعوة بدون طباعة',
  'بطاقات إلكترونية للواتساب',
  'دعوة عقيقة',
  'دعوة عيد',
  'دعوة تخرّج',
  'دعوة افتتاح',
  'دعوة استقبال مولود',
  'بطاقة دعوة فاخرة بالباركود',
  'دعوة حنّاء',
  'لوحة تحكم لإدارة الضيوف',
];

const KW_NAJDI = [
  'أبغى دعوة عرس',
  'وش افضل موقع دعوات',
  'تصميم دعوة على الجوال',
  'بطاقة عرس واتساب',
  'ودي اسوي بطاقة عرس',
  'بطاقة دعوة جاهزة',
  'دعوات الكترونية الرياض',
  'دعوات الكترونية جدة',
  'دعوة ملكة فخمة',
  'احسن موقع دعوات الكترونية',
  'بطاقة دعوة بالاسماء',
  'دعوة عقد قران',
];

export const KEYWORDS: {
  msa: string[];
  najdi: string[];
  all: string[];
} = {
  msa: KW_MSA_CORE,
  najdi: KW_NAJDI,
  all: [...KW_MSA_CORE, ...KW_NAJDI],
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · بطاقات دعوة إلكترونية فاخرة`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: KEYWORDS.all,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, telephone: false, address: false },
  alternates: {
    canonical: '/',
    languages: { 'ar-SA': '/', ar: '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · بطاقات دعوة إلكترونية فاخرة`,
    description: 'صمّم دعوتك في دقائق وأرسلها على واتساب',
    images: [
      { url: '/og/default.png', width: 1200, height: 630, alt: 'دعوتي — بطاقات دعوة إلكترونية فاخرة' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} · بطاقات دعوة إلكترونية فاخرة`,
    description: 'صمّم دعوتك في دقائق وأرسلها على واتساب',
    images: ['/og/default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: { url: '/icon.svg', type: 'image/svg+xml' },
  },
  manifest: '/manifest.webmanifest',
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'black-translucent',
  },
};

/** Mark customer card pages as noindex (guest privacy). */
export const cardPageMetadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

/* ============ Per-page metadata helper ============ */

/**
 * Build a per-page Metadata object with title, description, and a
 * tuned keyword list. Always merges with the global Najdi+MSA bank
 * so every page carries the full search surface.
 */
/**
 * Map a route path to its pre-generated OG image under /public/og/.
 * Falls back to the default branded card if no per-route image exists.
 * Keep this list in sync with scripts/generate-og.mjs ROUTES.
 */
const OG_BY_PATH: Record<string, string> = {
  '/':                '/og/default.png',
  '/pricing':         '/og/pricing.png',
  '/examples':        '/og/examples.png',
  '/faq':             '/og/faq.png',
  '/contact':         '/og/contact.png',
  '/how-it-works':    '/og/how-it-works.png',
  '/brand-kit':       '/og/brand-kit.png',
  '/dashboard-demo':  '/og/dashboard-demo.png',
  '/preview':         '/og/preview.png',
};

function ogImageFor(path: string): string {
  return OG_BY_PATH[path] ?? '/og/default.png';
}

export function pageMetadata({
  title,
  description,
  path,
  extraKeywords = [],
}: {
  title: string;
  description: string;
  path: string;
  extraKeywords?: string[];
}): Metadata {
  const ogImage = ogImageFor(path);
  return {
    title,
    description,
    keywords: [...extraKeywords, ...KEYWORDS.all],
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

/* ============ JSON-LD blocks ============ */

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@da3wati.com',
    availableLanguage: ['Arabic', 'English'],
  },
  // Social profiles — keep in sync with SOCIAL_LINKS in PageShell.tsx
  sameAs: [
    'https://instagram.com/dawati',
    'https://tiktok.com/@dawati',
    'https://snapchat.com/add/dawati',
    'https://x.com/dawati',
  ],
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ar-SA',
};

export const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'بطاقات دعوة إلكترونية فاخرة',
  provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
  serviceType: 'بطاقات دعوة إلكترونية',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '700',
    highPrice: '2000',
    priceCurrency: 'SAR',
    offerCount: '3',
  },
};

/** Build a BreadcrumbList LD for a nested page. */
export function breadcrumbLd(
  crumbs: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Build a FAQPage LD from a flat array of Q/A pairs. */
export function faqLd(items: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
