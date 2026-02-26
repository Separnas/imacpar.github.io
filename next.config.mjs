/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',                 // gör statiska filer
  images: { unoptimized: true },    // krävs på GitHub Pages
  basePath: isProd ? '/imacpar.github.io' : '',     // rätt basväg för projekt-sida
  assetPrefix: isProd ? '/imacpar.github.io/' : '', // så CSS/JS/Bilder hittas
  trailingSlash: true               // genererar .../index.html
};

export default nextConfig;
