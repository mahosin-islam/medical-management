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
  // Next.js 16-এ শুধুমাত্র typescript এরর ইগনোর করার অপশনটি ভ্যালিড আছে
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;