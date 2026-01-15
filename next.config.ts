import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cornflowerblue-eland-784005.hostingersite.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Add webpack configuration for chunk loading
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Help prevent chunk loading errors
      config.output = {
        ...config.output,
        chunkLoadingGlobal: 'webpackChunkload',
      };
    }
    
    return config;
  },

  // Optimize headers for better caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default config;