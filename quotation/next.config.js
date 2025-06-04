/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required for static exports in Next.js
  },
  // Add any other Next.js configuration options here
}

module.exports = nextConfig
