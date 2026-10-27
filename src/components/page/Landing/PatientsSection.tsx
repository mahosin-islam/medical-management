"use client";

import { useEffect, useRef } from "react";
import { useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const ambulanceFleet = [
  {
    id: "ac",
    type: "AC Ambulance",
    image: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793038102/nk8ybjgrcz1rpv6fgmsz.png",
    features: ["Get ambulance within 30 minutes*", "24/7 affordable quality service", "Emergency Hotline: 01405600700"]
  },
  {
    id: "icu",
    type: "ICU Ambulance",
    image: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793038055/w2ydarg5wh13sk8qcruu.png",
    features: ["Advanced life support & equipment", "24/7 affordable quality service", "Emergency Hotline: 01405600700"]
  },
  {
    id: "air",
    type: "AIR Ambulance",
    image: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793038134/tsbdpqeqo2t4cqhw5uxc.png",
    features: ["Get ambulance within 60 minutes*", "24/7 affordable quality service", "Emergency Hotline: 01405600700"]
  }
];

export default function PatientsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={containerRef} className="py-12 md:py-16 bg-[var(--color-background)] border-b border-[var(--color-border)] relative overflow-hidden transition-colors duration-300">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
                Ready to Help at Your Emergency
              </h3>
              <p className="text-xs text-slate-500">Instant dispatch logistics available countrywide</p>
            </div>
            <button className="text-xs font-semibold text-[var(--color-primary)] flex items-center gap-1 hover:underline cursor-pointer">
              <span>View all fleet</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ambulanceFleet.map((fleet) => (
              <div
                key={fleet.id}
                className="bg-card border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Wrap */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-100 border-b border-slate-100">
                  {fleet.image ? (
                    <Image
                      src={fleet.image}
                      alt={fleet.type}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      No Image Available
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-sm">
                    24/7 Available
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">{fleet.type}</h4>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-2">
                    {fleet.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                        <svg className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={index === 2 ? "font-semibold text-slate-900" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}