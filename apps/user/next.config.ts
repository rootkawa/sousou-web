import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./locales/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: [
    '@workspace/ui',
    'react-markdown',
    'decode-named-character-reference',
    'mdast-util-from-markdown',
    'remark-parse',
    'remark-gfm',
    'remark-math',
    'remark-toc',
    'rehype-katex',
    'rehype-raw',
  ],
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.**.**',
      },
      {
        protocol: 'https',
        hostname: '**.**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
