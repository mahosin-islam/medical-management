"use client";

import { ShieldCheck, Truck, Clock, HeartPulse } from "lucide-react";
import Image from "next/image";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "24/7 Emergency Ambulance",
      description: "Immediate emergency response with our fully equipped critical care ambulances available round the clock.",
      iconBg: "bg-amber-500/10 text-amber-500",
    },
    {
      icon: HeartPulse,
      title: "Specialized Healthcare",
      description: "Consult with top-tier, certified medical specialists dedicated to comprehensive patient care and recovery.",
      iconBg: "bg-emerald-500/10 text-emerald-500",
    },
    {
      icon: Clock,
      title: "Instant Slot Booking",
      description: "Skip the long queues. Book real-time appointments instantly according to doctors' dynamic schedules.",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      icon: ShieldCheck,
      title: "Secure Medical Records",
      description: "Your health reports, digital prescriptions, and data are secured with enterprise-grade encrypted privacy.",
      iconBg: "bg-rose-500/10 text-rose-500",
    },
  ];

  return (
    <section className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Core Strengths
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-3 text-foreground">
            Why Patients Trust MediChamber
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-4 leading-relaxed">
            We bridge the gap between advanced medical technology and empathetic healthcare services to bring you the best clinical experience.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Side: Modern Image Grid (Ambulance & Hospital Care Focus) */}
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Background design elements */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Main Hospital Care Image */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-md col-span-2 aspect-[21/9] bg-muted relative group">
              <Image
                src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
                alt="Modern Hospital Emergency Care"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white/90">State-of-the-Art Medical Infrastructure</span>
              </div>
            </div>

            {/* Emergency Ambulance Focus Image */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-md aspect-square bg-muted relative group">
              <Image
                src="https://images.unsplash.com/photo-1626317804403-128a1be52fe4?auto=format&fit=crop&w=500&q=80"
                alt="24/7 Emergency Ambulance Response"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white/90">24/7 ICU Ambulances</span>
              </div>
            </div>

            {/* Doctor/Patient Interaction Image */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-md aspect-square bg-muted relative group">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80"
                alt="Doctor Caring for Patient"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white/90">Patient-Centric Approach</span>
              </div>
            </div>
          </div>

          {/* Right Side: Features List */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="p-5 bg-card border border-border rounded-2xl hover:shadow-md transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 ${feature.iconBg} rounded-xl flex items-center justify-center font-bold mb-4 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Trust Footer inside features section */}
            <div className="pt-4 border-t border-border/60 flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center font-bold text-[10px] text-primary">MS</div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-card flex items-center justify-center font-bold text-[10px] text-emerald-600">DK</div>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border-2 border-card flex items-center justify-center font-bold text-[10px] text-amber-600">AK</div>
              </div>
              <span>Trusted by over <strong className="text-foreground font-bold">10,000+</strong> patients nationwide.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}