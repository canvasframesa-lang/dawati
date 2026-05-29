import type { Metadata, Viewport } from 'next';
import { Tajawal, Amiri, Aref_Ruqaa, Reem_Kufi, El_Messiri, Cairo, Inter } from 'next/font/google';
import { baseMetadata, organizationLd, websiteLd } from '@/lib/seo';
import './globals.css';

/**
 * Tajawal — primary modern Saudi font. Used for all website chrome.
 * Amiri — kept ONLY for Quranic verses (with diacritics).
 * Aref Ruqaa — kept ONLY for the actual delivered card preview.
 * Inter — Latin labels and numbers.
 */
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  display: 'swap',
  variable: '--font-tajawal',
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-amiri',
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-aref-ruqaa',
});

const reemKufi = Reem_Kufi({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-reem-kufi',
});

const elMessiri = El_Messiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-el-messiri',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: '#fafaf7',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${amiri.variable} ${arefRuqaa.variable} ${reemKufi.variable} ${elMessiri.variable} ${cairo.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body>
        <div className="page-backdrop" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
