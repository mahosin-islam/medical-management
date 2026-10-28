'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import ContactMap from '@/components/web/ContactMap';

// Contact form validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z.string().min(4, { message: "Subject must be at least 4 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Contact Form Data:", data);
      
      // Simulate network request latency
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-[var(--color-background)] py-16 md:py-24 transition-colors duration-300 relative overflow-hidden flex items-center border-b border-slate-200/80">
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Grid: Context Information & Meta-data nodes */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Connect With Our <span className="text-[var(--color-primary)]">Support Desk</span>
              </h1>
              <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
                Have questions about clinical access, practitioner credentialing, or integration steps? Reach out and our workspace operators will respond shortly.
              </p>
            </div>

            {/* Direct Channel Vectors */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              
              {/* Phone Node */}
              <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-all hover:border-slate-300">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Emergency Hot-line</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">+880 1405-600700</p>
                </div>
              </div>

              {/* Email Node */}
              <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-all hover:border-slate-300">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operational Inquiries</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">support@shifacare.com</p>
                </div>
              </div>

              {/* Location Node */}
              <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-all hover:border-slate-300">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Corporate Workspace</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">Dhaka, Bangladesh</p>
                </div>
              </div>

              {/* Timing Loop */}
              <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm flex items-center gap-4 transition-all hover:border-slate-300">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Response Threshold</h4>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Grid: Interaction Component Core Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-slate-200/80 p-6 sm:p-10 rounded-3xl shadow-sm"
            >
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input Endpoint */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider pl-0.5">Full Name</label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-slate-400"
                    />
                    {errors.name && (
                      <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Input Endpoint */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider pl-0.5">Email Address</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-slate-400"
                    />
                    {errors.email && (
                      <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject Input Endpoint */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider pl-0.5">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    placeholder="Clinic Partnership Query"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-slate-400"
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message TextArea Endpoint */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider pl-0.5">Message Body</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Describe your inquiry details here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-slate-400 resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.message.message}</p>
                  )}
                </div>

                {/* Dispatch Trigger State Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-primary)] hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  {!isSubmitting && <Send className="w-3.5 h-3.5" />}
                </button>

                {/* Success Alert Banner Loop */}
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold text-center"
                  >
                    Your diagnostic/operational inquiry has been sent successfully!
                  </motion.div>
                )}

              </form>

            </motion.div>
          </div>

        </div>

        <ContactMap />
      </div>
    </section>
  );
}