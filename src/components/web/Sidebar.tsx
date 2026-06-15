"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { 
  LayoutDashboard, CalendarDays, Users, FileText, CreditCard, Settings, LogOut, Menu, X, Activity,
  Stethoscope, Building2, BarChart3, Package, ClipboardList, ShieldCheck, Bell, FlaskConical, Video,
  MessageSquare, Clock, NotebookPen, DollarSign, UserCircle, FolderHeart,
  Plus
} from "lucide-react";

const adminMenuItems = [
  { name: "Dashboard",     href: "/admin",     icon: LayoutDashboard },
  { name: "Users",         href: "/admin/users",          icon: Users },
  { name: "Doctors",       href: "/admin/doctors",        icon: Stethoscope },
  { name: "Departments",   href: "/admin/departments",    icon: Building2 },
  { name: "Appointments",  href: "/admin/appointments",   icon: CalendarDays },
  { name: "Billing",       href: "/admin/billing",        icon: CreditCard },
  { name: "Reports",       href: "/admin/reports",        icon: BarChart3 },
  { name: "Inventory",     href: "/admin/inventory",      icon: Package },
  { name: "Audit Logs",    href: "/admin/audit-logs",     icon: ClipboardList },
  { name: "Roles",         href: "/admin/roles",          icon: ShieldCheck },
  { name: "Notifications", href: "/admin/notifications",  icon: Bell },
  { name: "AddDoctor", href: "/admin/add-doctor",  icon: Plus },
  { name: "Settings",      href: "/admin/settings",       icon: Settings },
];

const doctorMenuItems = [
  { name: "Dashboard",     href: "/doctor",     icon: LayoutDashboard },
  { name: "Appointments",  href: "/doctor/appointments", icon: CalendarDays },
  { name: "My Patients",   href: "/doctor/patients",     icon: Users },
  { name: "Prescriptions", href: "/doctor/prescriptions",icon: FileText },
  { name: "Lab Results",   href: "/doctor/lab-results",  icon: FlaskConical },
  { name: "Telemedicine",  href: "/doctor/telemedicine", icon: Video },
  { name: "Messages",      href: "/doctor/messages",     icon: MessageSquare },
  { name: "Schedule",      href: "/doctor/schedule",     icon: Clock },
  { name: "Notes",         href: "/doctor/notes",        icon: NotebookPen },
  { name: "Earnings",      href: "/doctor/earnings",     icon: DollarSign },
  { name: "Profile",       href: "/doctor/profile",      icon: UserCircle },
];

const patientMenuItems = [
  { name: "Dashboard",       href: "/patient",       icon: LayoutDashboard },
  { name: "Appointments",    href: "/patient/appointments",    icon: CalendarDays },
  { name: "Find Doctors",    href: "/patient/doctors",         icon: Stethoscope },
  { name: "Prescriptions",   href: "/patient/prescriptions",    icon: FileText },
  { name: "Lab Results",     href: "/patient/lab-results",     icon: FlaskConical },
  { name: "Billing",         href: "/patient/billing",         icon: CreditCard },
  { name: "Telemedicine",    href: "/patient/telemedicine",    icon: Video },
  { name: "Messages",        href: "/patient/messages",        icon: MessageSquare },
  { name: "Medical Records", href: "/patient/medical-records", icon: FolderHeart },
  { name: "Notifications",   href: "/patient/notifications",   icon: Bell },
  { name: "Profile",         href: "/patient/profile",         icon: UserCircle },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // URL পাথ থেকে অটোমেটিকভাবে রোল ডিটেক্ট করার জন্য ডাইনামিক লজিক
  let menuItems = patientMenuItems;
  let roleName = "Patient Portal";

  if (pathname?.startsWith("/admin")) {
    menuItems = adminMenuItems;
    roleName = "Admin Portal";
  } else if (pathname?.startsWith("/doctor")) {
    menuItems = doctorMenuItems;
    roleName = "Doctor Portal";
  }

  // পেজ চেঞ্জ হলে মোবাইল ড্রয়ার অটোমেটিক ক্লোজ করার জন্য ইফেক্ট
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card p-5 text-foreground transition-colors duration-300">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 px-2 py-4 mb-4 border-b border-border/50 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center shadow-md shadow-primary/25 shrink-0">
          <Activity className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-foreground tracking-tight leading-none mb-1.5 truncate">
            MediChamber
          </h2>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
            {roleName}
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1 max-h-[calc(100vh-160px)] scrollbar-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold relative transition-all duration-200 group cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Logout Section */}
      <div className="mt-auto border-t border-border/60 pt-4">
        <button 
          onClick={() => console.log("Logout Clicked")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors group cursor-pointer active:scale-95"
        >
          <LogOut className="w-5 h-5 text-rose-400 group-hover:text-rose-500 transition-transform group-hover:translate-x-0.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 left-0 overflow-y-hidden shrink-0 bg-card border-r border-border transition-colors duration-300">
        <SidebarContent />
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border px-4 flex items-center justify-between z-40 transition-colors duration-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-sm">
            <Activity className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-foreground tracking-tight">MediChamber</span>
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl border border-border transition-colors focus:outline-none cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
              className="fixed top-0 bottom-0 left-0 w-64 bg-card md:hidden z-50 shadow-2xl border-r border-border transition-colors duration-300"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}