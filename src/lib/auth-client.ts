import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "./auth" 

// 🚀 ফিক্স: উইন্ডো অবজেক্ট চেক করে ডাইনামিকালি কারেন্ট ইউআরএল নেওয়া হচ্ছে
// এটি লোকালহোস্টে থাকলে localhost নেবে, ভার্সেলে গেলে অটোমেটিক লাইভ ডোমেইন নিয়ে নেবে!
const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return window.location.origin; // ব্রাউজারের লাইভ ডোমেইন
    }
    return process.env.BETTER_AUTH_URL || "http://localhost:3000"; // সার্ভার সাইড ব্যাকআপ
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl(), 
    
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
})