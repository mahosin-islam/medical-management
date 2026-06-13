"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Star, MessageSquarePlus, Quote, ShieldCheck, HeartHandshake } from "lucide-react";

const feedbackData = [
    {
        id: 1,
        name: "Zayan Ahmed",
        type: "Verified Patient",
        treatment: "General Medicine",
        feedback: "The response time on ShifaCare is unmatched. Within 5 minutes, I got my serial confirmation for the doctor. The UI is clean and extremely easy to navigate.",
        rating: 5,
        initials: "ZA",
        bgAccent: "from-blue-500/10 to-cyan-500/10 text-blue-500 border-blue-500/20"
    },
    {
        id: 2,
        name: "Farhana Yasmin",
        type: "Premium Member",
        treatment: "Gynecology Support",
        feedback: "I was skeptical about video consultations at first, but the live streaming quality and secure prescription vault inside ShifaCare changed my mind. Highly recommended!",
        rating: 5,
        initials: "FY",
        bgAccent: "from-emerald-500/10 to-teal-500/10 text-emerald-500 border-emerald-500/20"
    },
    {
        id: 3,
        name: "Rakibul Hasan",
        type: "Verified Patient",
        treatment: "Orthopedics Care",
        feedback: "No more missing prescriptions or forgetting lab records. Having everything managed in one dashboard makes my weekly doctor follow-ups absolutely seamless.",
        rating: 5,
        initials: "RH",
        bgAccent: "from-purple-500/10 to-pink-500/10 text-purple-500 border-purple-500/20"
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
        <section ref={sectionRef} className="py-6 md:py-14 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">

            {/* Decorative Glow Filters */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ================= SECTION HEADER ================= */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
                    <div className="max-w-xl text-center md:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
                            Community Trust
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
                            Patient{" "}
                            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                                Feedback
                            </span>
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            We collect verified feedback directly from patients to continuously improve our active healthcare orchestration.
                        </p>
                    </div>

                    {/* Share Feedback CTA Button */}
                    <button className="inline-flex items-center gap-2 border border-border bg-card hover:bg-muted/80 text-foreground px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:shadow-sm mx-auto md:mx-0 shrink-0 cursor-pointer group">
                        <MessageSquarePlus className="w-4 h-4 text-primary transition-transform group-hover:scale-110" />
                        <span>Share Your Experience</span>
                    </button>
                </div>

                {/* ================= FEEDBACK CARDS GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {feedbackData.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={controls}
                            variants={{
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: idx * 0.1, duration: 0.4, ease: "easeOut" }
                                }
                            }}
                            whileHover={{ y: -6 }}
                            className="group"
                        >
                            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl flex flex-col justify-between h-full relative">

                                {/* Background Line Texture Effect */}
                                <Quote className="absolute right-6 bottom-6 w-14 h-14 text-muted/10 stroke-[1.2] pointer-events-none group-hover:text-primary/5 transition-colors" />

                                <div>
                                    {/* Top Metabar: Rating & Department Tag */}
                                    <div className="flex items-center justify-between gap-2 mb-5">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border bg-gradient-to-br ${item.bgAccent}`}>
                                            {item.treatment}
                                        </span>
                                    </div>

                                    {/* Feedback Message */}
                                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                                        {item.feedback}
                                    </p>
                                </div>

                                {/* User Identity Info */}
                                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                    {/* Minimalistic Styled Avatar Initials */}
                                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.bgAccent} border flex items-center justify-center text-xs font-bold shrink-0`}>
                                        {item.initials}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-xs md:text-sm font-bold text-foreground tracking-tight truncate">
                                            {item.name}
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground/60 font-medium truncate">
                                            {item.type}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ================= FOOTER SUBTEXT (TRUST MARKS) ================= */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center opacity-80">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>100% Authenticity Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-medium">
                        <HeartHandshake className="w-3.5 h-3.5 text-primary" />
                        <span>Moderated by ShifaCare Support Team</span>
                    </div>
                </div>

            </div>
        </section>
    );
}