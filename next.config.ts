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
 typescript: {
    ignoreBuildErrors: false, 
  },
  // এখানে টাইপস্ক্রিপ্টের এরর এড়াতে আমরা টাইপটিকে স্যাটিসফাই (satisfies) করে দিতে পারি
  eslint: {
    ignoreDuringBuilds: false,
  },
} as any; // অথবা সরাসরি NextConfig-এর কড়া টাইপ চেক সাময়িকভাবে শিথিল করতে পারেন

export default nextConfig;