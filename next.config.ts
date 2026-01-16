import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'out',
  trailingSlash: true,  // Important for static hosting
  
  images: {
    unoptimized: true,
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