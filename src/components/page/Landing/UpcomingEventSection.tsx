"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

// স্ক্রিনশটের সাথে মিলিয়ে নিচ থেকে উপরে স্মুথ অ্যানিমেশনের জন্য
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function UpcomingEventSection() {
  return (
    <section className="py-6 md:py-14 bg-[var(--color-background)] dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* মেইন গ্রিড: বাম পাশে টেক্সট, ডান পাশে ইমেজ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 👈 বাম পাশ: স্ক্রিনশটের হুবহু টেক্সট ও লেআউট */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeInUp}
            className="lg:col-span-6 space-y-6"
          >
            {/* টাইটেল */}
            <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-zinc-100 tracking-tight leading-[1.2]">
              World Hepatitis Day Awareness Program
            </h2>

            {/* ডেট এবং লোকেশন পিন */}
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-zinc-300">
              <span>Jul 17, 2017</span>
              <span className="text-[var(--color-primary)]">
                <MapPin className="w-4 h-4 inline" />
              </span>
            </div>

            {/* ডেসক্রিপশন টেক্সট (স্ক্রিনশটের হুবহু লেখা) */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
              Hepatitis is one of the leading causes of death globally and accounts for 1.34 million deaths per year. Every year the World Hepatitis Day is observed on July 28. Chaired by the university’s Registrar Fakhruddin Ahmed, the welcome speech was given by the Chairman of the Pharmacy department, Dr. Md. Siddiqul Islam.
            </p>

            {/* See Details বাটন (স্ক্রিনশটের বর্ডার স্টাইল অনুযায়ী) */}
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-none border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-all cursor-pointer group"
              >
                <span>See Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>


          {/* 👉 ডান পাশ: মেডিকেল বিল্ডিং ইমেজ এবং ফ্রেম */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-none shadow-sm bg-slate-100 dark:bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1200&auto=format&fit=crop" 
                alt="World Hepatitis Day Awareness Program"
                className="w-full h-[380px] sm:h-[420px] object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}