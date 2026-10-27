import React from "react";
import { Metadata } from "next";
import SearchFilterWidget from "./SearchFilterWidget";

export const metadata: Metadata = {
  title: "Find Best Doctors | ShifaCare Online Consultation",
  description: "Search and book appointments with verified specialists, cardiologists, and expert doctors in Dhaka.",
};

export default async function FindDoctorPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Simple & Clean Page Header */}
        <div className="space-y-1.5 border-b border-slate-200/80 pb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Find Your Specialist
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Search from our network of certified clinical experts and book your consultation instantly.
          </p>
        </div>

        {/* Search & Filter Component */}
        <SearchFilterWidget />

      </div>
    </main>
  );
}