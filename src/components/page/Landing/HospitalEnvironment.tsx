'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';
import { RiShieldCrossLine } from 'react-icons/ri';
import { MdOutlineCleanHands } from 'react-icons/md';
import { BiBuildingHouse } from 'react-icons/bi';
import Image from 'next/image';

interface FeaturePoint {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HospitalEnvironment() {
  const router = useRouter();

  const features: FeaturePoint[] = [
    {
      id: 1,
      icon: <BiBuildingHouse size={22} />,
      title: "State-of-the-Art Infrastructure",
      description: "Modern, spacious clinical layouts designed to reduce stress and maximize patient comfort and accessibility."
    },
    {
      id: 2,
      icon: <RiShieldCrossLine size={22} />,
      title: "Advanced Safety Protocol",
      description: "Equipped with world-class medical safety grids and reliable emergency responsiveness systems."
    },
    {
      id: 3,
      icon: <MdOutlineCleanHands size={24} />,
      title: "Eco-Friendly & Sterile Spaces",
      description: "Strict automated sanitation cycles that guarantee completely sterile and welcoming environments."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Structural Decorative Shapes for Premium Look */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Premium Interactive Imagery Area */}
          <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
            <div className="relative group rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-muted/10 border border-slate-100 dark:border-border/30 shadow-[0_20px_50px_rgba(18,40,60,0.12)]">

              {/* Main Medical/Hospital High-End Environment Image */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
  <Image
    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Modern Hospital Clinic Environment"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
    priority
  />
</div>

              {/* Float Badge Tag Over Image Frame */}
              <div className="absolute top-4 left-4 bg-[#12283c]/90 dark:bg-[#111c24]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 shadow-lg flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00c9a7] animate-ping" />
                <span className="text-xs font-bold text-white tracking-wide">Premium Standards Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Typography & Core Feature Nodes */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">

            {/* Header Module */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-primary block">
                CLINICAL ENVIRONMENT
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#12283c] dark:text-foreground leading-[1.15]">
                A healing space <br />
                built around <span className="text-[#0070f3] dark:text-primary">your care</span>.
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-muted-foreground font-medium max-w-xl leading-relaxed">
                We bridge international specialists with partner clinics that possess cutting-edge infrastructure, pristine wellness parameters, and certified sanctuary standards.
              </p>
            </div>

            {/* Feature Matrix Layout Block */}
            <div className="space-y-6">
              {features.map((feat) => (
                <div key={feat.id} className="flex items-start gap-4 group">

                  {/* Icon Badge Holder */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-50 dark:bg-card text-[#12283c] dark:text-primary flex items-center justify-center shrink-0 border border-slate-100 dark:border-border/60 shadow-sm transition-all duration-300 group-hover:bg-[#0070f3] group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-primary-foreground group-hover:scale-105">
                    {feat.icon}
                  </div>

                  {/* Context Strings */}
                  <div className="space-y-0.5 pt-1">
                    <h3 className="text-base sm:text-size font-bold text-[#12283c] dark:text-foreground tracking-tight transition-colors duration-200 group-hover:text-[#0070f3] dark:group-hover:text-primary">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground leading-relaxed max-w-lg font-medium">
                      {feat.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* Lower Engagement Action Trigger */}
            <div className="pt-2">
              <button
                onClick={() => router.push('/login')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 hover:bg-[#12283c] dark:bg-card dark:hover:bg-muted/80 text-white dark:text-foreground text-xs sm:text-sm font-bold rounded-xl border border-transparent dark:border-border/60 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5 group"
              >
                <span>Explore Partner Facilities</span>
                <FiArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform text-[#00c9a7]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}