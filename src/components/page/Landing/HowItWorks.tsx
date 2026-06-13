// app/components/how-it-works/HowItWorks.tsx
"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  Search, 
  CalendarCheck, 
  Video, 
  Heart,
  ArrowRight,
  Clock
} from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Find Doctor",
    titleBn: "ডাক্তার খুঁজুন",
    description: "Search verified specialists by expertise, live slot sheets, or region.",
    icon: Search,
    color: "text-blue-500 border-blue-500/20",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    duration: "2 min"
  },
  {
    id: 2,
    title: "Book Appointment",
    titleBn: "এপয়েন্টমেন্ট বুক করুন",
    description: "Select your preferred active time slot and confirm booking instantly.",
    icon: CalendarCheck,
    color: "text-emerald-500 border-emerald-500/20",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    duration: "60 sec"
  },
  {
    id: 3,
    title: "Get Consultation",
    titleBn: "পরামর্শ নিন",
    description: "Connect via embedded high-quality live video call or visit chamber.",
    icon: Video,
    color: "text-purple-500 border-purple-500/20",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    duration: "15-30 min"
  },
  {
    id: 4,
    title: "Get Better",
    titleBn: "সুস্থ হয়ে উঠুন",
    description: "Access secure digital prescriptions and structured lifetime follow-up care.",
    icon: Heart,
    color: "text-rose-500 border-rose-500/20",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    duration: "Continuous"
  }
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Dynamic Grid Background Blur Sparks */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            How It{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Get comprehensive, premium healthcare orchestration in 4 seamless and completely digitalized steps.
          </p>
        </div>

        {/* ================= TIMELINE STEPS CONFIG ================= */}
        <div className="relative">
          
          {/* Desktop connecting line tracking layout */}
          <div className="hidden lg:block absolute top-[38%] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-border via-primary/30 to-border pointer-events-none" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{ 
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: idx * 0.12, duration: 0.4, ease: "easeOut" }
                    } 
                  }}
                  className="relative group"
                >
                  <div className="bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 hover:border-primary/20 hover:shadow-md flex flex-col items-center h-full">
                    
                    {/* Top Order Step Counter */}
                    <span className="text-[10px] font-black tracking-widest text-primary/40 uppercase mb-4 block">
                      Step 0{step.id}
                    </span>

                    {/* Centered Large Icon Frame */}
                    <div className={`${step.bgColor} ${step.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    {/* Content Core details */}
                    <div className="flex-1 flex flex-col justify-between w-full">
                      <div className="mb-4">
                        <h3 className="font-bold text-foreground text-base tracking-tight mb-0.5">
                          {step.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground/60 font-medium mb-2.5">
                          {step.titleBn}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed px-2">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Interactive Time Complexity Badge */}
                      <div className="inline-flex items-center justify-center gap-1.5 text-[10px] font-bold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-lg w-fit mx-auto border border-border/40">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{step.duration}</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================= BOTTOM REGISTRATION CTA ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { delay: 0.5 } } }}
          className="text-center mt-12"
        >
          <Link
            // 'singup' typo fixed internally based on standard root configuration
            href="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:gap-3 transition-all hover:bg-primary/90 hover:shadow-md cursor-pointer"
          >
            Start Your Journey
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}