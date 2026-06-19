"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, X, Check, Award, Briefcase, DollarSign, Building, User, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  image: string;
  degree: string;
  specialty: string;
  hospital: string;
  experience: string | number;
  consultationFee: string | number;
  about: string;
  specialization: string[];
}

export default function DoctorProfileForm({ initialData }: { initialData: ProfileData }) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [newTag, setNewTag] = useState("");

  // 🚀 TanStack Mutation - ডাটা আপডেট করার জন্য
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: ProfileData) => {
      const res = await fetch("/api/doctor/profileUpdate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "Failed to update profile");
      return result;
    },
    onMutate: () => {
      return toast.loading("প্রোফাইল আপডেট করা হচ্ছে...");
    },
    onSuccess: (data, variables, loadingToastId) => {
      toast.success("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে! ✓", { id: loadingToastId });
      setIsEditing(false); // সেভ হওয়ার পর ভিউ মোডে লক হবে
      queryClient.invalidateQueries({ queryKey: ["doctorProfile"] });
    },
    onError: (error: any, variables, loadingToastId) => {
      toast.error(`Error: ${error.message || "সমস্যা হয়েছে"}`, { id: loadingToastId });
    }
  });

  // 🛠️ ফ্রন্টএন্ড ফর্ম ভ্যালিডেশন এবং সাবমিট হ্যান্ডলার
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔍 কাস্টম ভ্যালিডেশন চেক (HTML5 required-এর পাশাপাশি অতিরিক্ত নিরাপত্তা)
    if (!formData.name.trim()) return toast.error("অনুগ্রহ করে আপনার নাম লিখুন!");
    if (!formData.specialty.trim()) return toast.error("মেডিকেল স্পেশালটি ফিল্ডটি বাধ্যতামূলক!");
    if (!formData.degree.trim()) return toast.error("আপনার মেডিকেল ডিগ্রীসমূহ উল্লেখ করুন!");
    if (!formData.hospital.trim()) return toast.error("বর্তমান হাসপাতাল বা চেম্বারের নাম লিখুন!");
    
    if (formData.experience === "" || Number(formData.experience) < 0) {
      return toast.error("অনুগ্রহ করে সঠিক অভিজ্ঞতার বছর (Experience) লিখুন!");
    }
    
    if (formData.consultationFee === "" || Number(formData.consultationFee) <= 0) {
      return toast.error("ভিজিটিং ফি (Consultation Fee) অবশ্যই ০ থেকে বড় হতে হবে!");
    }

    // সব ঠিক থাকলে মিউটেশন ট্রিগার হবে
    updateProfileMutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData(initialData); // আগের ডাটায় রিসেট
    setIsEditing(false); 
  };

  const addTag = () => {
    if (newTag.trim() && !formData.specialization.includes(newTag.trim())) {
      setFormData({ ...formData, specialization: [...formData.specialization, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      specialization: formData.specialization.filter((t) => t !== tagToRemove),
    });
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
              <div className="w-full h-full flex items-center justify-center font-black text-2xl text-zinc-400">D</div>
            )}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{formData.name || "Doctor Name"}</h3>
            <p className="text-xs text-zinc-400">{formData.email}</p>
            <div className="mt-1 text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md font-bold inline-block">
              ✓ Active Better-Auth Provider
            </div>
          </div>
        </div>

        {/* ⚙️ অ্যাকশন বাটনসমূহ */}
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
          Profile Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* 1. Full Name (Required) */}
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
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 border border-transparent">
                {formData.name || "—"}
              </p>
            )}
          </div>

          {/* 2. Specialty (Required) */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-zinc-400" /> Medical Specialty <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                placeholder="e.g. Cardiologist"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 border border-transparent">
                {formData.specialty || "—"}
              </p>
            )}
          </div>

          {/* 3. Degrees (Required) */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-zinc-400" /> Medical Degrees <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                placeholder="e.g. MBBS, FCPS"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 border border-transparent">
                {formData.degree || "—"}
              </p>
            )}
          </div>

          {/* 4. Hospital (Required) */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-zinc-400" /> Hospital / Chamber <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                placeholder="e.g. Popular Diagnostic Center"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 border border-transparent">
                {formData.hospital || "—"}
              </p>
            )}
          </div>

          {/* 5. Experience (Required & Positive Number Verification) */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-zinc-400" /> Experience (Years) <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 border border-transparent">
                {formData.experience !== "" ? `${formData.experience} Years` : "—"}
              </p>
            )}
          </div>

          {/* 6. Consultation Fee (Required & Value > 0 Check) */}
          <div className="space-y-2">
            <label className="font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-zinc-400" /> Consultation Fee <span className="text-rose-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="number"
                min="1"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                required
              />
            ) : (
              <p className="p-3 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl font-bold text-zinc-800 dark:text-zinc-200 border border-transparent">
                {formData.consultationFee !== "" ? `${formData.consultationFee} BDT` : "—"}
              </p>
            )}
          </div>
        </div>

        {/* 🏷️ Search Keywords / Specializations (Optional) */}
        <div className="space-y-2 text-xs pt-2">
          <label className="font-bold text-zinc-500 dark:text-zinc-400">
            Search Keywords / Specializations <span className="text-zinc-400 font-normal">(Optional)</span>
          </label>
          
          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                placeholder="e.g. Bone Fracture, Heart Disease (লিখে Add চাপুন)"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-4 font-bold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition"
              >
                Add
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {formData.specialization.length > 0 ? (
              formData.specialization.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-lg font-bold text-[11px] border border-zinc-200/30 dark:border-zinc-800">
                  {tag}
                  {isEditing && (
                    <button type="button" onClick={() => removeTag(tag)} className="text-rose-500 font-black ml-1 hover:text-rose-700">×</button>
                  )}
                </span>
              ))
            ) : (
              <p className="text-zinc-400 italic">কোনো কিওয়ার্ড যোগ করা হয়নি। রোগীরা এই কি-ওয়ার্ডগুলো সার্চ করে আপনাকে খুঁজে পাবে।</p>
            )}
          </div>
        </div>

        {/* 📝 About / Professional Bio (Optional) */}
        <div className="space-y-2 text-xs pt-2">
          <label className="font-bold text-zinc-500 dark:text-zinc-400">
            About / Professional Bio <span className="text-zinc-400 font-normal">(Optional)</span>
          </label>
          {isEditing ? (
            <textarea
              rows={4}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold leading-relaxed"
              placeholder="আপনার অভিজ্ঞতা এবং বিশেষত্ব সম্পর্কে বিস্তারিত লিখুন..."
            />
          ) : (
            <div className="p-4 bg-zinc-50/40 dark:bg-zinc-900/30 rounded-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium min-h-[80px] whitespace-pre-wrap">
              {formData.about || "আপনার বায়ো এখনো যুক্ত করা হয়নি। 'Edit Profile' বাটনে ক্লিক করে ডেসক্রিপশন লিখতে পারেন।"}
            </div>
          )}
        </div>

      </div>
    </form>
  );
}