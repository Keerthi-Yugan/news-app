import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/news",
        permanent: false,
      },
    ];
  },
  devIndicators: false,
}; 

export default nextConfig;
