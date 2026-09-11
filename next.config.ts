import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Empty locally; set to `/events` by the GitHub Pages workflow, because a
// project site is served from `<user>.github.io/events` rather than the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  // Emit `en/index.html` instead of `en.html` so both `/en` and `/en/` resolve
  // on GitHub Pages, which has no rewrite rules.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
