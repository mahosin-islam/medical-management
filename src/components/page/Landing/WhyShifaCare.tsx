'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export default function WhyShifaCare() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] overflow-hidden transition-colors duration-300 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-4"
          >
            <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-primary)]">
              WHY SHIFACARE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Doctors Who Listen & Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Our specialists devote ample time to understand your health history thoroughly. We prioritize empathy, transparent communication, and evidence-based guidance to ensure you feel supported at every step of your diagnosis.
            </p>

          </motion.div>

          {/* Right Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100 group">
              <img
                src="https://res.cloudinary.com/dzoigbkep/image/upload/v1793092470/b3hy9nq2hidpgolkdx4m.png" // এখানে ১ নং ইমেজের URL বসাবে
                alt="Doctors Who Listen"
                className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>


      </div>
    </section>
  );
}