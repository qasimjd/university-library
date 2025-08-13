import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname:"m.media-amazon.com" ,
      }
    ],
    // Enable image caching for better performance
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  // Optimize Webpack configuration
  webpack: (config) => {
    // Optimize module resolution
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    }
    return config;
  },
  // Enable production Source Maps for better debugging with good performance
  productionBrowserSourceMaps: false,
  // Improve performance by compressing assets
  compress: true,
  // Speed up static generation by reusing previous build's pages
  experimental: {
    optimizeCss: true,
  },
  // Cache aggressively for better performance
  headers: async () => {
    return [
      {
        source: '/icons/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          }
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          }
        ],
      }
    ]
  }
};

export default nextConfig;
