import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: false,
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react", "antd"],
  },
  allowedDevOrigins: ["192.168.1.*", "localhost", "127.0.0.1"],
};

export default nextConfig;
