'use client';

import React from 'react';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { LuStethoscope } from 'react-icons/lu';
import { FiHeart } from 'react-icons/fi';

interface RequirementItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function PartnerReadiness() {
  const requirements: RequirementItem[] = [
    {
      id: 1,
      title: "Support for work sponsorship",
      description: "Clinics should be ready to support the work permit process so an incoming GP has a clear path to practise in Canada.",
      icon: <HiOutlineBadgeCheck size={22} />,
      iconBg: "bg-[#4285f4]/10 dark:bg-[#4285f4]/20",
      iconColor: "text-[#4285f4]"
    },
    {
      id: 2,
      title: "Supervision from within the clinic",
      description: "Where needed, we look for clinics that can provide supervision from an existing family doctor to support a smooth transition into practice.",
      icon: <LuStethoscope size={20} />,
      iconBg: "bg-[#00c9a7]/10 dark:bg-[#00c9a7]/20",
      iconColor: "text-[#00c9a7]"
    },
    {
      id: 3,
      title: "A welcoming clinic environment",
      description: "Relocation is a major step. The clinics we work best with are those that genuinely want to help a new GP settle in, professionally and personally.",
      icon: <FiHeart size={18} />,
      iconBg: "bg-[#ff7d43]/10 dark:bg-[#ff7d43]/20",
      iconColor: "text-[#ff7d43]"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background Subtle Dot Matrix Grid (স্ক্রিনশটের ব্যাকগ্রাউন্ড ডট ইফেক্ট) */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Circular Image Wrap with Smooth Drop Shadows */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] rounded-full overflow-hidden border-4 border-white dark:border-card shadow-[0_20px_50px_rgba(18,40,60,0.15)] transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="https://plus.unsplash.com/premium_photo-1661580574627-9211124e5c3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Doctor consulting partner clinic"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Side: Content & Vertical Timeline Stepper Loop */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            
            {/* Header Block */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 block">
                PARTNER READINESS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#12283c] dark:text-foreground leading-[1.15]">
                What we look for <br />
                in <span className="text-[#0070f3] dark:text-primary">partner clinics</span>
              </h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-muted-foreground font-medium pt-1">
                Successful placements start with the right clinic support.
              </p>
            </div>

            {/* Core Stepper Requirements Wrap */}
            <div className="relative pl-2 space-y-8 before:absolute before:left-[23px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-[1px] before:border-l-2 before:border-dashed before:border-slate-200 dark:before:border-slate-800">
              {requirements.map((item) => (
                <div key={item.id} className="relative flex items-start gap-4 sm:gap-6 group">
                  
                  {/* Dynamic Floating Vector Circle Node */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 shadow-sm relative z-10 transition-transform duration-300 group-hover:scale-110`}>
                    {item.icon}
                  </div>

                  {/* Text Container Stack */}
                  <div className="space-y-1 pt-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#12283c] dark:text-foreground tracking-tight transition-colors duration-200 group-hover:text-[#0070f3] dark:group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-muted-foreground leading-relaxed max-w-xl font-medium">
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}