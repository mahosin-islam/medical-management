"use client";

import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Sidebar from "@/components/web/Sidebar";
import { Bell, User, Search } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Fixed Desktop Sidebar & Mobile Drawer Component */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* ─── DASHBOARD TOPBAR ─── */}
        {/* Added 'md:static' or standard flow so it aligns properly with main content */}
        <header className="h-16 bg-card border-b border-border px-4 md:px-8  items-center justify-between shrink-0 transition-colors duration-300 z-30 hidden md:flex">
          
          {/* Left Side: Search Bar (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center gap-3 bg-background border border-border rounded-xl px-3 py-1.5 w-72 transition-colors duration-300">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search patients, appointments..." 
              className="bg-transparent text-xs font-medium outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Mobile Fallback Title - Left Padding adjusted to make space for the menu button */}
          <div className="sm:hidden font-bold text-foreground text-sm pl-12">
            Portal
          </div>

          {/* Right Side: Theme Toggle, Notifications & User Profile */}
          <div className="flex items-center gap-4">
            
            {/* Dark Mode Theme Toggle Button */}
            <ThemeToggle />

            {/* Notification Button with Dynamic Active Indicator */}
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl border border-border transition-colors relative cursor-pointer focus:outline-none">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-card" />
            </button>

            {/* Vertical Divider Line */}
            <div className="w-[1px] h-6 bg-border" />

            {/* User Profile Section */}
            <div className="flex items-center gap-3 pl-1">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden lg:flex flex-col text-left min-w-0">
                <span className="text-xs font-bold text-foreground leading-none mb-1 truncate">
                  Dr. Siam Khan
                </span>
                <span className="text-[10px] font-medium text-muted-foreground truncate">
                  Admin Card_Id: #102
                </span>
              </div>
            </div>

          </div>
        </header>

        {/* ─── MAIN CONTENT AREA ─── */}
        {/* CHANGED: 'pt-20 md:pt-8' to 'pt-16 md:pt-6' or adjusted for absolute/fixed overlaps */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-background/50 pt-20 md:pt-6 transition-colors duration-300">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}