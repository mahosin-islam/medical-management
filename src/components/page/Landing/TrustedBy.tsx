"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
// Lucide-react এর প্রয়োজনীয় আইকনসমূহ
import { Building2, Calendar, Hospital, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  image: string; // রিয়ালিস্টিক এনভায়রনমেন্ট ইমেজ
  type: string;
  established: number;
  rating: number;
  certified: boolean;
  beds: number;
  specialty: string;
}

const trustedPartners: Partner[] = [
  {
    id: 1,
    name: "Dhaka Medical College Hospital",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&auto=format&fit=crop&q=80",
    type: "Government",
    established: 1946,
    rating: 4.8,
    certified: true,
    beds: 2500,
    specialty: "Multi-specialty"
  },
  {
    id: 2,
    name: "Square Hospital Ltd.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
    type: "Private",
    established: 2006,
    rating: 4.9,
    certified: true,
    beds: 450,
    specialty: "Multi-specialty"
  },
  {
    id: 3,
    name: "United Hospital Ltd.",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&auto=format&fit=crop&q=80",
    type: "Private",
    established: 2006,
    rating: 4.7,
    certified: true,
    beds: 500,
    specialty: "General Surgery"
  },
  {
    id: 4,
    name: "Evercare Hospital Dhaka",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop&q=80",
    type: "Private",
    established: 2005,
    rating: 4.8,
    certified: true,
    beds: 425,
    specialty: "Cardiology Center"
  }
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#f8fafd] dark:bg-background py-16 md:py-24 transition-colors duration-300">

      {/* Background Dot Grid Mesh Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Ambient Lighting Background Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-12 h-80 w-80 rounded-full bg-[#0070f3]/5 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-12 right-0 h-80 w-80 rounded-full bg-[#00c9a7]/5 blur-3xl dark:bg-[#00c9a7]/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header Block Module */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="mb-14 text-center md:mb-20 space-y-3"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-primary block">
            OUR COMPLIANCE NETWORK
          </span>

          <h2 className="text-3xl font-black tracking-tight text-[#12283c] dark:text-foreground sm:text-4xl md:text-5xl">
            Trusted by{" "}
            <span className="relative inline-block text-[#0070f3] dark:text-primary">
              Leading Providers
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-[#0070f3] to-[#00c9a7] rounded-full"
              />
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-slate-500 dark:text-muted-foreground font-medium pt-1">
            Certified medical institutions and healthcare networks actively integrating clinical intelligence.
          </p>
        </motion.div>

        {/* Dynamic Partner Cards Grid Structural Array */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trustedPartners.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: idx * 0.06, duration: 0.5, ease: "easeOut" }
                }
              }}
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-card border border-slate-100 dark:border-border/40 rounded-2xl p-3.5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >

              <div>
                {/* Upper Frame Display Area containing Medical Images */}
                <div className="w-full aspect-[16/10] bg-slate-50 dark:bg-muted/10 rounded-xl overflow-hidden relative border border-slate-100 dark:border-border/20 mb-4">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103 pointer-events-none"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"



                  />

                  {/* Absolute Top-Edge Certification Stamp */}
                  {partner.certified && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <div className="flex items-center gap-1 rounded-lg bg-white/90 dark:bg-[#111c24]/90 backdrop-blur-md px-2 py-0.5 border border-emerald-500/30 shadow-sm">
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Verified</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Partner Hospital Info */}
                <div className="space-y-3 px-1">
                  <h3 className="text-base font-bold text-[#12283c] dark:text-foreground line-clamp-2 min-h-[44px] group-hover:text-[#0070f3] dark:group-hover:text-primary transition-colors duration-200 leading-snug">
                    {partner.name}
                  </h3>

                  {/* Technical Metadata Rows Vector Layout */}
                  <div className="space-y-2 pt-1 border-t border-slate-50 dark:border-border/10">

                    {/* Organization Type Info Row */}
                    <div className="flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>Type</span>
                      </div>
                      <span className="font-bold text-[#12283c] dark:text-foreground">{partner.type}</span>
                    </div>

                    {/* Establishment Year Row */}
                    <div className="flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>Est. Year</span>
                      </div>
                      <span className="font-bold text-[#12283c] dark:text-foreground">{partner.established}</span>
                    </div>

                    {/* Capacity Indicator Row */}
                    {partner.beds > 0 && (
                      <div className="flex items-center justify-between text-xs font-medium">
                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-muted-foreground">
                          <Hospital className="h-3.5 w-3.5 text-slate-400" />
                          <span>Beds</span>
                        </div>
                        <span className="font-bold text-[#12283c] dark:text-foreground">{partner.beds}+ Beds</span>
                      </div>
                    )}

                    {/* Quality Ratings Star Feedback Row */}
                    <div className="flex items-center justify-between text-xs font-medium">
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-muted-foreground">
                        <Star className="h-3.5 w-3.5 text-slate-400" />
                        <span>Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-2.5 w-2.5 ${i < Math.floor(partner.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-slate-100 text-slate-200 dark:fill-muted/20 dark:text-muted/10"
                                }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-[#12283c] dark:text-foreground">{partner.rating}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Lower Section Specialty Deck Area */}
              <div className="pt-4 px-1">
                <div className="w-full rounded-xl bg-slate-50 dark:bg-muted/30 px-3 py-2 text-center border border-slate-100 dark:border-border/40">
                  <span className="text-xs font-bold text-slate-500 dark:text-muted-foreground block truncate">
                    ✨ {partner.specialty}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}