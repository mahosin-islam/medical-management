"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Singl from "@/components/Common/Singl";
import DoctorCardSkeleton from "@/components/Common/DoctorCardSkeleton";

const CATEGORIES = ["Orthopedic", "Cardiology", "Neurology", "Medicine", "Dermatology"];

export default function SearchFilterWidget() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // 🚀 TanStack Query দিয়ে ইনস্ট্যান্ট সার্চ ও ক্যাশিং হ্যান্ডেল করা
  const { data: doctors, isLoading, isFetching } = useQuery({
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

  // সার্চ টাইপ করা বা ফিল্টার চেঞ্জ করার সময় স্কেলিটন দেখাবে
  const showSkeleton = isLoading || (isFetching && !doctors);

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
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📋 ডক্টর লিস্ট গ্রিড (Skeleton integration) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {showSkeleton ? (
          /* ডাটা লোড বা সার্চ করার সময় ৮টি Skeleton দেখাবে */
          Array.from({ length: 8 }).map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))
        ) : (
          /* ডাটা চলে আসলে আসল Cards দেখাবে */
          <>
            {doctors?.map((doc: any) => (
              <Singl key={doc._id} doc={doc} />
            ))}

            {doctors?.length === 0 && (
              <div className="col-span-full text-center text-xs text-zinc-400 p-12 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                No doctors found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}