"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Mail, Phone, ShieldCheck, Loader2, CheckCircle2, Edit2, Save, X } from "lucide-react";


interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: string;
}

export default function AdminProfilePage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 📝 ফর্ম স্টেট
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // 🎯 BetterAuth বা আপনার অথেন্টিকেশন সেশন থেকে কারেন্ট ইমেইল নিন 
  // (এখানে হার্ডকোডেড টেস্ট করা যাবে, বাট লাইভে আপনার সেশন ইমেইল বসবে)
  const adminEmail = "shifatulla15@gmail.com"; 

  // 🔎 ১. TanStack Query: ডাটাবেজ থেকে অ্যাডমিন প্রোফাইল ডাটা ফেচ করা
  const { data: profileResponse, isLoading, isError } = useQuery({
    queryKey: ["adminProfile", adminEmail],
    queryFn: async () => {
      const res = await fetch(`/api/admin/profile?email=${adminEmail}`);
      if (!res.ok) throw new Error("Profile not found");
      return res.json();
    },
    enabled: !!adminEmail,
  });

  const adminData: AdminProfile | null = profileResponse?.admin || null;

  // ডাটা আসার পর ফর্ম স্টেটে ডিফল্ট ভ্যালু সেট করা
  useEffect(() => {
    if (adminData) {
      setFormData({
        name: adminData.name || "",
        phone: adminData.phone || "",
      });
    }
  }, [adminData]);

  // 🚀 ২. TanStack Mutation: প্রোফাইল আপডেট এপিআই হিট করা
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedInfo: { name: string; phone: string }) => {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, ...updatedInfo }),
      });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      // ক্যাশ ইনভ্যালিডেট করে ডাটা ইনস্ট্যান্ট রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["adminProfile", adminEmail] });
      setIsEditing(false);
      setSuccessMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      setTimeout(() => setSuccessMessage(""), 4000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
        <p className="text-xs text-zinc-400 font-semibold italic">Fetching profile data from ShifaCare...</p>
      </div>
    );
  }

  if (isError || !adminData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 text-red-500 font-bold text-xs">
        অ্যাডমিন প্রোফাইল লোড করতে সমস্যা হয়েছে বা ডাটাবেজে ইউজারটি পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-800 dark:text-zinc-200 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm mt-4">
        
        {/* 🎨 টপ ব্যানার ডিজাইন */}
        <div className="h-28 bg-gradient-to-r from-teal-600 to-blue-600" />

        {/* 👤 প্রোফাইল কন্টেন্ট কন্টেইনার */}
        <div className="px-6 pb-8 relative">
          
          {/* ওভারল্যাপ প্রোফাইল পিকচার এবং মেটা ডাটা */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 mb-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-zinc-900 p-1 shadow-md border border-zinc-100 dark:border-zinc-800">
              <div className="w-full h-full rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex items-center justify-center font-bold">
                {adminData.image ? (
                  <img src={adminData.image} alt={adminData.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-zinc-400" />
                )}
              </div>
            </div>
            
            <div className="mb-1 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50">{adminData.name}</h2>
                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase rounded-md tracking-wider border border-emerald-100 dark:border-emerald-900/20 inline-flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  {adminData.role || "Admin"}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-semibold mt-0.5">{adminData.email}</p>
            </div>

            {/* এডিট বাটন ট্রিপল স্টেট */}
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-3.5 py-2 rounded-xl font-bold transition text-xs shadow-sm"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            )}
          </div>

          {/* 📬 সাকসেস মেসেজ অ্যালার্ট */}
          {successMessage && (
            <div className="mb-5 flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs font-semibold animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {successMessage}
            </div>
          )}

          <hr className="border-zinc-100 dark:border-zinc-800/80 my-5" />

          {/* 📄 প্রোফাইল ইনফরমেশন ফর্ম */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ইমেইল (রিড অনলি ফিল্ড) */}
            <div>
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  value={adminData.email}
                  disabled
                  className="w-full text-xs bg-zinc-50 dark:bg-zinc-900/40 text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 focus:outline-none cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* ফুল নাম ইনপুট */}
            <div>
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={formData.name}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none font-semibold transition-all border ${
                    isEditing 
                      ? "bg-white dark:bg-zinc-900 border-blue-500 focus:ring-1 focus:ring-blue-500" 
                      : "bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                  required
                />
              </div>
            </div>

            {/* ফোন নম্বর ইনপুট */}
            <div>
              <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="ফোন নম্বর সেট করুন"
                  value={formData.phone}
                  disabled={!isEditing}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none font-semibold transition-all border ${
                    isEditing 
                      ? "bg-white dark:bg-zinc-900 border-blue-500 focus:ring-1 focus:ring-blue-500" 
                      : "bg-zinc-50/50 dark:bg-zinc-900/20 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                />
              </div>
            </div>

            {/* অ্যাকশন বাটন এরিয়া (যখন এডিট মোড অন থাকবে) */}
            {isEditing && (
              <div className="flex items-center justify-end gap-3 pt-3 animate-fade-in">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    if (adminData) {
                      setFormData({ name: adminData.name, phone: adminData.phone || "" });
                    }
                  }}
                  className="inline-flex items-center gap-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-xl font-bold transition text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateProfileMutation.isPending}
                  className="inline-flex items-center gap-1 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 px-4 py-2 rounded-xl font-bold transition text-xs shadow-sm"
                >
                  {updateProfileMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  Save Changes
                </button>
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}