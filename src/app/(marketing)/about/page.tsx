'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Award, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutStats() {
  const coreValues = [
    {
      icon: <HeartPulse className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Patient-First Approach",
      description: "Every clinical scheduling algorithm and care workflow is built around emergency responsiveness and absolute patient comfort."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Verified Clinical Excellence",
      description: "We enforce strict database tracking and license verification so every specialist and diagnostic metric is 100% trustworthy."
    },
    {
      icon: <Award className="w-6 h-6 text-[var(--color-primary)]" />,
      title: "Seamless Digital Continuity",
      description: "Access verified digital prescriptions, lab diagnostic trends, and secure tele-health records anytime across any device."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] transition-colors duration-300">
      
      {/* ================= SECTION 1: HERO INTRO ================= */}
      <section className="py-16 md:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Revolutionizing Healthcare Access in Bangladesh
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                ShifaCare is a next-generation healthcare ecosystem built to bridge the gap between patients, elite doctors, and top-tier clinical infrastructures. We eliminate administrative friction, introducing transparent workflows that optimize medical capacity and elevate local community wellness.
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/doctors"
                  className="px-6 py-3.5 bg-[var(--color-primary)] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm hover:opacity-95 transition-all inline-flex items-center gap-2"
                >
                  <span>Explore Specialists</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 h-[350px] sm:h-[420px]">
                <img
                  src="https://res.cloudinary.com/dzoigbkep/image/upload/v1793111905/ujzp0fxfxdiuehtvt18n.png" 
                  alt="ShifaCare Healthcare Consultation"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 2: MISSION & VISION ================= */}
      <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Driven by Mission, Guided by Vision
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Setting new benchmarks for patient-centric care and digital medical infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Core Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To institutionalize patient-centric pipelines by enabling seamless doctor discoverability, secure clinical coordination, and friction-free treatment tracking across healthcare networks.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Future Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To become the absolute digital operating layer for medical setups in the region, ensuring every family has real-time accreditation checks and high-quality care channels at their fingertips.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: CORE VALUES ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Built on Trust & Transparency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 hover:border-slate-300 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}