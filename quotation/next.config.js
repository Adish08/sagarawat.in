/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static exports
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Set basePath to match your Netlify site's subdirectory
  basePath: process.env.NODE_ENV === 'production' ? '/quotation' : '',

  // Generate a unique build ID for cache busting
  generateBuildId: async () => 'build-' + Date.now(),
  
  // Disable all rewrites for static export
  rewrites: undefined,
  
  // Ensure proper static export behavior
  distDir: 'out',
  
  // Enable static HTML export
  exportPathMap: async function() {
    return {
      '/': { page: '/' },
      '/quotation': { page: '/quotation' },
      '/404': { page: '/404' },
    };
  },
}

module.exports = nextConfig
