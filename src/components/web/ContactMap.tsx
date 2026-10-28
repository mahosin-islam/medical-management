"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function ContactMap() {
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Sector+4%2C+Road+7%2C+House+40%2C+Uttara%2C+Dhaka";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 md:mt-16"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Find Us in <span className="text-[var(--color-primary)]">Dhaka Uttara</span>
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Sector 4, Road 7, House 40, Uttara, Dhaka-1230
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-sm">
        <div className="absolute top-4 left-4 z-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm px-3 py-2.5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 flex items-center gap-3 shadow-sm max-w-[calc(100%-2rem)]">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">ShifaCare</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">House 40, Road 7, Sector 4, Uttara, Dhaka</p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
          >
            <Navigation className="w-3 h-3" />
            Get Directions
          </a>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.548!2d90.393!3d23.8688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c40ab1a06101%3A0x9b42c7e573f6856d!2sSector%204%2C%20Uttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1739999999999!5m2!1sen!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[340px] sm:h-[400px] md:h-[480px] grayscale contrast-125 opacity-95 dark:invert dark:hue-rotate-180 dark:opacity-80"
          title="ShifaCare Location - House 40, Road 7, Sector 4, Uttara, Dhaka"
        ></iframe>
      </div>
    </motion.div>
  );
}
