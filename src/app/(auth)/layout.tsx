"use client";
import Link from 'next/link';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Light mode uses bg-slate-50, dark mode smoothly transitions to global background variable
    <div className="flex min-h-screen bg-slate-50 dark:bg-background text-foreground transition-colors duration-300">
      
      {/* 🟦 Left Side: ShifaCare Medical Branding Section (Fixed & Responsive) */}
      {/* Keeps original light mode gradients intact, handles dark mode via dark: variants */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 bg-gradient-to-br from-teal-50/60 via-emerald-50/40 to-slate-50 dark:from-[#0d2229] dark:via-[#07161b] dark:to-background relative overflow-hidden border-r border-slate-100 dark:border-border transition-colors duration-300">
        
        {/* Top Logo - Linked to Home Page */}
        <Link href="/" className="text-2xl font-black tracking-tight text-teal-700 dark:text-primary inline-block hover:opacity-90 transition-opacity w-fit cursor-pointer">
          Shifa<span className="text-slate-800 dark:text-foreground">Care</span>
        </Link>

        {/* Middle Content (Healthcare Specific Workspace Typography) */}
        <div className="max-w-xl space-y-6 my-auto relative z-10">
          <div className="text-xs font-bold tracking-widest text-teal-600 dark:text-primary uppercase">
            Your Medical Workspace
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-foreground leading-[1.15] tracking-tight">
            Simplify patient care and case management.
          </h1>
          <p className="text-base text-slate-600 dark:text-muted-foreground leading-relaxed">
            Join thousands of healthcare professionals managing medical data securely,
            collaborating on complex cases, and driving better patient outcomes with ShifaCare.
          </p>
        </div>

        {/* Bottom Footer Section */}
        <div className="text-xs text-slate-400 dark:text-muted-foreground/50 font-medium">
          &copy; {new Date().getFullYear()} ShifaCare. All rights reserved.
        </div>

        {/* Background Decorative Glow Blobs (Gives neon medical accents in dark mode) */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-teal-100/30 dark:bg-primary/5 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 bg-emerald-100/30 dark:bg-primary/5 rounded-full blur-3xl transition-colors duration-300" />
      </div>

      {/* ⬜ Right Side: Dynamic Form Container (Renders Login, Register or Reset Password forms) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        {/* Retains native white shading for light mode, morphs cleanly into card background on dark mode */}
        <div className="w-full max-w-md bg-white dark:bg-card border border-slate-100 dark:border-border p-8 sm:p-10 !rounded-3xl shadow-xl shadow-slate-100/50 dark:shadow-black/40 transition-all duration-300">
          {children}
        </div>
      </div>
      
    </div>
  );
}