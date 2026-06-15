
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
// 🌟 ২. আপনার মেইন auth.ts ফাইলের টাইপ ইম্পোর্ট করুন (পাথ ঠিক আছে কিনা দেখে নেবেন)
import type { auth } from "./auth" 

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    // 🌟 ৩. প্লাগইনটি এখানে যুক্ত করে দিন
    plugins: [
        inferAdditionalFields<typeof auth>()
    ]
})