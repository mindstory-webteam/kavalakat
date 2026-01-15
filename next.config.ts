import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  output: 'export',  // CRITICAL: Change to export mode
  distDir: 'out',    // Export to 'out' directory
  trailingSlash: true, // Helps with routing on static hosts
  
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
};

export default config;