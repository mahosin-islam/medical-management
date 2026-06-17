"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { authClient } from "@/lib/auth-client"; 
import { TimePicker } from "@/components/web/TimePicker";
import { MonthPicker } from "@/components/web/MonthPicker"; 

const DAYS_OF_WEEK = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function DoctorSchedulePage() {
  const { data: session, isPending } = authClient.useSession(); 
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  const { register, handleSubmit, setValue, watch, reset, control } = useForm<any>({
    defaultValues: {
      clinicAddress: "",
      consultationFee: 500,
      chamberPhone: "", // 🌟 নতুন
      experience: 0,   // 🌟 নতুন
      hospital: "",     // 🌟 নতুন
      education: "",    // 🌟 নতুন
      specialization: "", // 🌟 নতুন
      availableDays: [],
      startTime: "10:00 AM",
      endTime: "03:00 PM",
      maxPatients: 20,
      nextMonthsToSchedule: [], 
      isClosed: false,
    },
  });

  const selectedDays = watch("availableDays") || [];
  const doctorEmail = session?.user?.email; 

  const getDynamicMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 0; i < 4; i++) {
      const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const monthName = futureDate.toLocaleString('default', { month: 'long' }); 
      const year = futureDate.getFullYear(); 
      months.push({
        label: `${monthName} ${year}`, 
        value: i + 1 
      });
    }
    return months;
  };

  const dynamicMonths = getDynamicMonths();

  useEffect(() => {
    if (!doctorEmail) return;

    const fetchCurrentSchedule = async () => {
      try {
        const res = await fetch(`/api/doctor/profile?email=${doctorEmail}`, { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            reset({
              clinicAddress: data.bioDetails?.clinicAddress || "",
              consultationFee: data.bioDetails?.consultationFee || 500,
              chamberPhone: data.bioDetails?.chamberPhone || "", // 🌟 প্রি-ফিল
              experience: data.experience || 0,                 // 🌟 প্রি-ফিল
              hospital: data.hospital || "",                     // 🌟 প্রি-ফিল
              // অ্যারে ডেটাকে ফ্রন্টএন্ড কমা সেপারেটেড স্ট্রিং বানিয়ে দেখানো হচ্ছে
              education: Array.isArray(data.education) ? data.education.join(", ") : "", 
              specialization: Array.isArray(data.specialization) ? data.specialization.join(", ") : "",
              availableDays: data.scheduleConfig?.availableDays || [],
              startTime: data.scheduleConfig?.startTime || "10:00 AM",
              endTime: data.scheduleConfig?.endTime || "03:00 PM",
              maxPatients: data.scheduleConfig?.maxPatients || 20,
              nextMonthsToSchedule: data.scheduleConfig?.nextMonthsToSchedule || [], 
              isClosed: data.scheduleConfig?.isClosed || false,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching current schedule:", err);
      }
    };

    fetchCurrentSchedule();
  }, [doctorEmail, reset]);

  const onSubmit = async (data: any) => {
    if (!doctorEmail) {
      setServerMessage({ type: "error", text: "আপনি লগইন অবস্থায় নেই। আবার লগইন করুন।" });
      return;
    }

    setLoading(true);
    setServerMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/doctor/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: doctorEmail, 
          ...data,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "আপডেট করতে ব্যর্থ।");

      setServerMessage({ type: "success", text: result.message });
    } catch (error: any) {
      setServerMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="text-center mt-20 font-medium">Loading session...</div>;
  if (!session) return <div className="text-center mt-20 text-red-500 font-medium">দয়া করে ডাক্তার অ্যাকাউন্ট দিয়ে লগইন করুন।</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-8 bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Doctor Dashboard & Schedule Planner</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          আপনার চেম্বারের প্রফেশনাল প্রোফাইল এবং রোগী দেখার সাপ্তাহিক শিডিউল এখান থেকে ম্যানেজ করুন।
        </p>
      </div>

      {serverMessage.text && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium border ${
          serverMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200"
        }`}>{serverMessage.text}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* 🌟 নতুন প্রফেশনাল সেকশন ১: বেসিক এক্সপেরিয়েন্স ও হসপিটাল */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Current Hospital Name</label>
            <input type="text" {...register("hospital")} placeholder="e.g. United Hospital Ltd." className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Years of Experience</label>
            <input type="number" {...register("experience")} placeholder="e.g. 12" className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" />
          </div>
        </div>

        {/* চেম্বার ও ফি ইনফো */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Chamber Phone Number</label>
            <input type="text" {...register("chamberPhone")} placeholder="e.g. +880 171X-XXXXXX" className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Consultation Fee (BDT)</label>
            <input type="number" {...register("consultationFee")} className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Chamber Address</label>
            <input type="text" {...register("clinicAddress")} placeholder="e.g. Block B, Dhanmondi" className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" />
          </div>
        </div>

        {/* 🌟 নতুন প্রফেশনাল সেকশন ২: এডুকেশন এবং স্পেশালাইজেশন ট্যাগ লজিক */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-100 dark:border-zinc-900 pt-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Education Degrees (comma separated)</label>
            <textarea {...register("education")} placeholder="MBBS - DMC (2005), MS (Ortho) - NITOR (2012)" rows={2} className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Specializations (comma separated)</label>
            <textarea {...register("specialization")} placeholder="Joint Replacement, Spine Surgery, Sports Injury" rows={2} className="w-full px-3 py-2 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm" />
          </div>
        </div>

        {/* চেম্বারের দিনসমূহ */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Available Days (সাপ্তাহিক দিনসমূহ)</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            {DAYS_OF_WEEK.map((day) => (
              <label key={day} className="flex items-center space-x-2 text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  value={day}
                  checked={selectedDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("availableDays", [...selectedDays, day]);
                    } else {
                      setValue("availableDays", selectedDays.filter((d: string) => d !== day));
                    }
                  }}
                  className="rounded border-zinc-300 text-blue-600"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* সময়, রোগী লিমিট এবং ডাইনামিক মাস */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <TimePicker label="Start Time" value={field.value} onChange={field.onChange} />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <TimePicker label="End Time" value={field.value} onChange={field.onChange} />
            )}
          />

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Max Patients / Day</label>
            <input type="number" {...register("maxPatients")} className="w-full px-3 py-2.5 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100" />
          </div>

          <div className="w-full">
            <Controller
              name="nextMonthsToSchedule"
              control={control}
              render={({ field }) => (
                <MonthPicker 
                  label="Schedule For" 
                  selectedMonths={field.value} 
                  onChange={field.onChange} 
                  dynamicMonths={dynamicMonths}
                />
              )}
            />
          </div>
        </div>

        {/* ইমার্জেন্সি ক্লোজড টগল */}
        <div className="flex items-center space-x-3 p-4 bg-red-50/50 dark:bg-red-950/10 rounded-lg border border-red-200/50">
          <input type="checkbox" id="isClosed" {...register("isClosed")} className="rounded text-red-600 h-4 w-4" />
          <div>
            <label htmlFor="isClosed" className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer">Emergency Closed</label>
            <p className="text-xs text-zinc-500">সাময়িকভাবে চেম্বার বন্ধ রাখতে এটি টিক দিন।</p>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 py-3 rounded-lg font-semibold transition disabled:opacity-50">
          {loading ? "Publishing Schedule..." : "Save & Publish Schedule"}
        </button>
      </form>
    </div>
  );
}