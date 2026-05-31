import type { MetadataRoute } from 'next';
import { ALL_STYLE_SLUGS } from '@/lib/style-details';

export const dynamic = 'force-static';

const SITE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://da3wati.com';

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

/* Every public route, in importance order. Omit:
   - /order   (form page — no organic traffic value)
   - /preview (iframe demo, noindex per cardPageMetadata) */
const STATIC_PAGES: Entry[] = [
  { path: '',                changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/wedding',        changeFrequency: 'monthly', priority: 0.9 },
  { path: '/engagement',     changeFrequency: 'monthly', priority: 0.9 },
  { path: '/eid',            changeFrequency: 'monthly', priority: 0.8 },
  { path: '/aqiqa',          changeFrequency: 'monthly', priority: 0.8 },
  { path: '/graduation',     changeFrequency: 'monthly', priority: 0.8 },
  { path: '/occasions',      changeFrequency: 'monthly', priority: 0.8 },
  { path: '/examples',       changeFrequency: 'weekly',  priority: 0.8 },
  { path: '/pricing',        changeFrequency: 'monthly', priority: 0.7 },
  { path: '/how-it-works',   changeFrequency: 'monthly', priority: 0.7 },
  { path: '/faq',            changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact',        changeFrequency: 'yearly',  priority: 0.5 },
  { path: '/marah',          changeFrequency: 'monthly', priority: 0.7 },
  { path: '/tanzeem',        changeFrequency: 'monthly', priority: 0.7 },
  { path: '/dashboard-demo', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/brand-kit',      changeFrequency: 'yearly',  priority: 0.3 },
  { path: '/privacy',        changeFrequency: 'yearly',  priority: 0.3 },
  { path: '/terms',          changeFrequency: 'yearly',  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Every example style detail page (royal-cosmos, modern-minimal, ...)
  for (const slug of ALL_STYLE_SLUGS) {
    entries.push({
      url: `${SITE}/examples/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return entries;
}
