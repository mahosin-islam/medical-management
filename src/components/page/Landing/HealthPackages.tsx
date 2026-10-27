'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface PackageItem {
  id: number;
  title: string;
  price: string;
  summary: string;
  image: string;
  badge?: string;
  tests: string[];
  benefits: string[];
}

const packagesData: PackageItem[] = [
  {
    id: 1,
    title: "Executive Basic (Men)",
    price: "৳ 20,500",
    summary: "Blood Test Essential; CBC & ESR; Renal Function Test; Serum Calcium; TSH; Blood Grouping & Rh Typing; Liver Function...",
    image: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793080649/cfof7x5bivmb6chilm7i.png",
    badge: "Popular",
    tests: [
      "Complete Blood Count (CBC) & ESR",
      "Renal Function Test (Creatinine, Urea, Uric Acid)",
      "Serum Calcium & Fasting Blood Sugar (FBS)",
      "Thyroid Stimulating Hormone (TSH)",
      "Blood Grouping & Rh Typing",
      "Liver Function Test (SGPT, SGOT, Bilirubin)"
    ],
    benefits: [
      "Free Doctor Consultation Post-Report",
      "10% Discount on Follow-up Lab Tests",
      "Digital Health Record Archiving"
    ]
  },
  {
    id: 2,
    title: "Executive Premier (Men)",
    price: "৳ 30,400",
    summary: "Executive Premier (Men) - The recommended comprehensive health check for men, offering enhanced disease screening and hepatitis...",
    image: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793091011/tx2bdresblqv0y2ysbpm.png",
    badge: "Recommended",
    tests: [
      "Everything in Executive Basic Package",
      "Comprehensive Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)",
      "Hepatitis B (HBsAg) & Hepatitis C Screening",
      "HbA1c Diabetes Profile",
      "ECG (Resting Electrocardiogram)",
      "Urine Routine & Microscopic Examination"
    ],
    benefits: [
      "Senior Specialist Doctor Consultation",
      "Priority Appointment Slots",
      "Free Home Sample Collection within City Limits"
    ]
  },
  {
    id: 3,
    title: "Whole Body Check (Men) Below 45 Years",
    price: "৳ 40,700",
    summary: "Whole Body Check (Men) - Below 45 Years. Stay sharp and stay ahead with this comprehensive whole body check tailored for...",
    image: "https://res.cloudinary.com/dzoigbkep/image/upload/v1793091035/ryyu7uds3ugkototsdd6.png",
    badge: "Full Screening",
    tests: [
      "Complete Cardio-Metabolic Screening",
      "Advanced Cancer Markers (PSA Test)",
      "Whole Abdomen Ultrasonogram (USG)",
      "Vitamin D3 & Vitamin B12 Levels",
      "Chest X-Ray & Spirometry Test",
      "Full Cardiac Stress Test (ECHO/TMT)"
    ],
    benefits: [
      "Full Day Dedicated Health Coordinator",
      "Complimentary Healthy Breakfast during Test Day",
      "Comprehensive Multi-Specialist Panel Review"
    ]
  }
];

export default function HealthPackages() {
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] relative overflow-hidden transition-colors duration-300 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 max-w-2xl space-y-2"
        >
         
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Our Packages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Choose from our curated diagnostic and wellness checkup packages designed by experienced clinical specialists.
          </p>
        </motion.div>

        {/* Packages Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packagesData.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Fixed Height and object-cover to prevent layout breaking */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {pkg.badge && (
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[var(--color-primary)] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[var(--color-primary)]/10">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Content Box */}
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  
                  <div className="text-lg font-extrabold text-[var(--color-primary)]">
                    {pkg.price}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3 pt-1 border-t border-slate-100">
                    {pkg.summary}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelectedPackage(pkg)}
                  className="w-full py-3 bg-[var(--color-primary)] hover:opacity-95 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ================= MODAL / POPUP DETAILS WINDOW ================= */}
      <AnimatePresence>
        {selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative p-6 sm:p-8 space-y-6"
            >
              {/* Close Icon Trigger */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-8">
                <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-widest bg-[var(--color-primary)]/10 px-3 py-1 rounded-full inline-block">
                  Package Details
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedPackage.title}
                </h3>
                <p className="text-2xl font-black text-[var(--color-primary)]">
                  {selectedPackage.price}
                </p>
              </div>

              {/* Included Tests List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                  Included Clinical Tests ({selectedPackage.tests.length})
                </h4>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
                  {selectedPackage.tests.map((test, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 leading-snug">{test}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Benefits */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Complimentary Benefits
                </h4>
                <ul className="space-y-2">
                  {selectedPackage.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Booking CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setSelectedPackage(null);
                    window.location.href = '/doctors';
                  }}
                  className="w-full py-3.5 bg-[var(--color-primary)] hover:opacity-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all text-center cursor-pointer"
                >
                  Book Package Now
                </button>
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}