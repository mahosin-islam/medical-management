// app/components/hero/HeroSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Calendar, Shield, Stethoscope, 
  Video, Activity, ChevronLeft, ChevronRight,
  Sparkles, Heart, Star, Clock, Phone 
} from "lucide-react";
import Link from "next/link";

// Hero Slider Data
const heroSlides = [
  {
    id: 1,
    title: "ডিজিটাল স্বাস্থ্যসেবা",
    subtitle: "যেখানে আপনি আছেন, সেখানেই",
    description: "অনলাইন এপয়েন্টমেন্ট, টেলিমেডিসিন এবং প্রেসক্রিপশন - সবকিছু হাতের কাছে",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&h=1200&fit=crop",
    ctaText: "অ্যাপয়েন্টমেন্ট বুক করুন",
    ctaLink: "/appointment",
    gradient: "from-teal-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "বিশ্বস্ত ডাক্তার",
    subtitle: "দেশের সেরা বিশেষজ্ঞরা",
    description: "৫০০+ অভিজ্ঞ ডাক্তার, ২০+ বিশেষায়িত বিভাগ, ২৪/৭ সেবা",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1600&h=1200&fit=crop",
    ctaText: "ডাক্তার খুঁজুন",
    ctaLink: "/doctors",
    gradient: "from-blue-500/20 to-teal-500/20"
  },
  {
    id: 3,
    title: "টেলিমেডিসিন সার্ভিস",
    subtitle: "বাসায় বসেই চিকিৎসা",
    description: "ভিডিও কনসালটেশন, অনলাইন প্রেসক্রিপশন, হোম ডেলিভারি মেডিসিন",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&h=1200&fit=crop",
    ctaText: "টেলিমেডিসিন শুরু করুন",
    ctaLink: "/telemedicine",
    gradient: "from-purple-500/20 to-pink-500/20"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 pt-0">
      {/* Remove any default padding/margin */}
      <div className="absolute inset-0 m-0 p-0">
        {/* 3D Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 40, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 50, 0],
              y: [0, 80, -40, 0],
              scale: [1, 0.9, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"
          />
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 mx-auto h-full min-h-screen w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-full min-h-screen items-center gap-8 lg:gap-12">
          {/* Left Content - Text Section (60% width) */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex w-full flex-col justify-center lg:w-1/2 lg:py-8"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">
                ✨ AI Powered Healthcare Platform
              </span>
            </motion.div>

            {/* Animated Title */}
            <div className="mb-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                    <span className="relative inline-block">
                      {heroSlides[currentSlide].title}
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-teal-400"
                      />
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
                      {heroSlides[currentSlide].subtitle}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-base text-muted-foreground sm:text-lg lg:text-xl"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href={heroSlides[currentSlide].ctaLink}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:gap-3 hover:shadow-2xl sm:px-8 sm:py-3 sm:text-lg"
              >
                <span className="relative z-10">{heroSlides[currentSlide].ctaText}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/50 px-6 py-3 text-base font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-muted hover:shadow-xl sm:px-8 sm:py-3 sm:text-lg"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                ইমার্জেন্সি হেল্পলাইন
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-4 sm:pt-8"
            >
              {[
                { value: "৫০০+", label: "বিশিষ্ট ডাক্তার", icon: Stethoscope },
                { value: "৫০k+", label: "সেবাপ্রাপ্ত রোগী", icon: Heart },
                { value: "২৪/৭", label: "জরুরি সেবা", icon: Clock },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative rounded-xl bg-gradient-to-br from-card to-card/50 p-3 text-center transition-all hover:shadow-xl sm:p-4"
                >
                  <div className="mb-1 flex justify-center sm:mb-2">
                    <div className="rounded-full bg-primary/10 p-1.5 transition-colors group-hover:bg-primary/20 sm:p-2">
                      <stat.icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-foreground sm:text-2xl">{stat.value}</div>
                  <div className="text-[10px] text-muted-foreground sm:text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Large Image Slider (40% width but large image) */}
          <div className="hidden w-full lg:block lg:w-1/2">
            <div className="relative perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  className="relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Main Image - Large Size */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-teal-500/20 p-2 shadow-2xl">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <img
                        src={heroSlides[currentSlide].image}
                        alt="Healthcare"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-tr ${heroSlides[currentSlide].gradient} opacity-0 transition-opacity duration-500 hover:opacity-100`} />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -right-4 -top-8"
                  >
                    <div className="rounded-2xl bg-card p-3 shadow-xl backdrop-blur-sm sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="rounded-full bg-green-100 p-1.5 dark:bg-green-900/30 sm:p-2">
                          <Shield className="h-4 w-4 text-green-600 dark:text-green-400 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground sm:text-sm">১০০% সুরক্ষিত</p>
                          <p className="text-[10px] text-muted-foreground sm:text-xs">ডাটা এনক্রিপ্টেড</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-6 -left-4 sm:-bottom-8"
                  >
                    <div className="rounded-2xl bg-card p-3 shadow-xl backdrop-blur-sm sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/30 sm:p-2">
                          <Video className="h-4 w-4 text-blue-600 dark:text-blue-400 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground sm:text-sm">টেলিমেডিসিন</p>
                          <p className="text-[10px] text-muted-foreground sm:text-xs">ভিডিও কনসালটেশন</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating Badge */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute -bottom-4 right-4"
                  >
                    <div className="flex items-center gap-1 rounded-2xl bg-card/95 p-2 shadow-xl backdrop-blur-sm sm:gap-2 sm:p-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400 sm:h-4 sm:w-4" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-foreground sm:text-sm">৪.৯</span>
                      <span className="text-[10px] text-muted-foreground sm:text-xs">(৫k+ রিভিউ)</span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <button
                onClick={prevSlide}
                className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:shadow-xl sm:-left-4 sm:p-2"
              >
                <ChevronLeft className="h-5 w-5 text-foreground transition-transform hover:scale-110 sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-1.5 shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:shadow-xl sm:-right-4 sm:p-2"
              >
                <ChevronRight className="h-5 w-5 text-foreground transition-transform hover:scale-110 sm:h-6 sm:w-6" />
              </button>

              {/* Slider Dots */}
              <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAutoPlaying(true), 5000);
                    }}
                    className="group relative"
                  >
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                        currentSlide === index
                          ? "w-6 bg-primary sm:w-8"
                          : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50 sm:w-2"
                      }`}
                    />
                    {currentSlide === index && (
                      <motion.div
                        layoutId="active-dot"
                        className="absolute inset-0 h-1.5 rounded-full bg-primary sm:h-2"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">স্ক্রোল করুন</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-8 w-4 rounded-full border-2 border-muted-foreground/30"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mx-auto mt-1 h-1.5 w-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}