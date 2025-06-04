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
  
  // Disable server-side features for static export
  distDir: 'out',
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://your-netlify-site-url.netlify.app' 
      : 'http://localhost:3000',
  },
};

module.exports = nextConfig;
