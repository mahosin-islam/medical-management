"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { UserPlus, Stethoscope, Mail, Award, Image as ImageIcon } from "lucide-react";

const doctorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "ডাক্তারের নাম কমপক্ষে ৩ অক্ষরের হতে হবে" })
    .max(50, { message: "নাম অতিরিক্ত বড় হয়ে গেছে" }),
  email: z
    .string()
    .email({ message: "একটি সঠিক ইমেইল অ্যাড্রেস দিন" }),
  degree: z
    .string()
    .min(2, { message: "ডিগ্রি ফিল্ডটি ফাঁকা রাখা যাবে না (যেমন: MBBS)" }),
  specialty: z
    .string()
    .min(3, { message: "স্পেশালিটি ফিল্ডটি ফাঁকা রাখা যাবে না" }),
  image: z
    .string()
    .url({ message: "একটি সঠিক ইমেজ URL দিন (https://...)" }),
});

type DoctorFormData = z.infer<typeof doctorSchema>;

export default function AddDoctorPage() {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      email: "",
      degree: "",
      specialty: "",
      image: "",
    },
  });

  const onSubmit = async (data: DoctorFormData) => {
    setLoading(true);
    setServerMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/add-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "ডাক্তার যুক্ত করতে ব্যর্থ হয়েছে।");
      }

      setServerMessage({ type: "success", text: result.message });
      reset();
    } catch (error: any) {
      setServerMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      
      {/* 🔹 টপ হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Add New Doctor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            অ্যাডমিন প্যানেল থেকে নতুন ডাক্তারের প্রফেশনাল প্রোফাইল তৈরি করুন।
          </p>
        </div>
      </div>

      {/* 📊 মেইন ফর্ম কার্ড */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm"
      >
        
        {/* সার্ভার রেসপন্স মেসেজ */}
        {serverMessage.text && (
          <div
            className={`p-4 rounded-2xl mb-6 text-xs font-semibold transition-all ${
              serverMessage.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
                : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900"
            }`}
          >
            {serverMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Doctor Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
                Doctor Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <UserPlus className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dr. Mohammad Ali Hasan"
                  {...register("name")}
                  className={`block w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 bg-slate-50/50 dark:bg-zinc-950 border rounded-2xl focus:outline-none focus:border-[var(--color-primary)] transition font-medium ${
                    errors.name
                      ? "border-red-500"
                      : "border-slate-200 dark:border-zinc-800"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.name.message}</p>
              )}
            </div>

            {/* Doctor Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
                Doctor Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  placeholder="e.g. doctor@shifacare.com"
                  {...register("email")}
                  className={`block w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 bg-slate-50/50 dark:bg-zinc-950 border rounded-2xl focus:outline-none focus:border-[var(--color-primary)] transition font-medium ${
                    errors.email
                      ? "border-red-500"
                      : "border-slate-200 dark:border-zinc-800"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.email.message}</p>
              )}
            </div>

            {/* Degrees */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
                Degrees
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Award className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. MBBS, MS (Ortho), FICS"
                  {...register("degree")}
                  className={`block w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 bg-slate-50/50 dark:bg-zinc-950 border rounded-2xl focus:outline-none focus:border-[var(--color-primary)] transition font-medium ${
                    errors.degree
                      ? "border-red-500"
                      : "border-slate-200 dark:border-zinc-800"
                  }`}
                />
              </div>
              {errors.degree && (
                <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.degree.message}</p>
              )}
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
                Specialty
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <Stethoscope className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="e.g. Orthopedic Surgeon"
                  {...register("specialty")}
                  className={`block w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 bg-slate-50/50 dark:bg-zinc-950 border rounded-2xl focus:outline-none focus:border-[var(--color-primary)] transition font-medium ${
                    errors.specialty
                      ? "border-red-500"
                      : "border-slate-200 dark:border-zinc-800"
                  }`}
                />
              </div>
              {errors.specialty && (
                <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.specialty.message}</p>
              )}
            </div>

          </div>

          {/* Doctor Image URL (Full Width) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
              Doctor Image URL
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <ImageIcon className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                {...register("image")}
                className={`block w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-zinc-100 bg-slate-50/50 dark:bg-zinc-950 border rounded-2xl focus:outline-none focus:border-[var(--color-primary)] transition font-medium ${
                  errors.image
                    ? "border-red-500"
                    : "border-slate-200 dark:border-zinc-800"
                }`}
              />
            </div>
            {errors.image && (
              <p className="text-xs text-red-500 font-semibold mt-1.5">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-primary)] text-white hover:opacity-90 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Saving Doctor..." : "Save Doctor to Database"}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}