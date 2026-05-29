import type { NextConfig } from 'next';

/**
 * Static export so we can host on GitHub Pages without a Node runtime.
 * When Hermes adds Supabase auth + payment flows, switch to SSR (drop
 * `output` and re-enable PPR) and move to Vercel.
 */
const isPagesBuild = process.env.GITHUB_PAGES === 'true';

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'export',
  trailingSlash: true,
  basePath: isPagesBuild ? '/dawati' : '',
  assetPrefix: isPagesBuild ? '/dawati' : '',
  images: { unoptimized: true },
  // Headers + experimental features can't run on static export — kept here
  // commented for when we move back to SSR.
};

export default config;
