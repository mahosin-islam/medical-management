
"use client";

import { useEffect, useRef } from "react";
import { useInView,  useAnimation } from "framer-motion";

import Image from "next/image";
import { ChevronRight, Heart } from "lucide-react";



const ambulanceFleet = [
  {
    id: "ac",
    type: "AC Ambulance",
    typeBn: "এসি অ্যাম্বুলেন্স",
    // 🚑 রিয়েল লাইফ সাপোর্ট ইমার্জেন্সি অ্যাম্বুলেন্স (বাহিরের দৃশ্য)
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    features: ["Get ambulance within 30 minutes*", "24/7 affordable quality service", "We are just a call away: 01405600700"]
  },
  {
    id: "icu",
    type: "ICU Ambulance",
    typeBn: "আইসিইউ অ্যাম্বুলেন্স",
    // 🏥 অ্যাডভান্সড লাইফ সাপোর্ট ও আইসিইউ ইকুইপমেন্ট (অ্যাম্বুলেন্সের ভেতরের দৃশ্য)
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80",
    features: ["Get ambulance within 30 minutes*", "24/7 affordable quality service", "We are just a call away: 01405600700"]
  },
  {
    id: "air",
    type: "AIR Ambulance",
    typeBn: "এয়ার অ্যাম্বুলেন্স",
    // 🚁 ইমার্জেন্সি এয়ার মেডিকেল রেসকিউ হেলিকপ্টার
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80",
    features: ["Get ambulance within 60 minutes*", "24/7 affordable quality service", "We are just a call away: 01405600700"]
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
    <section ref={containerRef} className="py-6 md:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden transition-colors duration-300">
      {/* Soft Background Blur Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER SECTION ================= */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full mb-4 border border-primary/20">
            <Heart className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Patient-Centric Care</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Why Patients Trust{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              ShifaCare
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Streamlining emergency services, dynamic provider slot scheduling, and robust data workflows to deliver uncompromising clinic excellence.
          </p>
        </div>

        {/* ================= EMERGENCY AMBULANCE SECTION ================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 border-b border-border/60 pb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                We are ready to help at your emergency
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Instant dispatch logistics available countrywide</p>
            </div>
            <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline cursor-pointer">
              View all fleet <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ambulanceFleet.map((fleet) => (
              <div
                key={fleet.id}
                className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Image Wrap */}
                <div className="aspect-[16/10] overflow-hidden bg-muted relative border-b border-border/50">
                  <div className="relative h-full w-full overflow-hidden">

                    <Image
                      src={fleet.image}
                      alt={fleet.type}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>


                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border px-2.5 py-1 rounded-lg text-[11px] font-bold text-foreground">
                    24/7 Available
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-4">
                    <h4 className="text-base font-bold text-foreground tracking-tight">{fleet.type}</h4>
                    <span className="text-[11px] font-medium text-muted-foreground/70">{fleet.typeBn}</span>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-2.5 mb-2">
                    {fleet.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-normal">
                        <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={index === 2 ? "font-semibold text-foreground" : ""}>
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