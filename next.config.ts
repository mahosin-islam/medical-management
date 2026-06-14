import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.bombayhosp.in",
      },
      {
        protocol: "https",
        hostname: "cureandcarehospital.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false, 
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
} satisfies NextConfig; // এখানে টাইপটি চেক করা হচ্ছে

export default nextConfig;