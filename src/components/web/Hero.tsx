"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const sliderData = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&auto=format&fit=crop&q=80", // Clear Hospital Corridor Image
    tagline: "Now Registering is Even Easier",
    heading: "Welcome to ShifaCare Regional Hospital",
    subheading: "Your Health Is Our Happiness"
  },
  {
    id: 2,
    bgImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1920&auto=format&fit=crop&q=80", // Clear Doctors Consulting Image
    tagline: "Emergency Services Just a Click Away",
    heading: "Advanced ICUs & Specialized Medical Care",
    subheading: "We are ready to help at your emergency 24/7"
  },
  {
    id: 3,
    bgImage: "https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Clear Lab/Surgical Setup Image
    tagline: "Top Tier Medical Practitioners",
    heading: "Expert Medical Consultation From Anywhere",
    subheading: "Connecting you with verified doctors instantly"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  // অটো-প্লে লুপ টাইমার (৫ সেকেন্ড)
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] flex items-center overflow-hidden bg-slate-950 pt-25 -mt-25">
      
      {/* ================= CAROUSEL BACKGROUND IMAGES (CLEAR VIEW) ================= */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${sliderData[current].bgImage}')` }}
          />
        </AnimatePresence>
      </div>

   
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent w-full md:w-[75%]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent hidden md:block" />

      {/* ================= INTERACTIVE HERO CONTENT (LEFT SIDE) ================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left text-white">
          
          {/* Border Tagline (Exact UI Match) */}
          <motion.div
            key={`tag-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-white/40 bg-slate-900/20 backdrop-blur-sm px-3.5 py-1 text-xs md:text-sm font-medium mb-5 tracking-wide rounded-[4px]"
          >
            {sliderData[current].tagline}
          </motion.div>

          {/* Main Hospital Heading */}
          <motion.h1
            key={`head-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] mb-4"
          >
            {sliderData[current].heading}
          </motion.h1>

          {/* Subheading / Motto */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 font-medium text-xs sm:text-sm md:text-base mb-8 tracking-wide uppercase text-teal-400 dark:text-teal-300"
          >
            {sliderData[current].subheading}
          </motion.p>

          {/* ================= JUST 2 BOTTOM-LEFT BUTTONS ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-row items-center gap-4"
          >
            {/* Button 1: Register Online Now */}
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-3 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-blue-600/20 cursor-pointer"
            >
              <span>Register Online Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Button 2: Find Specialist Doctor */}
            <Link
              href="/doctors"
              className="inline-flex items-center justify-center gap-2 bg-slate-900/60 hover:bg-slate-900/80 text-white border border-white/20 backdrop-blur-md px-5 sm:px-6 py-3 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer group"
            >
              <CalendarDays className="w-4 h-4 text-teal-400" />
              <span>Doctor Find</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ================= SLIDER CAROUSEL NAVIGATION CONTROLS ================= */}
      {/* Left Arrow */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 z-30 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/70 border border-white/10 text-white transition-colors cursor-pointer group hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Right Arrow */}
      <button 
        onClick={nextSlide}
        className="absolute right-4 z-30 p-2 rounded-full bg-slate-900/40 hover:bg-slate-900/70 border border-white/10 text-white transition-colors cursor-pointer group hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* ================= DOT INDICATORS (BOTTOM CENTER) ================= */}
     

    </section>
  );
}