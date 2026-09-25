import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  // Pages supplies the repository subpath at build time; local previews use the root.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default config;
