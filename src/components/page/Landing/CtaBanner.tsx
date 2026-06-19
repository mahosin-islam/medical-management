'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

export default function CtaBanner() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card Box Container */}
        <div className="relative bg-[#12283c] dark:bg-[#111c24] rounded-[2rem] sm:rounded-[3rem] px-6 py-12 sm:p-16 md:p-20 text-center overflow-hidden border border-white/5 shadow-2xl">
          
          {/* Subtle Abstract Light Flare Overlay Effects */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0070f3]/10 dark:bg-[#0070f3]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#00c9a7]/10 dark:bg-[#00c9a7]/5 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Background Grid Pattern Vector */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Content Wrapper Stack */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-8">
            
            {/* Upper Badge Tag */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c9a7] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Ready to take the next step?
              </span>
            </div>

            {/* Core Header Vector Typography */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
              Empowering healthcare. <br />
              Connecting <span className="text-[#00c9a7]">clinics</span> & <span className="text-[#0070f3]">experts</span>.
            </h2>

            {/* Explanatory Paragraph Support Text */}
            <p className="text-sm sm:text-base text-slate-300/90 font-medium max-w-xl mx-auto leading-relaxed">
              Join Careviv today to streamline your clinical operations, integrate top-tier medical experts, or book your next specialized consultation effortlessly.
            </p>

            {/* Strategic Dual-Action Trigger Group Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              
              {/* Primary Action Call: Register / Get Started */}
              <button
                onClick={() => router.push('/login')}
                className="w-full sm:w-auto px-8 py-4 bg-[#0070f3] hover:bg-[#0062d1] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#0070f3]/20 flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Get Started Now</span>
                <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Action Call: Schedule/Book or Contact */}
              <button
                onClick={() => router.push('/doctors')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <FiCalendar size={16} className="text-[#00c9a7]" />
                <span>Book Consultation</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}