"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  CalendarClock, 
  FileText, 
  Video, 
  Pill, 
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Stethoscope,
  Activity,
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

const featuresData = [
  {
    id: 1,
    title: "Online Appointment",
    description: "Book appointments with specialist doctors instantly from anywhere, anytime with just a few clicks.",
    icon: CalendarClock, // 📅 শিডিউলিং ও অ্যাপয়েন্টমেন্ট ট্র্যাকিং
    color: "text-blue-500 border-blue-500/20",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    link: "/appointments",
    stats: "50k+ Appointments Booked"
  },
  {
    id: 2,
    title: "Digital Prescription",
    description: "Get digital prescriptions directly from doctors. Access your medical history and prescriptions anytime.",
    icon: FileText, // 📄 ডিজিটাল প্রেসক্রিপশন ও মেডিকেল রেকর্ড শিট
    color: "text-emerald-500 border-emerald-500/20",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    link: "/prescriptions",
    stats: "100k+ Prescriptions Issued"
  },
  {
    id: 3,
    title: "Telemedicine Service",
    description: "Consult with top doctors via video call from the comfort of your home. Quality healthcare at your fingertips.",
    icon: Video, // 📹 ইনস্ট্যান্ট হাই-কোয়ালিটি লাইভ ভিডিও কনসাল্টেশন
    color: "text-purple-500 border-purple-500/20",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    link: "/telemedicine",
    stats: "24/7 Available"
  },
  {
    id: 4,
    title: "Medicine Delivery",
    description: "Order prescribed medicines online and get them delivered to your doorstep with guaranteed authenticity.",
    icon: Pill, // 💊 মেডিসিন ও ফার্মা কেয়ার সাপোর্ট
    color: "text-rose-500 border-rose-500/20",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    link: "/medicine-delivery",
    stats: "2-Hour Delivery"
  },
  {
    id: 5,
    title: "Medical Records",
    description: "Securely store and access all your medical records, lab reports, and health history in one place.",
    icon: ClipboardList, // 📋 অর্গানাইজড পেশেন্ট কেস ফাইল ও ল্যাব রিপোর্টস
    color: "text-teal-500 border-teal-500/20",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    link: "/medical-records",
    stats: "100% Secure"
  },
  {
    id: 6,
    title: "Health Insurance",
    description: "Cashless treatment with partnered insurance providers. Easy claim processing and approval.",
    icon: ShieldCheck, // 🛡️ ভেরিফাইড হেলথ ইন্স্যুরেন্স প্রোটেকশন
    color: "text-indigo-500 border-indigo-500/20",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    link: "/insurance",
    stats: "10+ Insurance Partners"
  }
];

export default function FeaturesGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background py-16 md:py-20">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Comprehensive{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
              Healthcare Solutions
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed">
            Everything you need for modern healthcare management in one integrated digital platform.
          </p>
        </motion.div>

        {/* ================= FEATURES GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featuresData.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <Link href={feature.link}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl md:p-8 flex flex-col justify-between">
                    
                    <div>
                      {/* Icon Component Block */}
                      <div className={`relative mb-5 inline-flex rounded-2xl ${feature.bgColor} ${feature.color} p-3 border transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}>
                        <Icon className="h-6 w-6 stroke-[2.2]" />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl tracking-tight">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div>
                      {/* Stats Badge */}
                      <div className="mb-4 inline-block rounded-lg bg-muted/60 px-2.5 py-1 border border-border/40">
                        <span className="text-[11px] font-bold text-muted-foreground">{feature.stats}</span>
                      </div>

                      {/* Action Link Arrow */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <span>Learn More</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>

                    {/* Subtle Hover Glow Line */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-emerald-400 transition-transform duration-300 group-hover:scale-x-100" />
                    
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ================= BOTTOM CTA BANNER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5 } }
          }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-primary/5 via-teal-500/5 to-transparent p-6 border border-border/60 backdrop-blur-sm md:mt-16 md:p-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <h3 className="text-base font-bold text-foreground md:text-lg tracking-tight">
                Ready to transform your healthcare experience?
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Join thousands of satisfied patients using ShifaCare dashboard today.
              </p>
            </div>
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md cursor-pointer shrink-0"
            >
              Get Started Now
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* ================= TRUST INDICATORS ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } }
          }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center md:mt-14"
        >
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[11px] font-medium text-muted-foreground">50,000+ Happy Patients</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[11px] font-medium text-muted-foreground">500+ Expert Doctors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-[11px] font-medium text-muted-foreground">98% Satisfaction Rate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px] font-medium text-muted-foreground">24/7 Premium Support</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}