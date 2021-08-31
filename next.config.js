const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
 const baseConf = {
  eslint: {
   ignoreDuringBuilds: true,
  },
  experimental: {
   styledComponents: true,
  },
  i18n: {
   locales: ['en', 'pt'],
   defaultLocale: 'en',
  },
  images: {
   domains: [''],
  },
  linaria: {
   cacheDirectory: '.next/cache/linaria',
   sourceMap: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
   ignoreBuildErrors: true,
  },
  webpack: config => {
   config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
   });
   Object.assign(config.optimization.splitChunks, {
    cacheGroups: {
     ui: {
      test: /node_modules\/.pnpm\/(react-icons.*\/).*/,
      name: 'ui',
      chunks: 'all',
     },
    },
   });

   return config;
  },
 };

 // Dev-specific settings
 if (phase === PHASE_DEVELOPMENT_SERVER) {
  Object.assign(baseConf, {});
 } else {
  Object.assign(baseConf, {});
 }

 return baseConf;
};
