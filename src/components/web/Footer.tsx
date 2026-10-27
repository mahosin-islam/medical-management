"use client";

import Link from "next/link";
import { Heart, Mail, ArrowRight } from "lucide-react";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-background)] text-slate-700 pt-16 pb-8 border-t border-slate-200 transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TOP SECTION: BRAND, NEWSLETTER & LINKS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Column: Brand & Newsletter (Like Reference) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center border border-[var(--color-primary)]/20">
                <Heart className="w-4 h-4 text-[var(--color-primary)] fill-[var(--color-primary)]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">ShifaCare</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-sm">
              Keep up with ShifaCare. Get health tips, news, and updates delivered straight to your inbox.
            </p>

            {/* Newsletter Input & Subscribe Button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
                />
              </div>
              <button 
                type="button"
                className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Social Handles */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Get in touch</h4>
              <div className="flex items-center gap-2.5">
                {[
                  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: LiaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: BsYoutube, href: "https://youtube.com", label: "YouTube" },
                  { icon: BsTwitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: BsInstagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Mail, href: "mailto:support@shifacare.com", label: "Email" },
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-white hover:bg-[var(--color-primary)] hover:text-white flex items-center justify-center text-slate-700 transition-all border border-slate-300 shadow-sm"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Clean Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/doctors" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Find a Doctor</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Tests & Procedures</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Health Checks & Packages</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Membership Plans</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Our Doctors</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">FAQ</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Emergency Helpline</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Patient Guide</Link></li>
              </ul>
            </div>

            {/* Corporate */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Corporate</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">News & Events</Link></li>
                <li><Link href="#" className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Notice</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Code of Ethics</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Patient Bill of Rights</Link>
          </div>
          <div className="text-center sm:text-right">
            © {currentYear} ShifaCare Bangladesh Limited. Designed by <span className="text-slate-700 font-semibold">Mahosin</span>.
          </div>
        </div>

      </div>
    </footer>
  );
}