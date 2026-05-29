# SEO & Keywords · دعوتي

> Saudi market, Arabic-first SEO. Goals: own the "دعوة زواج إلكترونية" SERP in Saudi Google within 6 months; rank for occasion-specific long-tail queries.

---

## 1. Primary keywords (target rank top 3 in google.com.sa, lang=ar)

### High-intent commercial
- **دعوة زواج إلكترونية** — primary money keyword, very high commercial intent
- **بطاقة دعوة الكترونية** — broad, high volume
- **دعوة عرس** — colloquial, very high volume
- **بطاقة زفاف** — formal variant
- **دعوة خطوبة** — adjacent occasion
- **بطاقات الكترونية للواتساب** — channel-specific, high intent
- **تصميم دعوة زواج اونلاين** — service intent

### Occasion long-tail
- دعوة عقيقة الكترونية
- بطاقة دعوة عيد
- دعوة تخرج رسمية
- دعوة افتتاح
- بطاقة دعوة ملكة
- دعوة افطار رمضان
- بطاقة دعوة استقبال مولود

### Modifier long-tail
- دعوة زواج فاخرة
- بطاقة دعوة ذهبية
- دعوة عرس بدون طباعة
- دعوة الكترونية مع تأكيد حضور
- دعوة فاخرة بالعربي
- بطاقة دعوة سعودية

### Question / how-to
- كيف اسوي دعوة زواج اونلاين
- ايش افضل موقع لتصميم بطاقات الدعوة
- تصميم دعوة زواج بدون طباعة
- وش افضل تطبيق دعوة عرس

### Local
- دعوة زواج الرياض
- بطاقة عرس جدة
- دعوة افراح السعودية
- محلات تصميم بطاقات دعوة الرياض

---

## 2. Page-level SEO map

| URL | Title (60ch max) | H1 | Meta description (155ch max) | Primary keyword |
|---|---|---|---|---|
| `/` | دعوتي · بطاقات دعوة إلكترونية فاخرة بضغطة | صمّم دعوتك في دقائق | بطاقات دعوة زواج وخطوبة وأعياد إلكترونية، فاخرة وتفاعلية، مع تأكيد حضور وردود الضيوف — ترسلها على واتساب بنقرة | دعوة زواج إلكترونية |
| `/wedding` | دعوة زواج إلكترونية فاخرة · دعوتي | بطاقة دعوة زواج تليق بمناسبتك | صمّم دعوة زواج إلكترونية مع آية الزواج وتأكيد حضور ولوحة تحكم — قوالب فاخرة بأقل من ثمن الطباعة | دعوة زواج إلكترونية |
| `/engagement` | دعوة خطوبة إلكترونية · دعوتي | بطاقة دعوة خطوبة أنيقة | بطاقة خطوبة فاخرة، تفاعلية، تشاركها على واتساب — مع نموذج تأكيد حضور ولوحة لمتابعة الردود | دعوة خطوبة |
| `/eid` | دعوة عيد إلكترونية · دعوتي | عيدية رقمية للأهل والأصدقاء | بطاقة دعوة عيد فاخرة بتصميم ذهبي، ترسلها على واتساب — تقبّل الله منا ومنكم | بطاقة عيد |
| `/aqiqa` | دعوة عقيقة إلكترونية · دعوتي | بطاقة دعوة عقيقة المولود | بطاقة دعوة عقيقة فاخرة باسم المولود — تشاركها على واتساب مع تأكيد الحضور | دعوة عقيقة |
| `/templates` | قوالب بطاقات الدعوة الإلكترونية · دعوتي | اختر القالب اللي يناسب مناسبتك | تصفّح قوالب دعوة الزواج، الخطوبة، العيد، العقيقة، التخرج — كلها تفاعلية وفاخرة | قوالب دعوة |
| `/pricing` | الأسعار · دعوتي | اختر الباقة اللي تناسبك | باقة أساسية ومميزة وملكية — لكل مناسبة باقة تليق بها. تأكيد حضور ولوحة تحكم في كل الباقات | اسعار بطاقة دعوة |
| `/how-it-works` | كيف يشتغل · دعوتي | ٤ خطوات وتنشر دعوتك | اختر القالب، اكتب الأسماء والتاريخ، ادفع، وأرسل الرابط على واتساب — وش أبسط من كذا | كيف اسوي دعوة |

### Page hierarchy / silo
```
/
├── /wedding              ← occasion landing
│   ├── /wedding/templates
│   └── /wedding/examples
├── /engagement
├── /eid
├── /aqiqa
├── /graduation
├── /templates            ← cross-occasion gallery
├── /pricing
├── /how-it-works
├── /examples             ← real (or sample) cards as case studies
├── /faq
├── /blog                 ← Phase 2 — long-tail SEO content
│   └── /blog/[slug]
├── /privacy
├── /terms
└── /contact
```

---

## 3. Meta + OG template (every page extends this in Next.js `metadata`)

```tsx
// app/src/lib/seo.ts
export const baseMetadata = {
  metadataBase: new URL('https://da3wati.com'),
  title: {
    default: 'دعوتي · بطاقات دعوة إلكترونية فاخرة',
    template: '%s · دعوتي',
  },
  description: 'بطاقات دعوة زواج وخطوبة وأعياد إلكترونية، فاخرة وتفاعلية، مع تأكيد حضور وردود الضيوف — ترسلها على واتساب بنقرة',
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
  ],
  authors: [{ name: 'دعوتي' }],
  creator: 'دعوتي',
  publisher: 'دعوتي',
  formatDetection: { email: false, telephone: false, address: false },
  alternates: {
    canonical: '/',
    languages: { 'ar-SA': '/', 'ar': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://da3wati.com',
    siteName: 'دعوتي',
    title: 'دعوتي · بطاقات دعوة إلكترونية فاخرة',
    description: 'صمّم دعوتك في دقائق وأرسلها على واتساب',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'دعوتي — بطاقات دعوة إلكترونية' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دعوتي · بطاقات دعوة إلكترونية فاخرة',
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
  applicationName: 'دعوتي',
  appleWebApp: {
    capable: true,
    title: 'دعوتي',
    statusBarStyle: 'black-translucent',
  },
};
```

---

## 4. Structured data (Schema.org JSON-LD)

### Home page
```jsonld
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "دعوتي",
  "url": "https://da3wati.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://da3wati.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "ar-SA"
}
```

### Service offering
```jsonld
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "بطاقات دعوة إلكترونية فاخرة",
  "provider": { "@type": "Organization", "name": "دعوتي", "url": "https://da3wati.com" },
  "areaServed": { "@type": "Country", "name": "Saudi Arabia" },
  "serviceType": "بطاقات دعوة إلكترونية",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "49",
    "highPrice": "199",
    "priceCurrency": "SAR",
    "offerCount": "3"
  }
}
```

### Organization (in root layout)
```jsonld
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "دعوتي",
  "url": "https://da3wati.com",
  "logo": "https://da3wati.com/logo.png",
  "sameAs": [
    "https://twitter.com/da3wati",
    "https://instagram.com/da3wati",
    "https://snapchat.com/add/da3wati"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@da3wati.com",
    "availableLanguage": ["Arabic", "English"]
  }
}
```

### Product (per template / pricing tier)
```jsonld
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "دعوة زواج إلكترونية — الباقة المميزة",
  "description": "بطاقة دعوة زواج تفاعلية مع تأكيد حضور ولوحة تحكم",
  "brand": "دعوتي",
  "offers": {
    "@type": "Offer",
    "price": "99",
    "priceCurrency": "SAR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "0"
  }
}
```
(Update reviewCount once we have real reviews — don't fake them.)

### FAQ (on `/faq` and embed snippets in occasion pages)
```jsonld
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "كيف أصمم دعوة زواج إلكترونية؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "اختر القالب من دعوتي، اكتب أسماء العروسين والتاريخ والمكان، ادفع، وستحصل على رابط ترسله لضيوفك على واتساب."
      }
    }
    // ... more FAQ items
  ]
}
```

### Event (for the actual card pages — gives guests Google Calendar integration)
```jsonld
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "زفاف {groomName} و{brideName}",
  "startDate": "2026-05-30T08:00:00+03:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "حي الأندلس — الحواتة",
    "address": { "@type": "PostalAddress", "addressLocality": "الحواتة", "addressCountry": "SD" }
  },
  "organizer": { "@type": "Person", "name": "{senderName}" }
}
```

---

## 5. Archive files (static SEO assets, ship in `public/`)

### `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /dashboard
Disallow: /checkout
Disallow: /draft/

Sitemap: https://da3wati.com/sitemap.xml
```

### `public/sitemap.xml` (or generated via `app/sitemap.ts` in Next.js — preferred)
Dynamic. Includes:
- All marketing pages (`/`, `/wedding`, `/engagement`, `/eid`, ...)
- All published *public* sample cards from `/examples/*`
- Blog posts when Phase 2 launches
- **NOT** individual customer cards (those are noindex by design — guests-only)

```ts
// app/src/app/sitemap.ts
import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://da3wati.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://da3wati.com/wedding', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://da3wati.com/engagement', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://da3wati.com/eid', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://da3wati.com/aqiqa', changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://da3wati.com/templates', changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://da3wati.com/pricing', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://da3wati.com/how-it-works', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://da3wati.com/faq', changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://da3wati.com/examples', changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://da3wati.com/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://da3wati.com/terms', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
```

### `public/manifest.webmanifest` (PWA)
```json
{
  "name": "دعوتي · بطاقات دعوة إلكترونية فاخرة",
  "short_name": "دعوتي",
  "description": "صمّم دعوتك في دقائق وأرسلها على واتساب",
  "lang": "ar-SA",
  "dir": "rtl",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020207",
  "theme_color": "#070914",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "categories": ["lifestyle", "social", "productivity"]
}
```

### `public/.well-known/security.txt`
```
Contact: mailto:security@da3wati.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: ar, en
```

### `public/humans.txt` (nice-to-have, signals craft)
```
/* TEAM */
   Founder: عبدالرحمن (Abdelrahman)
   Built with: Next.js 15, Cloudflare Workers, Supabase, Tailwind 4
   From: Riyadh & Khartoum, 2026
```

---

## 6. Per-card-page (customer card) SEO

Individual customer cards at `/c/<slug>` are intentionally **noindex**:
```tsx
export const metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};
```
**Why:** guest privacy. We never want a wedding invitation to appear in Google search. The OG meta is still set (rich previews on WhatsApp/Twitter), but search engines are told to skip.

The exception: cards explicitly marked `is_public_showcase = true` (with customer consent) appear under `/examples/*` and DO get indexed.

---

## 7. Search Console & analytics setup checklist

- [ ] Register `da3wati.com` and `da3wati.sa` in **Google Search Console** (verify via DNS TXT)
- [ ] Register in **Bing Webmaster Tools** (Saudi search share is non-zero; Bing also feeds DuckDuckGo)
- [ ] Submit sitemap URLs in both
- [ ] Connect **Cloudflare → Search Console** integration for free Core Web Vitals data
- [ ] Set up **Plausible** (self-hosted on Hetzner € 5/mo or on cloud.plausible.io if simpler) — *or* Vercel Analytics
- [ ] Enable **Vercel Speed Insights** (free)
- [ ] Connect **Sentry** for error monitoring
- [ ] Set up alerts: any 5xx > 1% of requests, LCP > 3s for 24h, sentry P1+ error

---

## 8. Content strategy (Phase 2 — once MVP is live)

Long-tail blog posts ranked for high-intent queries:
- "كيف تختار بطاقة دعوة زواج إلكترونية مناسبة" — buyer's guide
- "أفضل آيات قرآنية للدعوات والمناسبات" — religious content + verse library promo
- "ترتيب حفل عرس سعودي — دليل كامل" — adjacent service, captures wider funnel
- "الفرق بين بطاقة الدعوة المطبوعة والإلكترونية" — comparison post
- "إتيكيت إرسال دعوات الزواج على واتساب" — etiquette / how-to
- "أفكار لكلمات الدعوة في مناسبات مختلفة" — content marketing for the verse library

Each post: 800-1500 words, includes a CTA to start configuring, internal-links to occasion pages.

---

## 9. Link-building / off-page (Phase 2)

- **Saudi wedding blogs / Instagram accounts** — partner for affiliate codes (10-20% revenue share, capped). Top accounts: @saudi_brides, @hayatey_official, etc. (verify, don't take this list as truth).
- **Submission to Saudi product directories** — Hsoub Academy roundups, ProductHunt (less Saudi reach, but English audience for affiliate growth).
- **Twitter/X presence** — share template previews, customer (consented) cards, build in public threads.
- **TikTok / Snapchat short demo videos** — Saudi audience lives there. 15-second "configure and share" reel.

---

## 10. Domain & DNS posture

Recommended setup:
- **Primary:** `da3wati.com` — apex serves the marketing app
- **Mirror:** `da3wati.sa` — 301 to `da3wati.com` (Saudi TLD for trust signal, but consolidate SEO juice)
- **Customer cards:** `da3wati.com/c/<slug>` (path-based, MVP) — later `<slug>.cards.da3wati.com` if we want subdomain branding
- **API:** `api.da3wati.com` → Cloudflare Worker (CNAME)
- **WWW:** `www.da3wati.com` → 301 to apex
- **Email:** Use **Resend's own sending domain** for transactional initially; add `mg.da3wati.com` once we get serious volume
- **DMARC/SPF/DKIM:** configure before sending any production emails or they'll land in spam
