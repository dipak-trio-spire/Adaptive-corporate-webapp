const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path')
module.exports = {
  // basePath: "/app",
  // assetPrefix: '/app',
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    // domains: ['adaptive-investments.com'],  // Client
    domains: ['adaptive.rocket-wp.com'],  // developer
  },
  // webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false , path:false};
    return config;
  },
  swcMinify: false
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/app/home',
  //       permanent: true,
  //     },
  //     
  //       source: '/',
  //       destination: '/app/tools/riskcontribution',
  //       has: [
  //         {
  //           type: 'header',
  //           key: 'host',
  //           value: 'halo.dev.adaptive-investments.com',
  //         },
  //       ],
  //       permanent: true,
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/app/faq',
  //       destination: '/faq',
  //       permanent: true,
  //     },
  //     // {
  //     //   source: '/',
  //     //   destination: '/app/home',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/advisor',
  //     //   destination: '/advisor/advisor_home',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/advisorlanding',
  //     //   destination: '/advisor/advisor_home',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/mc',
  //     //   destination: '/tools/mc',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/forwardtest',
  //     //   destination: '/tools/mc',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/mcv2',
  //     //   destination: '/tools/mcv2',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/forwardtestv2',
  //     //   destination: '/tools/mcv2',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: "/rw",
  //     //   destination: "/tools/rw",
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: "/riskweather",
  //     //   destination: "/tools/rw",
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/riskcontribution',
  //     //   destination: '/tools/riskcontribution',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/ppc',
  //     //   destination: '/tools/ppc',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/portfolioprotectioncalculator',
  //     //   destination: '/tools/ppc',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/portfolioprotectionpricer',
  //     //   destination: '/tools/ppc',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/ppcv2',
  //     //   destination: '/tools/ppcv2',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/portfolioprotectioncalculatorv2',
  //     //   destination: '/tools/ppcv2',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/ppcv3',
  //     //   destination: '/tools/ppcv3',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/portfolioprotectioncalculatorv3',
  //     //   destination: '/tools/ppcv3',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/api',
  //     //   destination: '/tools/enterprise_api',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/EnterpriseAPI',
  //     //   destination: '/tools/enterprise_api',
  //     //   permanent: true,
  //     // },
  //     // {
  //     //   source: '/requestdemo',
  //     //   destination: '/demo/requestdemo',
  //     //   permanent: true,
  //     // },
  //   ]
  // },
}
module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true },
);