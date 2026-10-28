"use client";

import Link from 'next/link';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // System-aware background with a global smooth color transition
    <div className="flex min-h-screen bg-[var(--color-background)] text-foreground transition-colors duration-300">
      
      {/* 🟦 Left Side: ShifaCare Medical Branding Section (Fixed & Responsive) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-primary)]/10 to-[var(--color-background)] dark:from-[var(--color-primary)]/10 dark:via-zinc-950 dark:to-[var(--color-background)] relative overflow-hidden border-r border-slate-200/80 dark:border-zinc-800 transition-colors duration-300">
        
        {/* Top Logo - Linked to Home Page */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white inline-block hover:opacity-90 transition-opacity w-fit cursor-pointer">
          Shifa<span className="text-[var(--color-primary)]">Care</span>
        </Link>

        {/* Middle Content (Healthcare Specific Workspace Typography) */}
        <div className="max-w-xl space-y-6 my-auto relative z-10">
          <div className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase">
            Your Medical Workspace
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
            Simplify patient care and case management.
          </h1>
          <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
            Join thousands of healthcare professionals managing medical data securely,
            collaborating on complex cases, and driving better patient outcomes with ShifaCare.
          </p>
        </div>

        {/* Bottom Footer Section */}
        <div className="text-xs text-slate-400 dark:text-zinc-500 font-semibold">
          &copy; {new Date().getFullYear()} ShifaCare. All rights reserved.
        </div>

        {/* Background Decorative Glow Blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
      </div>

      {/* ⬜ Right Side: Dynamic Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-none transition-all duration-300">
          {children}
        </div>
      </div>
      
    </div>
  );
}