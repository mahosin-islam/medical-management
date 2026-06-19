"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, X, Check, User, Phone, Droplet, Calendar, Heart, MapPin, Activity } from "lucide-react";
import toast from "react-hot-toast";

interface PatientData {
  id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  bloodGroup: string;
  age: string | number;
  gender: string;
  address: string;
  medicalNotes: string;
}

export default function PatientProfile({ initialData }: { initialData: PatientData }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<PatientData>(initialData);

  // 🚀 TanStack Mutation - পেশেন্ট ডাটা আপডেটের জন্য
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: PatientData) => {
      const res = await fetch("/api/patient/profileUpdate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to update profile");
      return result;
    },
    onMutate: () => {
      return toast.loading("প্রোফাইল আপডেট হচ্ছে...");
    },
    onSuccess: (data, variables, loadingToastId) => {
      toast.success("আপনার প্রোফাইল সফলভাবে সেভ হয়েছে! ✓", { id: loadingToastId });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["patientProfile"] });
    },
    onError: (error: any, variables, loadingToastId) => {
      toast.error(`Error: ${error.message || "সমস্যা হয়েছে"}`, { id: loadingToastId });
    }
  });

  // 🛠️ ফর্ম ভ্যালিডেশন ও সাবমিশন
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("অনুগ্রহ করে আপনার নাম লিখুন!");
    if (!formData.phone.trim()) return toast.error("একটি সচল মোবাইল নাম্বার দিন!");
    if (!formData.gender) return toast.error("অনুগ্রহ করে জেন্ডার সিলেক্ট করুন!");
    if (formData.phone.trim().length < 11) return toast.error("মোবাইল নাম্বারটি অবশ্যই ন্যূনতম ১১ ডিজিটের হতে হবে!");
    
    if (formData.age === "" || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      return toast.error("অনুগ্রহ করে সঠিক বয়স (Age) ইনপুট দিন!");
    }
    if (!formData.bloodGroup) return toast.error("আপনার ব্লাড গ্রুপ সিলেক্ট করা বাধ্যতামূলক!");

    updateProfileMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      
      {/* 💳 হেডার কার্ড */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <div className="relative w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex-shrink-0">
            {formData.image ? (
              <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-2xl text-zinc-400">P</div>
            )}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{formData.name || "Patient Name"}</h3>
            <p className="text-xs text-zinc-400">{formData.email}</p>
            <div className="mt-1 text-[10px] text-blue-600 bg-blue-50 dark:bg-blue-950/30 px-2.5 py-0.5 rounded-md font-bold inline-block">
              Better-Auth Patient Account
            </div>
          </div>
        </div>

        {/* ⚙️ অ্যাকশন বাটন টগল */}
        <div className="w-full sm:w-auto flex justify-center">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-bold px-3 py-2.5 rounded-xl hover:bg-zinc-200 transition"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition disabled:bg-zinc-400"
              >
                <Check className="w-3.5 h-3.5" />
                {updateProfileMutation.isPending ? "Saving..." : "Save Info"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 📊 মেইন ইনফরমেশন ব্লক */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900 pb-2">
          Personal & Medical Records
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* 1. Full Name */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-zinc-400" /> Full Name <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.name || "—"}
              </p>
            )}
          </div>

          {/* 2. Phone Number */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" /> Phone Number <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                placeholder="e.g. 017XXXXXXXX"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.phone || "—"}
              </p>
            )}
          </div>

          {/* 3. Blood Group */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Blood Group <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-zinc-800 dark:text-zinc-200"
                required
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.bloodGroup ? `🩸 ${formData.bloodGroup}` : "—"}
              </p>
            )}
          </div>

          {/* 4. Age */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Age (বছরের হিসেবে) <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.age ? `${formData.age} Years Old` : "—"}
              </p>
            )}
          </div>

          {/* 5. Gender */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-zinc-400" /> Gender <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold text-zinc-800 dark:text-zinc-200"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.gender || "—"}
              </p>
            )}
          </div>

          {/* 6. Address (Optional) */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Current Address <span className="text-zinc-400 font-normal">(Optional)</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                placeholder="e.g. Dhanmondi, Dhaka"
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200">
                {formData.address || "—"}
              </p>
            )}
          </div>
        </div>

        {/* 📝 Medical Notes / Medical History (Optional) */}
        <div className="space-y-2 text-xs pt-2">
          <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-zinc-400" /> Medical Notes / Allergies <span className="text-zinc-400 font-normal">(Optional)</span>
          </label>
          {isEditing ? (
            <textarea
              rows={4}
              value={formData.medicalNotes}
              onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold leading-relaxed"
              placeholder="আপনার কোনো দীর্ঘমেয়াদী রোগ, ওষুধের অ্যালার্জি বা নিয়মিত কোনো সমস্যা থাকলে এখানে লিখে রাখতে পারেন..."
            />
          ) : (
            <div className="p-4 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium min-h-[80px] whitespace-pre-wrap">
              {formData.medicalNotes || "কোনো মেডিকেল নোট যুক্ত করা হয়নি। এটি যুক্ত করলে ডাক্তার অ্যাপয়েন্টমেন্টের সময় আপনার হিস্ট্রি সহজে বুঝতে পারবেন।"}
            </div>
          )}
        </div>

      </div>
    </form>
  );
}