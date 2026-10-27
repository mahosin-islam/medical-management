"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const statsData = [
  { count: 32, suffix: "", label: "DEPARTMENTS" },
  { count: 100, suffix: "+", label: "DOCTORS" },
  { count: 1078, suffix: "K+", label: "PATIENTS SERVED" },
];

export default function AboutStats() {
  return (
    <section className="w-full bg-[var(--color-background)] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Side: About Intro */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-5 border-l-4 border-[var(--color-primary)] pl-5 sm:pl-6 space-y-3"
        >
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
            About <span className="text-slate-900 font-extrabold">ShifaCare</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            ShifaCare exists to provide a better patient experience. We are a one-stop-shop for your health, offering caring doctors, world-class diagnostics, in-house pharmacy, and much more.
          </p>
        </motion.div>

        {/* Right Side: Statistics Counters with Dynamic Animation */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-4 sm:gap-8 text-center lg:text-left">
          {statsData.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] tracking-tight">
                <Counter target={stat.count} suffix={stat.suffix} />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 tracking-wider mt-1.5">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Helper Component for Smooth Dynamic Number Counting Animation
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds animation duration
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  // Format special numbers like 1,078 or standard count
  const displayValue = target === 1078 && count === 1078 ? "1,078" : count.toLocaleString();

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}