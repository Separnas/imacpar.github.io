/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',          // ser till att Next exporterar statiska filer
  images: { unoptimized: true }, // krävs på GitHub Pages (ingen image-optimering)
  basePath: isProd ? '/imacpar.github.io' : '',   // rätt basväg för project pages
  assetPrefix: isProd ? '/imacpar.github.io/' : '', // gör att CSS/JS/Bilder hittas
  trailingSlash: true        // genererar .../index.html för varje sida
};

export default nextConfig;
