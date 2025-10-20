import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? '/portfolio' : undefined,
  assetPrefix: isProd ? '/portfolio/' : undefined,
  images: { unoptimized: true }
};

export default nextConfig;
