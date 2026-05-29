import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://da3wati.com';
const SITE_NAME = 'دعوتي';
const DEFAULT_DESC =
  'بطاقات دعوة زواج وخطوبة وأعياد إلكترونية، فاخرة وتفاعلية، مع تأكيد حضور وردود الضيوف — ترسلها على واتساب بنقرة.';

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · بطاقات دعوة إلكترونية فاخرة`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: [
    'دعوة زواج إلكترونية',
    'بطاقة دعوة الكترونية',
    'دعوة عرس',
    'بطاقة زفاف',
    'دعوة خطوبة',
    'بطاقات الكترونية للواتساب',
    'تصميم دعوة زواج اونلاين',
    'دعوة عقيقة',
    'دعوة عيد',
    'دعوة تخرج',
    'بطاقة دعوة سعودية',
    'دعوة فاخرة',
    'بطاقة دعوة ذهبية',
  ],
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
      { url: '/og.jpg', width: 1200, height: 630, alt: 'دعوتي — بطاقات دعوة إلكترونية فاخرة' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} · بطاقات دعوة إلكترونية فاخرة`,
    description: 'صمّم دعوتك في دقائق وأرسلها على واتساب',
    images: ['/og.jpg'],
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
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

/** JSON-LD helper — emits the Organization schema. Pop into the root layout. */
export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@da3wati.com',
    availableLanguage: ['Arabic', 'English'],
  },
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
    lowPrice: '500',
    highPrice: '1500',
    priceCurrency: 'SAR',
    offerCount: '3',
  },
};
