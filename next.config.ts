import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.3twentycoin.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
