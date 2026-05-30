import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'دعوتي · بطاقات دعوة إلكترونية فاخرة',
    short_name: 'دعوتي',
    description: 'صمّم دعوتك في دقائق وأرسلها على واتساب',
    lang: 'ar-SA',
    dir: 'rtl',
    start_url: '/',
    display: 'standalone',
    background_color: '#020207',
    theme_color: '#070914',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    categories: ['lifestyle', 'social', 'productivity'],
  };
}
