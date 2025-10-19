import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? '/new-portfolio' : undefined,
  assetPrefix: isProd ? '/new-portfolio/' : undefined,
};

export default nextConfig;
