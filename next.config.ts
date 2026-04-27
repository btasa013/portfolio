import type { NextConfig } from "next";
import packageJson from '@/../package.json';

const isProd = process.env.NODE_ENV === 'production';

const path = isProd ? `/${packageJson.name}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath: path,
  assetPrefix: path,
  trailingSlash: true,
  images: { unoptimized: true }
};

export default nextConfig;
