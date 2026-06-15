import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ১. Better-Auth-এর সেশন চেক করার জন্য তার নিজস্ব API-তে ব্যাকগ্রাউন্ড হিট করা
  // (এটি Better-Auth-এর অফিশিয়াল এবং সবচেয়ে সেফ সার্ভার-সাইড মেকানিজম)
  const authResponse = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = await authResponse.json();

  // ২. ইউজার যদি লগইন করা না থাকে (সেশন না থাকে)
  if (!session || !session.user) {
    // সে যদি সিক্রেট রুটগুলোতে (admin, doctor, patient) ঢোকার চেষ্টা করে
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/doctor") ||
      pathname.startsWith("/patient")
    ) {
      // তাকে সরাসরি লগইন পেজে রিডাইরেক্ট করে পাঠিয়ে দাও
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // ৩. ইউজার যদি অলরেডি লগইন করা থাকে, কিন্তু তার রোল অনুযায়ী ভুল রুটে যায় (Extra Security 🚀)
  if (session?.user) {
    const userRole = session.user.role; // "admin", "doctor", "patient"

    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", request.url)); // অ্যাডমিন না হলে হোমপেজে পাঠান
    }
    if (pathname.startsWith("/doctor") && userRole !== "doctor") {
      return NextResponse.redirect(new URL("/", request.url)); // ডাক্তার না হলে হোমপেজে পাঠান
    }
    if (pathname.startsWith("/patient") && userRole !== "patient") {
      return NextResponse.redirect(new URL("/", request.url)); // পেশেন্ট না হলে হোমপেজে পাঠান
    }
  }

  return NextResponse.next();
}

// কোন কোন রুটগুলো এই সিকিউরিটি গার্ড (Middleware) স্ক্যান করবে
export const config = {
  matcher: [
    "/admin/:path*",
    "/doctor/:path*",
    "/patient/:path*",
  ],
};