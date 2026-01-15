import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',  // Changed from 'standalone' to 'export'
  
  images: {
    unoptimized: true,  // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cornflowerblue-eland-784005.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'lightsalmon-horse-915757.hostingersite.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Remove turbopack config for static export
  // turbopack: {},

  // Remove webpack config - not needed for static export
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.output = {
  //       ...config.output,
  //       chunkLoadingGlobal: 'webpackChunkload',
  //     };
  //   }
  //   return config;
  // },

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