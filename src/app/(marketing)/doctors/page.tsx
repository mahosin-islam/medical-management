import React from "react";
import { Metadata } from "next";
import SearchFilterWidget from "./SearchFilterWidget";


export const metadata: Metadata = {
  title: "Find Best Doctors | Online Consultation",
  description: "Search and book appointments with verified orthopedic, cardiologists, and specialists in Dhaka.",
};

export default async function FindDoctorPage() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 min-h-screen space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Find Your Specialist</h1>
        <p className="text-xs text-zinc-500">আপনার প্রয়োজনীয় স্পেশালিটি বা ডক্টরের নাম লিখে সহজে অনুসন্ধান করুন।</p>
      </div>

      {/* 🚀 সার্ভার পেজের পেটের ভেতরে আমরা ক্লায়েন্ট উইজেটটি ঢুকিয়ে দিচ্ছি */}
      <SearchFilterWidget />
    </div>
  );
}