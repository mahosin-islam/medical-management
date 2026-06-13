// app/components/patients/PatientsSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { useInView, motion, useAnimation } from "framer-motion";
import { 
  Heart, 
  Clock, 
  Shield, 
  Video, 
  FileText, 
  CreditCard, 
  Calendar, 
  Users, 
  ThumbsUp,
  ChevronRight,
  PhoneCall
} from "lucide-react";

const patientBenefits = [
  {
    id: 1,
    title: "Easy Booking",
    titleBn: "সহজ বুকিং",
    description: "Book doctor appointments and active time sheets in under 60 seconds.",
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    stat: "50k+ Appointments"
  },
  {
    id: 2,
    title: "Save Time",
    titleBn: "সময় বাঁচান",
    description: "No long lines. Instantly schedule your visit based on live doctor slot sheets.",
    icon: Clock,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    stat: "Save 2+ Hours"
  },
  {
    id: 3,
    title: "Telemedicine",
    titleBn: "টেলিমেডিসিন",
    description: "Connect securely via embedded high-quality live video calls from home.",
    icon: Video,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    stat: "500+ Online Doctors"
  },
  {
    id: 4,
    title: "Digital Records",
    titleBn: "ডিজিটাল রেকর্ড",
    description: "Access prescriptions, lab results, and patient charts securely in one vault.",
    icon: FileText,
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
    stat: "Lifetime Storage"
  }
];

const ambulanceFleet = [
  {
    id: "ac",
    type: "AC Ambulance",
    typeBn: "এসি অ্যাম্বুলেন্স",
    // 🚑 রিয়েল লাইফ সাপোর্ট ইমার্জেন্সি অ্যাম্বুলেন্স (বাহিরের দৃশ্য)
    image: "https://images.unsplash.com/photo-1597188558265-f0fb7428a243?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
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
const stats = [
  { value: "50k+", label: "Active Patients", icon: Users, color: "text-blue-500" },
  { value: "98%", label: "Satisfaction Rate", icon: ThumbsUp, color: "text-green-500" },
  { value: "500+", label: "Verified Specialists", icon: Heart, color: "text-red-500" },
  { value: "24/7", label: "Instant Response", icon: Clock, color: "text-purple-500" }
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
    <section ref={containerRef} className="py-16 md:py-14 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden transition-colors duration-300">
      {/* Soft Background Blur Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="text-center mb-16">
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
        <div className="mb-10">
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
                  <img 
                    src={fleet.image} 
                    alt={fleet.type}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
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