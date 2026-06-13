"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logout from "../Buttons/Logout";
import Dashboard from "../Buttons/Dashboard";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "../shared/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Doctors", href: "/doctors" },
  {
    name: "Departments",
    href: "/departments",
    hasDropdown: true,
    subItems: [
      { name: "Cardiology", href: "/departments/cardiology" },
      { name: "Pediatrics", href: "/departments/pediatrics" },
      { name: "Neurology", href: "/departments/neurology" },
      { name: "Orthopedics", href: "/departments/orthopedics" },
    ]
  },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false); 
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Navbar Container - Uses dynamic card background, border, and blur */}
      <nav className="bg-card/80 backdrop-blur-md border border-border shadow-sm rounded-full px-6 py-3 flex items-center justify-between transition-colors duration-300">

        {/* Logo Section - Brand text matching with foreground color */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
            S
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            hifaCare
          </span>
        </Link>

        {/* Desktop Navigation Links - Active and hover states match theme tokens */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <div
                key={link.name}
                className="relative py-2 group"
                onMouseEnter={() => link.hasDropdown && setIsDesktopDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsDesktopDropdownOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`font-medium text-sm flex items-center gap-1 transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      isDesktopDropdownOpen ? "rotate-180 text-foreground" : ""
                    }`} />
                  )}
                </Link>

                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-foreground rounded-full"
                  />
                )}

                {/* Desktop Nested Menu Items */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isDesktopDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-card border border-border rounded-2xl shadow-xl p-2 flex flex-col gap-1 z-50"
                      >
                        {link.subItems?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-muted-foreground hover:text-foreground hover:bg-accent font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side Actions Panel */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button Container */}
          <div className="p-1 text-muted-foreground hover:bg-accent rounded-full border border-border transition-colors">
            <ThemeToggle/>
          </div>

          {/* ================= DESKTOP AUTH / PROFILE SECTION ================= */}
          <div className="hidden md:flex items-center">
            {session ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                {/* User Avatar Badge */}
                <button className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center font-semibold text-sm shadow-md border-2 border-card cursor-pointer transition-transform active:scale-95">
                  {getInitial(session.user.name)}
                </button>

                {/* Profile Open Panel Container */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl p-2 flex flex-col gap-1 z-50"
                    >
                      {/* User Info Wrapper Header */}
                      <div className="px-4 py-2 border-b border-border/50 mb-1">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">User Account</p>
                        <p className="text-sm font-semibold text-foreground truncate">{session.user.name}</p>
                      </div>

                      {/* Dashboard Action Nodes */}
                      <div className="w-full text-muted-foreground hover:text-foreground hover:bg-accent font-medium text-sm rounded-xl transition-colors flex items-center gap-2">
                        <Dashboard />
                      </div>

                      {/* Explicit Logout Target Node */}
                      <div className="w-full text-red-500 hover:bg-red-500/10 font-medium text-sm rounded-xl transition-colors flex items-center gap-2">
                        <Logout />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* If Not Authenticated Actions Layout */
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-foreground font-semibold text-sm hover:opacity-80 transition-opacity px-4 py-2"
                >
                  Sign in
                </Link>
                <Link
                  href="/singup"
                  className="bg-foreground text-background font-semibold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-all shadow-sm"
                >
                  Join now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Action Toggle Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden text-foreground hover:bg-accent rounded-full transition-colors focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* ================= MOBILE DRAWER NAVIGATION ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-20 left-4 right-4 bg-card rounded-3xl p-6 shadow-xl border border-border md:hidden flex flex-col gap-4 z-40"
          >
            {/* Mobile Auth Header Widget */}
            {session && (
              <div className="flex items-center gap-3 bg-background p-3 rounded-2xl">
                <div className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-sm">
                  {getInitial(session.user.name)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">{session.user.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Member</span>
                </div>
              </div>
            )}

            {/* Mobile Navigation List Nodes */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.name} className="w-full">
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                          className="w-full flex items-center justify-between text-left text-foreground font-medium p-3 rounded-xl hover:bg-accent transition-colors"
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`} />
                        </button>

                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4 bg-background/50 rounded-xl mt-1"
                            >
                              {link.subItems?.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-sm text-muted-foreground p-2.5 hover:text-foreground"
                                >
                                  {sub.name}
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
                        className={`block font-medium p-3 rounded-xl transition-colors ${
                          isActive ? "bg-foreground text-background font-semibold" : "text-foreground hover:bg-accent"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="h-[1px] bg-border my-1" />

            {/* Mobile Auth Button Trigger Elements */}
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
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center font-semibold text-foreground py-3 rounded-full hover:bg-accent transition-colors border border-border"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/singup"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center font-semibold bg-foreground text-background py-3 rounded-full hover:opacity-90 transition-colors shadow-md"
                  >
                    Join now
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}