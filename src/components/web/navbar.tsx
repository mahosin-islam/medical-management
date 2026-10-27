"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight, 
  User, 
  Activity, 
  HeartPulse, 
  Brain, 
  Bone,
  LogOut,
  LayoutDashboard,
  UserPlus,
  LogIn
} from "lucide-react";
import Logout from "../Buttons/Logout";
import Dashboard from "../Buttons/Dashboard";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "OUR DOCTORS", href: "/doctors" },
  {
    name: "SERVICES",
    href: "/departments",
    hasDropdown: true,
    subItems: [
      { name: "Cardiology", href: "/departments/cardiology", icon: HeartPulse, desc: "Heart care & diagnostics" },
      { name: "Pediatrics", href: "/departments/pediatrics", icon: Activity, desc: "Child healthcare specialist" },
      { name: "Neurology", href: "/departments/neurology", icon: Brain, desc: "Brain & nervous system" },
      { name: "Orthopedics", href: "/departments/orthopedics", icon: Bone, desc: "Bones & joints treatment" },
    ]
  },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false); 
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDesktopDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md 
    border-b border-slate-200 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">

        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <span className=" tracking-tight text-[var(--color-primary)]">
            SHIFACARE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <div
                key={link.name}
                ref={link.hasDropdown ? dropdownRef : null}
                className="relative py-1"
                onMouseEnter={() => link.hasDropdown && setIsDesktopDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsDesktopDropdownOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`font-semibold text-xs tracking-wider transition-colors flex items-center gap-1 ${
                    isActive ? "text-[var(--color-primary)]" : "text-slate-700 hover:text-[var(--color-primary)]"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isDesktopDropdownOpen ? "rotate-180 text-[var(--color-primary)]" : ""
                    }`} />
                  )}
                </Link>

                {isActive && !link.hasDropdown && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-3.5 left-0 w-full h-[2px] bg-[var(--color-primary)] rounded-full"
                  />
                )}

                {/* Grid Dropdown for Services (Like Reference Image 1) */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isDesktopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-3 z-50"
                      >
                        <div className="col-span-2 pb-2 border-b border-slate-100 px-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our Services</span>
                        </div>
                        {link.subItems?.map((sub) => {
                          const IconComponent = sub.icon;
                          return (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setIsDesktopDropdownOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">{sub.name}</p>
                                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{sub.desc}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side Actions Panel: Account Toggle & Booking Engine Button */}
        <div className="flex items-center space-x-3">
          
          {/* Account Dropdown Toggle (Reference Image 2 style) */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
              className="flex items-center gap-1.5 p-2 text-slate-700 hover:text-[var(--color-primary)] transition-colors rounded-xl hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                {session ? getInitial(session.user.name) : <User className="w-4 h-4" />}
              </div>
              <span className="hidden sm:inline">My Account</span>
            </button>

            <AnimatePresence>
              {isAccountDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 flex flex-col gap-1 z-50"
                >
                  {session ? (
                    <>
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-bold text-slate-900 truncate">{session.user.name}</p>
                      </div>
                      <div onClick={() => setIsAccountDropdownOpen(false)} className="w-full text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                        <Dashboard />
                      </div>
                      <div onClick={() => setIsAccountDropdownOpen(false)} className="w-full text-xs text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Logout />
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/singup"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[var(--color-primary)] hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Signup</span>
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setIsAccountDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[var(--color-primary)] hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Login</span>
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Engine Button */}
          <Link
            href="/doctors"
            className="bg-[var(--color-primary)] hover:opacity-95 text-white font-semibold text-xs tracking-wide px-5 py-2.5 rounded-lg transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 lg:hidden text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 shadow-xl lg:hidden flex flex-col gap-4 z-40 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.name} className="w-full">
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="w-full flex items-center justify-between text-left text-slate-800 font-semibold text-xs tracking-wider p-3 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`} />
                        </button>

                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4 grid grid-cols-1 gap-1 my-1"
                            >
                              {link.subItems?.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-xs text-slate-600 p-2 hover:text-[var(--color-primary)] font-medium"
                                >
                                  • {sub.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block font-semibold text-xs tracking-wider p-3 rounded-xl transition-colors ${
                          isActive ? "bg-[var(--color-primary)] text-white" : "text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-[1px] bg-slate-200 my-1" />

            <div className="flex flex-col gap-3">
              {session ? (
                <>
                  <div onClick={() => setIsOpen(false)} className="w-full">
                    <Dashboard />
                  </div>
                  <div onClick={() => setIsOpen(false)} className="w-full">
                    <Logout />
                  </div>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 text-center font-semibold border border-slate-200 text-slate-700 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-xs"
                  >
                    Login
                  </Link>
                  <Link
                    href="/singup"
                    onClick={() => setIsOpen(false)}
                    className="w-1/2 text-center font-semibold bg-[var(--color-primary)] text-white py-2.5 rounded-lg hover:opacity-95 transition-colors shadow-sm text-xs"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}