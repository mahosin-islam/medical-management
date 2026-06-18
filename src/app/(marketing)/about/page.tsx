'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck,  Target, Eye } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-background transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative background glows for premium feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-teal-500/5 dark:bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-primary/5 rounded-full blur-3xl" />

      </div>

      <h1>This is Mahosin</h1>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Title and Main Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-24">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-primary">
              <ShieldCheck className="w-4 h-4" />
              <span>Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Revolutionizing <span className="text-teal-600 dark:text-primary">Healthcare</span> Access In Bangladesh
            </h2>
          </div>
          
          <div className="lg:col-span-7 lg:pt-6">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
              ShifaCare is a next-generation healthcare ecosystem built to bridge the gap between patients, elite doctors, and top-tier clinical infrastructures. We eliminate administrative friction, introducing transparent workflows that optimize medical capacity and elevate local community wellness.
            </p>
          </div>
        </div>

        {/* Middle Grid: Premium Image Presentation & Core Statements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
  <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-5 relative"
    >
      <div className="absolute inset-0 bg-linear-to-tr from-teal-500/10 to-transparent rounded-3xl blur-xl pointer-events-none" />
      
      <div className="aspect-4/5 rounded-3xl overflow-hidden border border-border bg-muted/20 shadow-lg relative"> 
        {/* লিনাক্স/নেক্সট জেএস-এ fill ব্যবহার করলে প্যারেন্ট ডিভে 'relative' ক্লাস থাকা বাধ্যতামূলক */}
        
        <Image 
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80" 
          alt="Modern healthcare facility environment"
          fill // এর মানে ইমেজটি পুরো ডিভ জুড়ে থাকবে
          sizes="(max-width: 1024px) 100vw, 40vw" // রেস্পন্সিভ পারফরম্যান্স আরও ভালো করার জন্য
          priority // ফাস্ট লোডের জন্য (LCP ফিক্স করার বেস্ট ওয়ে)
          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-102"
        />

      </div>
    </motion.div>

          {/* Mission & Vision Framework Blocks */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Our Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sc-card bg-card/60 border border-border/80 p-6 flex flex-col sm:flex-row gap-5 items-start"
            >
              <div className="p-3 rounded-2xl bg-teal-500/10 dark:bg-primary/10 text-teal-600 dark:text-primary shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-foreground">Our Mission</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  To institutionalize patient-centric pipelines by enabling seamless doctor discoverability, secure clinical coordination, and friction-free treatment tracking across healthcare networks.
                </p>
              </div>
            </motion.div>

            {/* Our Vision */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="sc-card bg-card/60 border border-border/80 p-6 flex flex-col sm:flex-row gap-5 items-start"
            >
              <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-primary/10 text-emerald-600 dark:text-primary shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-foreground">Our Vision</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  To become the absolute digital operating layer for medical setups in the region, ensuring every family has real-time accreditation checks and high-quality care channels at their fingertips.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Panel: The Driving Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-border/60">
          {[
            {
              title: "Patient-First Priority",
              desc: "Every clinical scheduling algorithm and routing system is tailored explicitly around patient emergency dynamics and privacy parameters."
            },
            {
              title: "Verified Accreditation",
              desc: "We enforce absolute database tracking loops so that every medical license, clinic bed capacity, and specialization metric is 100% trustworthy."
            },
            {
              title: "Fluid Continuity",
              desc: "We ensure diagnostic reports, consultation channels, and ongoing prescriptions remain in a synchronized loop for effortless tracking."
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-2 p-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-primary" />
                <h4 className="text-sm font-black text-foreground uppercase tracking-wider">{value.title}</h4>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-3.5">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}






