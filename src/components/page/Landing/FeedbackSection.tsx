"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star, MessageSquarePlus, Quote } from "lucide-react";

const feedbackData = [
  {
    id: 1,
    name: "Zayan Ahmed",
    type: "Verified Patient",
    feedback: "The response time on ShifaCare is unmatched. Within 5 minutes, I got my serial confirmation for the doctor. The UI is clean and extremely easy to navigate.",
    rating: 5,
    initials: "ZA"
  },
  {
    id: 2,
    name: "Farhana Yasmin",
    type: "Premium Member",
    
    feedback: "I was skeptical about video consultations at first, but the live streaming quality and secure prescription vault inside ShifaCare changed my mind. Highly recommended!",
    rating: 5,
    initials: "FY"
  },
  {
    id: 3,
    name: "Rakibul Hasan",
    type: "Verified Patient",
  
    feedback: "No more missing prescriptions or forgetting lab records. Having everything managed in one dashboard makes my weekly doctor follow-ups absolutely seamless.",
    rating: 5,
    initials: "RH"
  }
];

export default function FeedbackSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-[var(--color-background)] border-b border-[var(--color-border)] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7 md:mb-12">
          <div className="max-w-xl space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Patient Feedback
            </h2>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
              We collect verified feedback directly from patients to continuously improve our healthcare service quality.
            </p>
          </div>

         
        </div>

        {/* ================= FEEDBACK CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {feedbackData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: idx * 0.1, duration: 0.3, ease: "easeOut" }
                }
              }}
              className="group"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-md flex flex-col justify-between h-full relative">

                <Quote className="absolute right-5 bottom-5 w-12 h-12 text-slate-100 stroke-[1] pointer-events-none" />

                <div>
                  {/* Rating Stars & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                  </div>

                  {/* Feedback Text */}
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    "{item.feedback}"
                  </p>
                </div>

                {/* User Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-[var(--color-primary)] border border-[var(--color-primary)]/20 flex items-center justify-center text-xs font-bold shrink-0">
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs md:text-sm font-bold text-slate-900 tracking-tight truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium truncate">
                      {item.type}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}