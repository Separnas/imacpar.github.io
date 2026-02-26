/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',                 // gör statisk export (till out/)
  images: { unoptimized: true },    // krävs på GitHub Pages (ingen image-optimering)
  basePath: isProd ? '/imacpar.github.io' : '',     // rätt basväg i produktion
  assetPrefix: isProd ? '/imacpar.github.io/' : '', // så att CSS/JS/bilder hittas
  trailingSlash: true               // generera .../index.html för varje sida
};

export default nextConfig;
