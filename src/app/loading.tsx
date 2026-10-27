'use client';

import React from 'react';

export default function Loading() {
  return (
    // System-aware background with a global smooth color transition matching ShifaCare theme
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Loading content wrapper */}
      <div className="flex flex-col items-center space-y-4 relative z-10">
        
        {/* Modern Medical Pulse/Spinner Animation */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer rotating/pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)]/15 border-t-[var(--color-primary)] animate-spin" />
          
          {/* Inner core pulsing medical accent */}
          <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] opacity-75 animate-ping" />
        </div>

        {/* Branding Typography & Animated Progress Hints */}
        <div className="text-center space-y-1 pt-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Shifa<span className="text-[var(--color-primary)]">Care</span>
          </h3>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase animate-pulse">
            Loading...
          </p>
        </div>

      </div>
    </div>
  );
}