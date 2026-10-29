"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

// অ্যানিমেশনের জন্য ভ্যারিয়েন্টস
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// ব্লগ ডাটা (মেডিকেল রিলেটেড সিম্পল টেক্সট)
const blogPosts = [
  {
    id: 1,
    title: "Understanding Heart Health: Tips for Everyday Care",
    excerpt: "Discover simple lifestyle changes and daily habits that can significantly improve your cardiovascular health and longevity.",
    category: "Cardiology",
    date: "October 24, 2026",
    author: "Dr. Siam Khan",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Importance of Regular Health Checkups",
    excerpt: "Routine medical screenings can detect potential health issues before they become serious. Learn why prevention is key.",
    category: "Preventive Care",
    date: "October 20, 2026",
    author: "Dr. Nusrat Jahan",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Managing Diabetes Through Balanced Nutrition",
    excerpt: "A practical guide to meal planning and dietary choices that help maintain healthy blood sugar levels effectively.",
    category: "Endocrinology",
    date: "October 15, 2026",
    author: "Dr. Farhana Akter",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full border border-[var(--color-primary)]/20 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Medical Insights
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Latest Health Articles & News
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Stay informed with expert medical advice, wellness tips, and healthcare updates from our specialists.
          </p>
        </div>

        {/* ব্লগ কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* ব্লগ ইমেজ কন্টেইনার */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 dark:bg-zinc-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider shadow-sm border border-slate-200/50 dark:border-zinc-800">
                    {post.category}
                  </span>
                </div>

                {/* কন্টেন্ট এরিয়া */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-zinc-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* কার্ড ফুটার / রিড মোর বাটন */}
              <div className="px-6 pb-6 pt-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] hover:opacity-80 transition-opacity cursor-pointer group/btn"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}