import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://da3wati.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin', '/dashboard', '/checkout', '/draft/', '/c/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
