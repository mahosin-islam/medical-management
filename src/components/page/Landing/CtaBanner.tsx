'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

export default function CtaBanner() {
  const router = useRouter();

  return (
    <section className="py-12 md:py-16 bg-[var(--color-primary)] transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Box Container with Framer Motion Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 md:p-14 text-center overflow-hidden"
        >
          
          {/* Subtle Glow Overlays */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/10 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Content Wrapper Stack */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-5 md:space-y-6">
            
        

            {/* Core Header Typography */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Empowering healthcare. <br />
              Connecting clinics & expert specialists.
            </h2>

            {/* Explanatory Support Text */}
            <p className="text-xs sm:text-sm text-white/80 font-normal max-w-lg mx-auto leading-relaxed">
              Join ShifaCare today to streamline your clinical operations, integrate top-tier medical experts, or book your next specialized consultation effortlessly.
            </p>

            {/* Strategic Dual-Action Trigger Group Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              
              {/* Primary Action Call: Contrast White Button */}
              <button
                onClick={() => router.push('/login')}
                className="w-full sm:w-auto px-6 py-3 bg-white text-[var(--color-primary)] hover:bg-slate-100 text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 group transition-all cursor-pointer"
              >
                <span>Get Started Now</span>
                <FiArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Action Call: Glassmorphism Style */}
              <button
                onClick={() => router.push('/doctors')}
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FiCalendar size={14} className="text-white" />
                <span>Book Consultation</span>
              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}