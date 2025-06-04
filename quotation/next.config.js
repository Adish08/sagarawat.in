/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure client-side routing works with static exports
  trailingSlash: true,
  // Optional: Add basePath if your site is hosted in a subdirectory
  // basePath: '/quotation',
}

module.exports = nextConfig
