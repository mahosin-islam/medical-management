'use client';
import Link from 'next/link';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    // Dynamic background and text with smooth transition
    <div className="min-h-screen bg-slate-50 dark:bg-background flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative Blur Background Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-100/30 dark:bg-primary/5 rounded-full blur-3xl transition-colors duration-300" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-100/30 dark:bg-primary/5 rounded-full blur-3xl transition-colors duration-300" />

      {/* Main Container leveraging your custom sc-card structure */}
      <div className="w-full max-w-lg sc-card text-center p-8 sm:p-12 !rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 relative z-10 bg-white dark:bg-card">
        
        {/* Animated/Glowing Pulse Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-teal-50 dark:bg-primary/10 text-teal-600 dark:text-primary mb-6 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>

        {/* Error Typography */}
        <h1 className="text-7xl font-black tracking-tight text-teal-700 dark:text-primary mb-2">
          404
        </h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Case File Not Found
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">
          The medical record, patient file, or workspace page you are looking for doesnt exist, has been restricted, or was moved to another department.
        </p>

        {/* Dynamic Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          
          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto border border-border bg-card hover:bg-muted text-foreground px-5 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {/* Return Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </Link>
          
        </div>

      </div>
    </div>
  );
}