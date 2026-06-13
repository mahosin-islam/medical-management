'use client';
import React from 'react';

export default function Loading() {
  return (
    // System-aware background with a global smooth color transition
    <div className="min-h-screen bg-slate-50 dark:bg-background flex flex-col items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/20 dark:bg-primary/5 rounded-full blur-3xl transition-colors duration-300" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-100/20 dark:bg-primary/5 rounded-full blur-3xl transition-colors duration-300" />

      {/* Loading content wrapper */}
      <div className="flex flex-col items-center space-y-4 relative z-10">
        
        {/* Modern Medical Pulse/Spinner Animation */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer rotating/pulsing ring */}
          <div className="absolute inset-0 rounded-full border-4 border-teal-500/10 dark:border-primary/10 border-t-teal-600 dark:border-t-primary animate-spin" />
          
          {/* Inner core pulsing medical accent */}
          <div className="w-6 h-6 rounded-full bg-emerald-500 dark:bg-primary opacity-75 animate-ping" />
        </div>

        {/* Branding Typography & Animated Progress Hints */}
        <div className="text-center space-y-1.5 pt-2">
          <h3 className="text-xl font-black tracking-tight text-teal-700 dark:text-primary">
            Shifa<span className="text-slate-800 dark:text-foreground">Care</span>
          </h3>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground/80 uppercase animate-pulse">
            Loading Workspace...
          </p>
        </div>

      </div>
    </div>
  );
}