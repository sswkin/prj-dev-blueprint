import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["@tailwindcss/postcss"],
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
