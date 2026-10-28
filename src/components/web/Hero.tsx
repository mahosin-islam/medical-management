"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const sliderData = [
  {
    id: 1,
    bgImage: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793018584/ze3vssues3nvxqbdylhe.png",
    heading: "Consult With Experienced Doctors In-Person Or From Your Home",
    subheading: "Our doctors spend time to get to know you and your health with personalized care you can rely on.",
    btnText: "Book Appointment",
    btnLink: "/login"
  },
  {
    id: 2,
    bgImage: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793018739/ktmwj7nv7dulcueo6shu.png",
    heading: "Hassle-Free Lab Tests With Home Sample Collection",
    subheading: "Quality diagnostic services delivered right to your doorstep, hassle-free and accurate.",
    btnText: "Book a Test",
    btnLink: "/login"
  },
  {
    id: 3,
    bgImage: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793018819/yq0zcfo0k3pukmsaruoq.png",
    heading: "24/7 Emergency Care & Advanced Medical Support",
    subheading: "Dedicated healthcare team always ready to serve you during your medical emergencies.",
    btnText: "Emergency Services",
    btnLink: "/doctors"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1
    }),
    center: {
      x: "0%",
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 1
    })
  };

  return (
    <section className="relative w-full h-[360px] sm:h-[450px] md:h-[480px] overflow-hidden bg-slate-100 mt-[-5px]">
      
      {/* ================= SLIDER CONTAINER ================= */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center flex items-center justify-center text-center"
          style={{ backgroundImage: `url('${sliderData[current].bgImage}')` }}
        >
          {/* Subtle Light Overlay for Readable Text */}
          <div className="absolute inset-0 bg-black/30" />

          {/* ================= CENTER CONTENT ================= */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-white space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">
              {sliderData[current].heading}
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto text-white/90 font-normal leading-relaxed">
              {sliderData[current].subheading}
            </p>

            <div className="pt-2">
              <Link
                href={sliderData[current].btnLink}
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:opacity-90 text-white px-6 py-2.5 sm:py-3 rounded-md font-medium text-xs sm:text-sm transition-all shadow-md active:scale-95"
              >
                <span>{sliderData[current].btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ================= NAVIGATION ARROWS ================= */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:left-auto sm:right-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ================= BOTTOM LINE INDICATORS ================= */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {sliderData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
              current === idx ? "w-6 bg-white" : "w-3 bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}