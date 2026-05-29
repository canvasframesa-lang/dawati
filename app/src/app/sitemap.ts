import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://da3wati.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/wedding`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/engagement`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/eid`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/aqiqa`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/templates`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE}/pricing`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/how-it-works`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/examples`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
