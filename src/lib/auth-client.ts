import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth"; 

// 🎯 ক্লায়েন্ট সাইডে অরিজিন অটোমেটিক ডিটেক্ট করার সেরা উপায়
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin; // ব্রাউজারে সাইটের বর্তমান URL অটোমেটিক নিয়ে নেবে
  }
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    inferAdditionalFields<typeof auth>()
  ]
});