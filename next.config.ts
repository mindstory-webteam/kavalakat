import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/kavalakat',
  assetPrefix: '/kavalakat/',
  images: {
    unoptimized: true,
  },
  // Disable trailing slashes for better compatibility
  trailingSlash: true,
};

export default nextConfig;