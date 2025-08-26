/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },

  // Redirects for SEO
  redirects: async () => [
    {
      source: '/resume',
      destination: '/',
      permanent: true,
    },
  ],
};

export default nextConfig;