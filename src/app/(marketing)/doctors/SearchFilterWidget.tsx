"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

const CATEGORIES = ["Orthopedic", "Cardiology", "Neurology", "Medicine", "Dermatology"];

export default function SearchFilterWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // 🚀 TanStack Query দিয়ে ইনস্ট্যান্ট সার্চ ও ক্যাশিং হ্যান্ডেল করা
  const { data: doctors, isLoading } = useQuery({
    queryKey: ["doctorsSearch", searchQuery, selectedSpecialty],
    queryFn: async () => {
      let url = `/api/doctor/search?query=${encodeURIComponent(searchQuery)}`;
      if (selectedSpecialty) {
        url += `&specialty=${encodeURIComponent(selectedSpecialty)}`;
      }
      const res = await fetch(url);
      const result = await res.json();
      return result.data || [];
    },
    placeholderData: (prev) => prev,
  });

  return (
    <div className="space-y-6">
      {/* 🔍 সার্চ এবং ফিল্টার বার কন্ট্রোল */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* টেক্সট ইনপুট */}
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Search by doctor name or hospital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-zinc-50 dark:bg-zinc-900 p-3 pl-10 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
          />
          <span className="absolute left-3 top-3.5 text-zinc-400 text-xs">🔍</span>
        </div>

        {/* ড্রপডাউন ফিল্টার */}
        <div>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full text-xs bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            <option value="">All Specializations</option>
            {CATEGORIES.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
       
       

      {/* 📋 ডক্টর লিস্ট গ্রিড */}
      {isLoading && !doctors ? (
        <div className="text-center text-xs text-zinc-500 p-12">Searching doctors...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {doctors?.map((doc: any) => (
            <div key={doc._id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex gap-4 hover:shadow-md transition">
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/40 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-blue-600 text-xl">
                {doc.image ? <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" /> : doc.name[0]}
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">{doc.name}</h3>
                <p className="text-[11px] text-zinc-500 font-medium truncate">{doc.degree}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {doc.specialization?.map((spec: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400 truncate pt-1">🏥 {doc.hospital || "N/A"}</p>
                
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-900 mt-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">৳ {doc.bioDetails?.consultationFee || 500}</span>
                  <Link href={`/doctors/${doc._id}`} className="text-[11px] font-bold text-blue-600 hover:underline">
                    View Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {doctors?.length === 0 && (
            <div className="col-span-full text-center text-xs text-zinc-400 p-12 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              No doctors found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
}