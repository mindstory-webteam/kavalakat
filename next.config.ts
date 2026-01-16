import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Remove 'output: export' to enable full Next.js features
  // Remove 'distDir: out' to use default .next directory
  
  images: {
    // Enable image optimization
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
};

export default config;