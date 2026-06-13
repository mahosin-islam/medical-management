'use client';

import React, { useState } from 'react';
import { FiPlus, FiMinus, FiMail, FiPhone } from 'react-icons/fi';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqSection() {
  //activeIndex শুরুতে null থাকবে, কোনো একটিতে ক্লিক করলে সেটি ওপেন হবে
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData: FaqItem[] = [
    {
      id: 1,
      question: "How do I book an appointment with a specialist?",
      answer: "You can easily book an appointment by navigating to our 'Our Best Doctors' section, selecting your preferred specialist, and clicking on their profile. From there, you can choose an available timeslot that fits your schedule."
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
      question: "How does Careviv ensure the quality of practitioners?",
      answer: "Every doctor and clinical practitioner on our platform undergoes a strict verification process. We verify board certifications, active medical licenses, and compliance standards to maintain high-quality patient care."
    },
    {
      id: 5,
      question: "Can a partner clinic provide internal supervision for new doctors?",
      answer: "Absolutely. We specifically look for and verify partner clinics that can provide robust internal supervision from an existing family doctor to support new practitioners through a smooth professional transition."
    }
  ];

  return (
    <section className="py-20 bg-[#f8fafd] dark:bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background Subtle Lines for Careviv Look */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-primary block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#12283c] dark:text-foreground">
            Frequently Asked <span className="text-[#0070f3] dark:text-primary">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-muted-foreground font-medium">
            Find quick answers to common questions about appointment bookings, clinical partnerships, and medical specialties.
          </p>
        </div>

        {/* FAQ Grid Layout: Accordion + Contact Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: The Accordion Loop */}
          <div className="lg:col-span-8 space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-card border border-slate-100 dark:border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 sm:p-6 flex items-center justify-between text-left gap-4 select-none cursor-pointer group"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#12283c] dark:text-foreground group-hover:text-[#0070f3] dark:group-hover:text-primary transition-colors duration-200">
                      {faq.question}
                    </span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#0070f3] text-white' : 'bg-slate-50 dark:bg-muted/20 text-slate-500 dark:text-slate-400'}`}>
                      {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
                    </span>
                  </button>

                  {/* Accordion Smooth Body Transition */}
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-500 dark:text-muted-foreground leading-relaxed font-medium border-t border-slate-50 dark:border-border/10 pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Support Sidebar Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="bg-[#12283c] dark:bg-[#111c24] text-white rounded-3xl p-6 sm:p-8 text-center border border-white/5 shadow-xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Any More Questions?</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  Cant find the answers you are looking for? Get in touch with our dedicated medical support team.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Contact Via Phone */}
                <a
                  href="tel:+123456789"
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00c9a7]/20 text-[#00c9a7] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FiPhone size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Emergency Line</p>
                    <p className="text-sm font-bold text-white">+1 (234) 567-89</p>
                  </div>
                </a>

                {/* Contact Via Email */}
                <a
                  href="mailto:support@careviv.com"
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0070f3]/20 text-[#0070f3] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FiMail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Email Us</p>
                    <p className="text-sm font-bold text-white">support@careviv.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}