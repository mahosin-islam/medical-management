"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="sc-card"
      >
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Schedule Planner</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your chamber profile and weekly schedule in one place.
          </p>
        </div>

        {serverMessage.text && (
          <div className={`p-3.5 rounded-2xl mb-6 text-sm border ${
            serverMessage.type === "success" 
              ? "bg-status-success-bg text-status-success border-status-success/30" 
              : "bg-status-pending-bg text-status-pending border-status-pending/30"
          }`}>{serverMessage.text}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Professional Section 1: Basic Experience & Hospital */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Current Hospital Name</label>
            <input type="text" {...register("hospital")} placeholder="e.g. United Hospital Ltd." className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Years of Experience</label>
            <input type="number" {...register("experience")} placeholder="e.g. 12" className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
          </div>
        </div>

        {/* Chamber & Fee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Chamber Phone Number</label>
            <input type="text" {...register("chamberPhone")} placeholder="e.g. +880 171X-XXXXXX" className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Consultation Fee (BDT)</label>
            <input type="number" {...register("consultationFee")} className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Chamber Address</label>
            <input type="text" {...register("clinicAddress")} placeholder="e.g. Block B, Dhanmondi" className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
          </div>
        </div>

        {/* Education & Specialization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Education Degrees (comma separated)</label>
            <textarea {...register("education")} placeholder="MBBS - DMC (2005), MS (Ortho) - NITOR (2012)" rows={2} className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition text-sm resize-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Specializations (comma separated)</label>
            <textarea {...register("specialization")} placeholder="Joint Replacement, Spine Surgery, Sports Injury" rows={2} className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition text-sm resize-none" />
          </div>
        </div>

        {/* Available Days */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Available Days</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 rounded-2xl border border-border bg-background/60">
            {DAYS_OF_WEEK.map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
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
                  className="rounded border-border text-primary focus:ring-primary/40"
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time, Patients & Schedule Months */}
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Max Patients / Day</label>
            <input type="number" {...register("maxPatients")} className="w-full px-3.5 py-2.5 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition" />
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

        {/* Emergency Closed */}
        <div className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-background/60">
          <input type="checkbox" id="isClosed" {...register("isClosed")} className="mt-0.5 rounded border-border text-primary h-4 w-4 focus:ring-primary/40" />
          <div>
            <label htmlFor="isClosed" className="text-sm font-medium text-foreground cursor-pointer">Emergency Closed</label>
            <p className="text-xs text-muted-foreground mt-0.5">Temporarily close the chamber if needed.</p>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-semibold transition hover:opacity-90 disabled:opacity-50">
          {loading ? "Publishing Schedule..." : "Save & Publish Schedule"}
        </button>
      </form>
      </motion.div>
    </div>
  );
}