"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const doctorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "ডাক্তারের নাম কমপক্ষে ৩ অক্ষরের হতে হবে" })
    .max(50, { message: "নাম অতিরিক্ত বড় হয়ে গেছে" }),
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

// Zod টাইপ ইনফার করা
type DoctorFormData = z.infer<typeof doctorSchema>;

export default function AddDoctorPage() {
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  // ⚙️ ২. React Hook Form-এর সাথে Zod কানেক্ট করা
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

  // 🚀 ৩. ফর্ম সাবমিট ফাংশন (Zod পাস করার পরেই এটি কল হবে)
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
        throw new Error(result.error || "ডাক্তার যুক্ত করতে ব্যর্থ হয়েছে।");
      }

      setServerMessage({ type: "success", text: result.message });
      reset(); // ফর্মের সব ইনপুট ক্লিয়ার করা
    } catch (error: any) {
      setServerMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:max-w-2xl md:mx-auto mt-8 p-8 bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Add New Doctor
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          অ্যাডমিন প্যানেল থেকে নতুন ডাক্তারের বেসিক প্রোফাইল তৈরি করুন।
        </p>
      </div>

      {/* সার্ভার রেসপন্স মেসেজ */}
      {serverMessage.text && (
        <div
          className={`p-4 rounded-lg mb-6 text-sm font-medium transition-all ${
            serverMessage.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          }`}
        >
          {serverMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Doctor Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Doctor Name
          </label>
          <input
            type="text"
            placeholder="e.g. Dr. Mohammad Ali Hasan"
            {...register("name")}
            className={`block w-full px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name
                ? "border-destructive focus:ring-destructive/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 font-medium mt-1.5">{errors.name.message}</p>
          )}
        </div>

        {/* Doctor Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Doctor Email
          </label>
          <input
            type="email"
            placeholder="e.g. doctor@shifacare.com"
            {...register("email")}
            className={`block w-full px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.email
                ? "border-destructive focus:ring-destructive/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 font-medium mt-1.5">{errors.email.message}</p>
          )}
        </div>

        {/* Degrees */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Degrees
          </label>
          <input
            type="text"
            placeholder="e.g. MBBS, MS (Ortho), FICS"
            {...register("degree")}
            className={`block w-full px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.degree
                ? "border-destructive focus:ring-destructive/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.degree && (
            <p className="text-xs text-red-500 font-medium mt-1.5">{errors.degree.message}</p>
          )}
        </div>

        {/* Specialty */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Specialty
          </label>
          <input
            type="text"
            placeholder="e.g. Orthopedic Surgeon"
            {...register("specialty")}
            className={`block w-full px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.specialty
                ? "border-destructive focus:ring-destructive/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.specialty && (
            <p className="text-xs text-red-500 font-medium mt-1.5">{errors.specialty.message}</p>
          )}
        </div>

        {/* Doctor Image URL */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
            Doctor Image URL
          </label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            {...register("image")}
            className={`block w-full px-3.5 py-2.5 text-zinc-900 dark:text-zinc-100 bg-transparent border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.image
                ? "border-destructive focus:ring-destructive/20"
                : "border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:ring-blue-500/20"
            }`}
          />
          {errors.image && (
            <p className="text-xs text-red-500 font-medium mt-1.5">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 py-3 rounded-lg font-semibold tracking-wide shadow-sm transition disabled:opacity-50"
        >
          {loading ? "Saving Doctor..." : "Save Doctor to Database"}
        </button>
      </form>
    </div>
  );
}