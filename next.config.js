// next.config.js
module.exports = {
  compress: true,
  images: {
    domains: ['beta.walmartvriddhi.org','walmartvriddhi.vercel.app','walmartvriddhi.org','docs.walmartvriddhi.org'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}