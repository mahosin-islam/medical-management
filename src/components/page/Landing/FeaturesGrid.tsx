"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { 
  Heart, 
  Baby, 
  Brain, 
  Bone, 
  Eye, 
  ActivitySquare,
  ArrowRight,
  UserCheck,
  Stethoscope,
  Activity,
  HeartHandshake
} from "lucide-react";
import Link from "next/link";

// 🎯 আপনার ৪টি কারেন্ট রুট এবং ২টি ডেমো রুটসহ ডিপার্টমেন্ট ডাটা
const departmentsData = [
  {
    id: 1,
    title: "Cardiology",
    description: "Expert care for your heart health, dealing with complex cardiovascular conditions and hypertension management.",
    icon: Heart, // ❤️ কার্ডিওলজি ও হার্ট কেয়ার
    color: "text-blue-500 border-blue-500/20",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    link: "/departments/cardiology", // 🔗 কারেন্ট রুট
    stats: "25+ Specialists"
  },
  {
    id: 2,
    title: "Pediatrics",
    description: "Comprehensive medical care for infants, children, and adolescents, ensuring healthy growth and development.",
    icon: Baby, // 👶 শিশু রোগ বিশেষজ্ঞ বিভাগ
    color: "text-emerald-500 border-emerald-500/20",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    link: "/departments/pediatrics", // 🔗 কারেন্ট রুট
    stats: "18+ Specialists"
  },
  {
    id: 3,
    title: "Neurology",
    description: "Advanced diagnosis and treatment for disorders of the nervous system, brain, spinal cord, and muscles.",
    icon: Brain, // 🧠 নিউরোলজি ও ব্রেইন কেয়ার
    color: "text-purple-500 border-purple-500/20",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    link: "/departments/neurology", // 🔗 কারেন্ট রুট
    stats: "12+ Specialists"
  },
  {
    id: 4,
    title: "Orthopedics",
    description: "Dedicated treatment for bone, joint, ligament, and muscle injuries, restoring mobility and muscle function.",
    icon: Bone, // 🦴 অর্থোপেডিক ও বোন কেয়ার
    color: "text-rose-500 border-rose-500/20",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    link: "/departments/orthopedics", // 🔗 কারেন্ট রুট
    stats: "20+ Specialists"
  },

];

export default function DepartmentsGrid() {
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
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background pb-8 md:py-20">
      
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
            Our Medical{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-500 to-teal-500">
              Specialized Departments
            </span>
          </h2>
          <p className="mx-auto max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed">
            আপনার স্বাস্থ্য সুরক্ষায় আমাদের বিশেষায়িত চিকিৎসা বিভাগসমূহ থেকে অভিজ্ঞ ডক্টর বেছে নিন।
          </p>
        </motion.div>

        {/* ================= DEPARTMENTS GRID ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {departmentsData.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <Link href={dept.link}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-xl md:p-8 flex flex-col justify-between">
                    
                    <div>
                      {/* Icon Component Block */}
                      <div className={`relative mb-5 inline-flex rounded-2xl ${dept.bgColor} ${dept.color} p-3 border transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm`}>
                        <Icon className="h-6 w-6 stroke-[2.2]" />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary md:text-xl tracking-tight">
                        {dept.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {dept.description}
                      </p>
                    </div>

                    <div>
                      {/* Stats Badge */}
                      <div className="mb-4 inline-block rounded-lg bg-muted/60 px-2.5 py-1 border border-border/40">
                        <span className="text-[11px] font-bold text-muted-foreground">{dept.stats}</span>
                      </div>

                      {/* Action Link Arrow */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <span>Find Doctors</span>
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