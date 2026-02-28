
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? '/imacpar.github.io' : '',
  assetPrefix: isProd ? '/imacpar.github.io/' : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/imacpar.github.io' : ''
  }
};

export default nextConfig;
