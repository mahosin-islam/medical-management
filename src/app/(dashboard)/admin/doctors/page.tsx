"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Eye, X, Mail, Phone, Award, ShieldCheck, Stethoscope, Search, Loader2 } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  image?: string;
  status: "Active" | "Inactive";
  degree: string;
  bio: string;
}

export default function AdminDoctorDashboard() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔎 TanStack Query: ShifaCare API থেকে সব ডাক্তারের ডাটা লোড করা
  const { data: doctors = [], isLoading, isError } = useQuery<Doctor[]>({
    queryKey: ["adminAllDoctors"],
    queryFn: async () => {
      const res = await fetch("/api/admin/doctors");
      if (!res.ok) throw new Error("Failed to fetch doctors");
      const result = await res.json();
      return result.doctors || [];
    },
  });

  // 🔍 সার্চ ইনপুট ফিল্টারিং লজিক (নাম এবং স্পেশালটি দিয়ে সার্চ করা যাবে)
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-800 dark:text-zinc-200">
      
      {/* 🔹 টপ হেডার ও সার্চ বার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Doctor Management</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">ShifaCare প্ল্যাটফর্মের সকল নিবন্ধিত ডাক্তারদের তালিকা ও প্রোফাইল ডাটাবেজ থেকে ম্যানেজ করুন।</p>
        </div>

        {/* সার্চ বার */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold shadow-sm transition-all"
          />
        </div>
      </div>

      {/* 📊 ডাক্তারদের মেইন টেবিল কন্টেইনার */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/70 dark:bg-zinc-800/40 text-[10px] font-black text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-4">Doctor Details</th>
                <th className="p-4">Specialty</th>
                <th className="p-4">Experience</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs font-semibold">
              
              {/* ⏳ লোডিং স্টেট */}
              {isLoading && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-500 mb-2" />
                    <p className="italic text-[11px]">Connecting to ShifaCare database...</p>
                  </td>
                </tr>
              )}

              {/* ❌ এরর স্টেট */}
              {isError && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-red-500 font-bold">
                    ডাটাবেজ থেকে ডাক্তারদের তালিকা লোড করতে ব্যর্থ হয়েছে।
                  </td>
                </tr>
              )}

              {/* 📭 ডাটা না থাকলে */}
              {!isLoading && !isError && filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-zinc-400 text-[11px]">
                    কোনো ডাক্তারের তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}

              {/* ✅ ডাটা রেন্ডারিং */}
              {!isLoading && !isError && filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition">
                  {/* ইমেজ, নাম ও ইমেইল */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-700 font-bold">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-zinc-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-zinc-800 dark:text-zinc-100 truncate">{doc.name}</p>
                      <p className="text-[10px] text-zinc-400 font-medium truncate">{doc.email}</p>
                    </div>
                  </td>
                  
                  {/* স্পেশালটি ব্যাজ */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-lg text-[10px] font-bold border border-blue-100 dark:border-blue-900/20">
                      {doc.specialty}
                    </span>
                  </td>

                  {/* অভিজ্ঞতা */}
                  <td className="p-4 text-zinc-500 dark:text-zinc-400 font-medium">{doc.experience}</td>

                  {/* একটিভ/ইনএকটিভ স্ট্যাটাস */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      doc.status === "Active" 
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20" 
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${doc.status === "Active" ? "bg-emerald-500" : "bg-zinc-400"}`} />
                      {doc.status}
                    </span>
                  </td>

                  {/* ডিটেইলস বাটন */}
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-blue-600 dark:bg-zinc-800 dark:hover:bg-blue-600 text-zinc-700 dark:text-zinc-200 hover:text-white dark:hover:text-white px-3 py-1.5 rounded-xl font-bold transition shadow-sm text-[11px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🎯 পপআপ প্রোফাইল মোডাল (Modal Area) */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-xl transform transition-all duration-200 scale-100">
            
            {/* মোডাল হেডার গ্রাডিয়েন্ট */}
            <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-1.5 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* প্রোফাইল কার্ড হেডার ওভারল্যাপ */}
            <div className="px-6 pb-6 relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 -mt-10 mb-4 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-900 p-1 shadow-md border border-zinc-100 dark:border-zinc-800">
                  <div className="w-full h-full rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center font-bold">
                    {selectedDoctor.image ? (
                      <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-zinc-400" />
                    )}
                  </div>
                </div>
                <div className="mb-1">
                  <h3 className="text-base font-black text-zinc-900 dark:text-zinc-50 flex items-center justify-center sm:justify-start gap-1">
                    {selectedDoctor.name}
                    <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-bold flex items-center gap-1 justify-center sm:justify-start">
                    <Stethoscope className="w-3.5 h-3.5 text-zinc-400" />
                    {selectedDoctor.specialty}
                  </p>
                </div>
              </div>

              <hr className="border-zinc-100 dark:border-zinc-800/80 my-4" />

              {/* ডাক্তার ডিটেইলস ইনফো গ্রিড */}
              <div className="space-y-3.5 text-xs">
                
                {/* যোগ্যতা/ডিগ্রি */}
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-black text-zinc-400 text-[9px] uppercase tracking-wider">Qualifications</p>
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{selectedDoctor.degree}</p>
                  </div>
                </div>

                {/* এক্সপেরিয়েন্স */}
                <div className="flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-black text-zinc-400 text-[9px] uppercase tracking-wider">Experience</p>
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{selectedDoctor.experience} of medical practice</p>
                  </div>
                </div>

                {/* ইমেইল */}
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-black text-zinc-400 text-[9px] uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{selectedDoctor.email}</p>
                  </div>
                </div>

                {/* ফোন */}
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-black text-zinc-400 text-[9px] uppercase tracking-wider">Contact Number</p>
                    <p className="font-semibold text-zinc-700 dark:text-zinc-300 mt-0.5">{selectedDoctor.phone}</p>
                  </div>
                </div>

                {/* ডাক্তার বায়ো */}
                <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl">
                  <p className="font-black text-zinc-400 text-[9px] uppercase tracking-wider mb-1">About Doctor</p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">{selectedDoctor.bio}</p>
                </div>

              </div>

              {/* ক্লোজ করার বাটন */}
              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Close Profile
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}