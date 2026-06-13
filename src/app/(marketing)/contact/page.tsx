'use client';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, HelpCircle, Clock } from 'lucide-react';

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
      // API call integration checkpoint for dispatching contact message loops
      console.log("Contact Form Data Data:", data);
      
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
    <section className="min-h-screen bg-background py-16 md:py-24 transition-colors duration-300 relative overflow-hidden flex items-center">
      
      {/* Structural background glows for premium aesthetic layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/5 dark:bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/5 dark:bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Grid: Context Information & Meta-data nodes */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-teal-600 dark:text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                Connect With Our <span className="text-teal-600 dark:text-primary">Support Desk</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Have questions about clinical access, practitioner credentialing, or integration steps? Reach out and our workspace operators will respond shortly.
              </p>
            </div>

            {/* Direct Channel Vectors */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              
              {/* Phone Node */}
              <div className="sc-card bg-card/50 border border-border/60 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-primary/10 text-teal-600 dark:text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Emergency Hot-line</h4>
                  <p className="text-sm font-black text-foreground mt-0.5">+880 1700-000000</p>
                </div>
              </div>

              {/* Email Node */}
              <div className="sc-card bg-card/50 border border-border/60 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-primary/10 text-teal-600 dark:text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Operational Inquiries</h4>
                  <p className="text-sm font-black text-foreground mt-0.5">support@shifacare.com</p>
                </div>
              </div>

              {/* Location Node */}
              <div className="sc-card bg-card/50 border border-border/60 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-primary/10 text-teal-600 dark:text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Corporate Workspace</h4>
                  <p className="text-sm font-black text-foreground mt-0.5">Dhaka, Bangladesh</p>
                </div>
              </div>

              {/* Timing Loop */}
              <div className="sc-card bg-card/50 border border-border/60 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 dark:bg-primary/10 text-teal-600 dark:text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Response Threshold</h4>
                  <p className="text-sm font-black text-foreground mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Grid: Interaction Component Core Contact Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sc-card bg-white dark:bg-card !p-6 sm:!p-10 shadow-xl shadow-slate-200/40 dark:shadow-black/10 border border-border/80"
            >
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input Endpoint */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider pl-0.5">Full Name</label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-slate-50 dark:bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                    />
                    {errors.name && (
                      <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Input Endpoint */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider pl-0.5">Email Address</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 dark:bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                    />
                    {errors.email && (
                      <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject Input Endpoint */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider pl-0.5">Subject</label>
                  <input
                    {...register('subject')}
                    type="text"
                    placeholder="Clinic Partnership Query"
                    className="w-full bg-slate-50 dark:bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message TextArea Endpoint */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider pl-0.5">Message Body</label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Describe your inquiry details here..."
                    className="w-full bg-slate-50 dark:bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40 resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] font-semibold text-red-500 pl-0.5">{errors.message.message}</p>
                  )}
                </div>

                {/* Dispatch Trigger State Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-950 hover:bg-slate-900 dark:bg-primary dark:hover:bg-primary/90 text-white dark:text-primary-foreground font-bold py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

                {/* Success Alert Banner Loop */}
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold text-center"
                  >
                    Your diagnostic/operational inquiry has been sent successfully!
                  </motion.div>
                )}

              </form>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}