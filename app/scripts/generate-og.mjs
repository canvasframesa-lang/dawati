/**
 * Static Open Graph image generator.
 *
 * Builds one 1200×630 PNG per route under /public/og/, composed of:
 *   - black cosmic background with a soft gold radial accent
 *   - the Dawati brand mark (envelope + burst) top-right in gold
 *   - per-route eyebrow + title + subtitle
 *   - cinematic footer chip (gold diamond + DA3WATI.COM)
 *
 * Pure SVG → sharp(librsvg) → PNG. No Satori, no Vercel/og, no browser.
 * Runs cleanly on Windows.
 *
 *   pnpm og:gen
 *
 * Re-run whenever titles / brand visuals change.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '..', 'public', 'og');

/* ============ Per-route content ============ */

/**
 * @typedef {object} OgEntry
 * @property {string} slug      file slug → /public/og/{slug}.png
 * @property {string} eyebrow   small uppercase tag above the title
 * @property {string} title     primary headline (keep short — no wrap)
 * @property {string} subtitle  one-line strap below the title
 */

/** @type {OgEntry[]} */
const ROUTES = [
  { slug: 'default',         eyebrow: 'Saudi Arabia', title: 'Luxury Arabic E-Invitations',  subtitle: 'Designed for you. Delivered to WhatsApp. Confirmed in real time.' },
  { slug: 'pricing',         eyebrow: 'Pricing',       title: 'Three Tiers. One-Time Payment.', subtitle: 'From 700 to 2,000 SAR · 15% VAT included · no subscription.' },
  { slug: 'examples',        eyebrow: 'Examples',      title: 'Six House Styles. Six Voices.',  subtitle: 'Royal · Modern · Andalusian · Manuscript · Botanical · Kufic.' },
  { slug: 'faq',             eyebrow: 'FAQ',           title: 'Everything You Need to Know.',   subtitle: 'Pricing, delivery, design, revisions, privacy — in plain Arabic.' },
  { slug: 'contact',         eyebrow: 'Contact',       title: 'Talk to the Team.',              subtitle: 'WhatsApp · Email · Order form — we reply within 30 minutes.' },
  { slug: 'how-it-works',    eyebrow: 'How It Works',  title: 'Order. Pay. Receive.',           subtitle: 'Three steps. 12 to 48 hours. Ready for WhatsApp.' },
  { slug: 'brand-kit',       eyebrow: 'Brand Kit',     title: 'Logo. Palette. Typography.',     subtitle: 'Ready-to-download brand assets for press and partners.' },
  { slug: 'dashboard-demo',  eyebrow: 'Host Dashboard', title: 'Every Guest. Every Choice.',    subtitle: 'Live RSVPs, meal prefs, barcode check-in, one-click exports.' },
  { slug: 'preview',         eyebrow: 'Live Preview',  title: 'Type Your Names. See Your Card.', subtitle: 'Interactive sandbox — six styles, your details, instant render.' },
];

/* ============ SVG template ============ */

// The brand mark's 4 paths, sized to fit a 100×70 box (scaled from 1080×759.53).
// Kept inline so the script is self-contained.
const BRAND_PATHS = [
  'M1014.99,139.94c-14.84-38.22-44.8-68.96-82.49-84.84-18.01-7.59-37.79-11.79-58.53-11.79H206.02c-7.54,0-14.96.56-22.2,1.63-52.31,7.73-95.97,42.34-116.46,89.3-8.06,18.47-12.54,38.86-12.54,60.27v370.52c0,82.47,66.38,149.74,148.51,151.17.9.02,1.79.03,2.69.03h667.95c8.28,0,16.41-.67,24.33-1.96,71.85-11.67,126.88-74.15,126.88-149.24V194.51c0-19.23-3.61-37.64-10.19-54.57ZM979.18,565.03c0,58.01-47.2,105.2-105.21,105.2H206.02c-58.01,0-105.2-47.19-105.2-105.2V194.51c0-16.79,3.96-32.68,11-46.78,17.23-34.6,52.99-58.42,94.2-58.42h667.95c41.31,0,77.14,23.93,94.33,58.66,6.97,14.04,10.88,29.84,10.88,46.54v370.52Z',
  'M380.22,539.32l-130.92,130.91h65.06l98.39-98.38-32.53-32.53ZM698.48,514.45l-32.52,32.53,123.25,123.25h65.05l-155.78-155.78Z',
  'M979.18,194.51v38.54c-2.67,3.13-5.47,6.17-8.41,9.11l-272.29,272.29-32.52,32.53-32.12,32.12c-29.48,29.47-68.2,44.21-106.92,44.21s-77.44-14.74-106.92-44.21L109.22,268.32c-2.94-2.94-5.74-5.97-8.4-9.1v-64.71c0-16.79,3.96-32.68,11-46.78-.59,4.5-.88,9.06-.88,13.67,0,28.1,10.94,54.52,30.81,74.39l271,271,32.52,32.53,7.25,7.25c19.88,19.87,46.3,30.81,74.4,30.81s54.52-10.94,74.39-30.81l32.12-32.12,32.53-32.52,272.29-272.3c16.84-16.84,27.26-38.38,30.05-61.66,6.97,14.04,10.88,29.84,10.88,46.54Z',
  'M564.93,283.11c20.7,30.51,52.2,46.77,86.92,51.41,3.91.52,9.5-.32,13.27,1.17.77.3.95-.19.77,1.24-10.06.37-19.59,1.39-29.43,3.69-16.94,3.97-33.32,11.16-47.37,21.98-37.31,28.73-57.97,93.62-61.42,140.71-.23,3.16.98,8.09-1.1,10.3-1.2-4.41-.71-9.35-1.18-13.76-5.64-51.96-27.86-118.18-72.99-145.47-18.64-11.27-41.34-17.28-62.61-18.12l-4.21-1.1,24.47-3.09c36.45-7.46,64.21-27,83.91-60.22,19.76-33.32,30.05-72.89,32.06-112.2,2.89.58,1.45,6.98,1.66,9.71,2.95,37.52,16.39,82.97,37.26,113.74Z',
];

/** Build the SVG for one route. */
function buildSvg({ eyebrow, title, subtitle }) {
  // Title wrap: split on " · " or naive word-wrap if longer than ~28 chars.
  // For our short titles this is a single line.
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle);
  const safeEyebrow = escapeXml(eyebrow.toUpperCase());

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="dark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050410"/>
      <stop offset="55%" stop-color="#0a0820"/>
      <stop offset="100%" stop-color="#050410"/>
    </linearGradient>
    <radialGradient id="goldHaze" cx="22%" cy="28%" r="55%">
      <stop offset="0%" stop-color="rgb(244, 213, 110)" stop-opacity="0.18"/>
      <stop offset="60%" stop-color="rgb(244, 213, 110)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cornerFlare" cx="100%" cy="100%" r="50%">
      <stop offset="0%" stop-color="rgb(244, 213, 110)" stop-opacity="0.22"/>
      <stop offset="70%" stop-color="rgb(244, 213, 110)" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#dark)"/>
  <rect width="1200" height="630" fill="url(#goldHaze)"/>
  <rect width="1200" height="630" fill="url(#cornerFlare)"/>

  <!-- Brand mark + wordmark, top-right -->
  <g transform="translate(960 60) scale(0.092)" fill="#f4d56e">
    ${BRAND_PATHS.map((d) => `<path d="${d}"/>`).join('\n    ')}
  </g>
  <text x="1090" y="115" font-family="Arial, sans-serif" font-size="42" font-weight="900" fill="#f4d56e" text-anchor="end" letter-spacing="-1.6">DAWATI</text>

  <!-- Content stack -->
  <text x="110" y="290" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="#c9a23d" letter-spacing="6">${safeEyebrow}</text>
  <text x="110" y="395" font-family="Arial, sans-serif" font-size="78" font-weight="900" fill="#fff8d8" letter-spacing="-2.5">${safeTitle}</text>
  <text x="110" y="455" font-family="Arial, sans-serif" font-size="28" font-weight="500" fill="#c9a23d">${safeSubtitle}</text>

  <!-- Footer cinematic chip -->
  <g transform="translate(110 545)">
    <rect x="0" y="0" width="9" height="9" transform="rotate(45 4.5 4.5)" fill="#f4d56e"/>
    <text x="22" y="9" font-family="Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="4" fill="#8a6817">DA3WATI.COM</text>
  </g>
</svg>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/* ============ Main ============ */

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const entry of ROUTES) {
    const svg = buildSvg(entry);
    const outPath = resolve(OUT_DIR, `${entry.slug}.png`);
    await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(outPath);
    console.log(`  ✓  /public/og/${entry.slug}.png  ←  ${entry.title}`);
  }

  console.log(`\nGenerated ${ROUTES.length} OG images in ${OUT_DIR}`);
}

main().catch((err) => {
  console.error('OG generation failed:', err);
  process.exit(1);
});
