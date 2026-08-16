"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const sliderData = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&auto=format&fit=crop&q=80",
    tagline: "Now Registering is Even Easier",
    heading: "Welcome to ShifaCare Regional Hospital",
    subheading: "Your Health Is Our Happiness"
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1920&auto=format&fit=crop&q=80",
    tagline: "Emergency Services Just a Click Away",
    heading: "Advanced ICUs & Specialized Medical Care",
    subheading: "We are ready to help at your emergency 24/7"
  },
  {
    id: 3,
    bgImage: "https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tagline: "Top Tier Medical Practitioners",
    heading: "Expert Medical Consultation From Anywhere",
    subheading: "Connecting you with verified doctors instantly"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[200px] sm:h-[400px] md:h-[75vh] max-h-[800px] flex items-center overflow-hidden bg-slate-950">
      
      {/* ================= CAROUSEL BACKGROUND IMAGES ================= */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0.6, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${sliderData[current].bgImage}')` }}
          />
        </AnimatePresence>
      </div>

      {/* ================= GRADIENT OVERLAYS ================= */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 md:bg-gradient-to-r md:from-slate-950/95 md:via-slate-950/60 md:to-transparent" />

      {/* ================= HERO CONTENT ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-0">
        <div className="max-w-2xl lg:max-w-3xl text-left text-white space-y-2.5 sm:space-y-4">
          
          {/* Tagline */}
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block border border-teal-500/40 bg-teal-950/50 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs md:text-sm font-semibold text-teal-300 rounded-md tracking-wider uppercase"
          >
            {sliderData[current].tagline}
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`head-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.25] text-white"
          >
            {sliderData[current].heading}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 font-medium text-[11px] sm:text-xs md:text-base lg:text-lg tracking-wide uppercase text-emerald-400 dark:text-emerald-300"
          >
            {sliderData[current].subheading}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2 sm:pt-4"
          >
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <span>Register Online Now</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/doctors"
              className="inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800/90 text-white border border-slate-700/80 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all hover:scale-[1.01] active:scale-95 cursor-pointer group"
            >
              <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Find Doctor</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ================= NAVIGATION ARROWS ================= */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 border border-white/10 text-white transition-all cursor-pointer group hidden sm:block backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 border border-white/10 text-white transition-all cursor-pointer group hidden sm:block backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* ================= DOT INDICATORS ================= */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
              current === index 
                ? "w-6 sm:w-8 bg-blue-500" 
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}