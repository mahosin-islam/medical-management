'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiMail, FiPhone } from 'react-icons/fi';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: "How do I book an appointment with a specialist?",
    answer: "You can easily book an appointment by navigating to our 'Our Featured Specialists' section, selecting your preferred specialist, and clicking on their profile. From there, you can choose an available timeslot that fits your schedule."
  },
  {
    id: 2,
    question: "Do you support work sponsorship for international clinics?",
    answer: "Yes, we actively collaborate with partner clinics that are ready to support the work permit and sponsorship process, ensuring an eligible General Practitioner (GP) has a direct and clear path to practise safely."
  },
  {
    id: 3,
    question: "What medical specialties are currently available?",
    answer: "Our network includes certified healthcare experts across various fields, including Neurology, Cardiology, Ophthalmology (Eye Specialists), Pediatrics, and General Family Medicine."
  },
  {
    id: 4,
    question: "How does ShifaCare ensure the quality of practitioners?",
    answer: "Every doctor and clinical practitioner on our platform undergoes a strict verification process. We verify board certifications, active medical licenses, and compliance standards to maintain high-quality patient care."
  },
  {
    id: 5,
    question: "Can a partner clinic provide internal supervision for new doctors?",
    answer: "Absolutely. We specifically look for and verify partner clinics that can provide robust internal supervision from an existing family doctor to support new practitioners through a smooth professional transition."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)] border-b border-slate-200/80 relative overflow-hidden transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Clean Single Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl space-y-2"
        >
        
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Find quick answers to common questions about appointment bookings, clinical partnerships, and medical specialties.
          </p>
        </motion.div>

        {/* FAQ Grid Layout: Accordion + Light Clean Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Accordion Loop */}
          <div className="lg:col-span-8 space-y-3">
            {faqData.map((faq, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-200 hover:border-slate-300"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 sm:p-5 flex items-center justify-between text-left gap-4 select-none cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                      {faq.question}
                    </span>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen ? 'bg-[var(--color-primary)] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isOpen ? <FiMinus size={14} /> : <FiPlus size={14} />}
                    </span>
                  </button>

                  {/* Accordion Body with Smooth Framer Motion Collapse */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Clean Light Sidebar Box */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">Any More Questions?</h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Can't find the answers you are looking for? Get in touch with our dedicated support team.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {/* Contact Via Phone */}
                <a
                  href="tel:01405600700"
                  className="flex items-center gap-3.5 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-xl border border-slate-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 border border-[var(--color-primary)]/10">
                    <FiPhone size={16} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Emergency Line</p>
                    <p className="text-xs font-bold text-slate-900 truncate">01405600700</p>
                  </div>
                </a>

                {/* Contact Via Email */}
                <a
                  href="mailto:support@shifacare.com"
                  className="flex items-center gap-3.5 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-xl border border-slate-200 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 border border-[var(--color-primary)]/10">
                    <FiMail size={16} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Email Us</p>
                    <p className="text-xs font-bold text-slate-900 truncate">support@shifacare.com</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}