"use client";

import Link from "next/link";
import { 
  PhoneCall, 
  UserCheck, 
  CalendarDays, 
  Heart,
  ArrowUpRight
} from "lucide-react";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    corporate: [
      { label: "Careers", href: "#" },
      { label: "Contact US", href: "#" },
      { label: "News & Events", href: "#" },
      { label: "Biomedical Reports", href: "#" },
    ],
    speciality: [
      { label: "Cardiac Care", href: "#" },
      { label: "Dentistry", href: "#" },
      { label: "Gastrosciences", href: "#" },
      { label: "Neuroscience", href: "#" },
    ],
    services: [
      { label: "Find a Doctor", href: "/patient/doctors" },
      { label: "Book Appointment", href: "#" },
      { label: "Emergency Helpline", href: "#" },
      { label: "Insurance & Billing", href: "/patient/billing" },
    ],
    about: [
      { label: "History", href: "#" },
      { label: "Vision & Mission", href: "#" },
      { label: "Our Leaders", href: "#" },
      { label: "Sustainability", href: "#" },
    ]
  };

  return (
    // 🎨 এখানে আপনার প্রজেক্টের মেইন ডার্ক থিম ম্যাচিং ব্যাকগ্রাউন্ড ব্যবহার করা হয়েছে
    <footer className="bg-slate-900 text-slate-200 pt-10 pb-6 relative overflow-hidden border-t border-slate-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= TOP ACTION CARDS (COMPACTED) ================= */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Action 1: Emergency Call */}
            <div className="bg-slate-800/60 text-slate-100 p-3.5 rounded-xl flex items-center justify-between border border-slate-700/50 group hover:bg-slate-800 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">Emergency Call</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Hotline: 10666</p>
                </div>
              </div>
              <div className="w-7 h-7 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action 2: Find Doctor */}
            <div className="bg-slate-800/60 text-slate-100 p-3.5 rounded-xl flex items-center justify-between border border-slate-700/50 group hover:bg-slate-800 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">Find Doctor</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Search verified specialists</p>
                </div>
              </div>
              <div className="w-7 h-7 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Action 3: Make an Appointment */}
            <div className="bg-slate-800/60 text-slate-100 p-3.5 rounded-xl flex items-center justify-between border border-slate-700/50 group hover:bg-slate-800 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-tight">Make an Appointment</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Instant live slot booking</p>
                </div>
              </div>
              <div className="w-7 h-7 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </div>

        {/* Divider - Reduced spacing */}
        <div className="border-t border-slate-800 my-6" />

        {/* ================= MIDDLE BRANDING & SOCIALS ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">ShifaCare</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leading healthcare provider committed to excellence in medical treatment.
            </p>
          </div>

          {/* Social Handles - Perfectly aligned and functional */}
          <div className="flex items-center gap-2">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/60">
              <BsTwitter className="w-3.5 h-3.5" />
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/60">
              <FaFacebook className="w-3.5 h-3.5" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/60">
              <LiaLinkedin className="w-4 h-4" />
            </Link>
            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/60">
              <BsYoutube className="w-3.5 h-3.5" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/60">
              <BsInstagram className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ================= LINKS GRID (COMPACT 4-COL COLUMNS) ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-t border-slate-800 pt-6">
          
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Corporate</h4>
            <ul className="space-y-1.5">
              {footerLinks.corporate.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Speciality</h4>
            <ul className="space-y-1.5">
              {footerLinks.speciality.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">Services</h4>
            <ul className="space-y-1.5">
              {footerLinks.services.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">About</h4>
            <ul className="space-y-1.5">
              {footerLinks.about.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            Designed by <span className="text-slate-400 font-medium">Siam Khan</span>
          </div>
          <div>
            © {currentYear} ShifaCare. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}