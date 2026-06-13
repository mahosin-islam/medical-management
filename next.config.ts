// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.bombayhosp.in",
      },
      {
        protocol: "https",
        hostname: "cureandcarehospital.com",
      },
      {
        protocol: "https",
        hostname: "pureortho.in",
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // 👈 এই নতুন ব্লকটি যোগ করুন
      },
    ],
  },
};

export default nextConfig;



