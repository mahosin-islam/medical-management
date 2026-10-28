"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
import toast from 'react-hot-toast'; 
import { motion } from "framer-motion";

interface ClientProps {
  currentDoctor: {
    id: string; 
    name: string;
  };
}

const fetchDoctorAppointmentsData = async (doctorId: string) => {
  if (!doctorId) return { appointments: [], scheduleConfig: { availableDays: [] }, bookedSchedules: {} };
  const res = await fetch(`/api/doctor/appointments?doctorId=${doctorId}`);
  const result = await res.json();
  if (!result.success) throw new Error(result.error || "Failed to fetch");
  return {
    appointments: result.data || [],
    scheduleConfig: result.scheduleConfig || { availableDays: [] },
    bookedSchedules: result.bookedSchedules || {},
  };
};

export default function DoctorAppointmentsClient({ currentDoctor }: ClientProps) {
  const queryClient = useQueryClient();

  const getTodayDateString = () => {
    const today = new Date();
    return today.toLocaleDateString('sv-SE', { timeZone: 'Asia/Dhaka' }); 
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Popover এর বাইরে ক্লিক করলে ক্যালেন্ডার পপআপ বন্ধ হয়ে যাবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚀 ১. TANSTACK QUERY
  const { 
    data: apiData = { appointments: [], scheduleConfig: { availableDays: [] }, bookedSchedules: {} }, 
    isLoading, 
    isFetching,
    refetch 
  } = useQuery({
    queryKey: ['doctorAppointmentsData', currentDoctor?.id],
    queryFn: () => fetchDoctorAppointmentsData(currentDoctor.id),
    enabled: !!currentDoctor?.id,
    staleTime: 1000 * 60 * 3,
  });

  const { appointments, scheduleConfig, bookedSchedules } = apiData;

  // ⚡ ২. TANSTACK MUTATION
  const updatePaymentMutation = useMutation({
    mutationFn: async ({ appointmentId, totalFee }: { appointmentId: string; totalFee: number }) => {
      const res = await fetch("/api/doctor/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId, totalFee }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "সমস্যা হয়েছে");
      return result;
    },
    onMutate: () => toast.loading("পেমেন্ট আপডেট করা হচ্ছে..."),
    onSuccess: (data, variables, contextToastId) => {
      toast.success("পেমেন্ট সফলভাবে আপডেট হয়েছে! ✓", { id: contextToastId });
      queryClient.invalidateQueries({ queryKey: ['doctorAppointmentsData', currentDoctor?.id] });
    },
    onError: (error: any, variables, contextToastId) => {
      toast.error(`Error: ${error.message || "নেটওয়ার্ক সমস্যা!"}`, { id: contextToastId });
    }
  });

  const handleUpdatePayment = async (appointmentId: string, totalFee: number) => {
    const result = await Swal.fire({
      title: 'আপনি কি নিশ্চিত?',
      text: "আপনি কি এই পেশেন্টের সম্পূর্ণ বকেয়া টাকা বুঝে পেয়েছেন?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)', 
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'হ্যাঁ, পেয়েছি!',
      cancelButtonText: 'বাতিল করুন',
      background: document.documentElement.classList.contains('dark') ? '#09090b' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
    });

    if (!result.isConfirmed) return;
    updatePaymentMutation.mutate({ appointmentId, totalFee });
  };

  // 🗓️ CALENDAR HIGHLIGHT & DATA MATCHING LOGIC
  const isDayAvailable = (date: Date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return scheduleConfig?.availableDays?.includes(daysOfWeek[date.getDay()]);
  };

  const hasBookingsOnDate = (dateStr: string, dateObj: Date) => {
    const directCount = appointments.some((a: any) => a.date === dateStr);
    if (directCount) return true;

    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const formattedKey = `${yyyy}-${mm}-${dd}`;
    const monthKey = dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    const serials = bookedSchedules?.[monthKey]?.[formattedKey]?.serials || [];
    return serials.length > 0;
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= totalDays; d++) days.push(new Date(year, month, d));
    return days;
  };

  const handleDateSelect = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
    setIsCalendarOpen(false); 
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "All Dates";
    const [y, m, d] = dateStr.split("-");
    return `${m}/${d}/${y}`;
  };

  const filteredAppointments = selectedDate
    ? appointments.filter((app: any) => app.date === selectedDate)
    : appointments;

  if (!currentDoctor?.id) {
    return (
      <div className="p-16 text-center text-red-500 font-bold bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 max-w-2xl mx-auto mt-10 shadow-sm">
        ⚠️ কোনো বৈধ ডাক্তার অ্যাকাউন্ট সেশন খুঁজে পাওয়া যায়নি। দয়া করে আবার লগইন করুন।
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Appointments
            </h1>
            {isFetching && (
              <span className="text-[10px] bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-0.5 rounded-full animate-pulse font-bold">
                Syncing...
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Today&apos;s patient queue and payment overview.</p>
        </div>

        {/* Select Date */}
        <div className="relative" ref={popoverRef}>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-950 p-1.5 rounded-2xl border border-slate-200 dark:border-zinc-800">
            <span className="text-xs font-bold text-slate-500 px-3 uppercase tracking-wider">Filter by date</span>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="text-xs sm:text-sm font-bold bg-white dark:bg-zinc-900 text-slate-900 dark:text-white px-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-2 hover:border-slate-300 transition cursor-pointer"
            >
              <span>{selectedDate ? formatDisplayDate(selectedDate) : "All Dates"}</span>
            </button>
          </div>

          {/* 🔍 Popover Dropdown Calendar */}
          {isCalendarOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl z-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 text-slate-600 dark:text-zinc-300 font-bold cursor-pointer"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 text-slate-600 dark:text-zinc-300 font-bold cursor-pointer"
                  >
                    ↓
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-bold text-slate-400 uppercase">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {generateCalendarDays().map((date, idx) => {
                  if (!date) return <div key={idx} />;

                  const yyyy = date.getFullYear();
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const dd = String(date.getDate()).padStart(2, '0');
                  const dateStr = `${yyyy}-${mm}-${dd}`;

                  const available = isDayAvailable(date);
                  const hasBookings = hasBookingsOnDate(dateStr, date);
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      className={`relative h-8 text-xs font-semibold rounded-xl flex flex-col items-center justify-center transition cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-primary)] text-white font-bold shadow-sm"
                          : available
                          ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20"
                          : "text-slate-400 dark:text-zinc-600 hover:bg-slate-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span>{date.getDate()}</span>
                      {hasBookings && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full absolute bottom-1 ${
                            isSelected ? "bg-white" : "bg-emerald-500"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 🦶 Popover Footer Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-900 flex justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate("");
                    setIsCalendarOpen(false);
                  }}
                  className="text-[var(--color-primary)] font-bold hover:underline cursor-pointer"
                >
                  Clear Filter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate(getTodayDateString());
                    setIsCalendarOpen(false);
                  }}
                  className="text-[var(--color-primary)] font-bold hover:underline cursor-pointer"
                >
                  Today
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Patient Queue Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="sc-card p-0 overflow-hidden rounded-3xl"
      >
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            Patient Queue <span className="text-muted-foreground font-normal">({filteredAppointments.length})</span>
          </h3>
          <button onClick={() => refetch()} className="text-sm text-primary hover:underline">
            Refresh
          </button>
        </div>

        {isLoading && !filteredAppointments.length ? (
          <div className="p-16 text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">Loading appointments...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-16 text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
            No appointments for this date.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-zinc-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-zinc-950/50">
                  <th className="p-4 text-center w-20">Serial</th>
                  <th className="p-4">Patient</th>
                  <th className="p-4">Type & Location</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm divide-y divide-slate-100 dark:divide-zinc-800">
                {filteredAppointments.map((app: any) => (
                  <tr key={app._id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4 text-center font-bold text-[var(--color-primary)]">#{app.serialNumber}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{app.patientName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{app.patientPhone}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                        {app.appointmentType}
                      </span>
                      <div className="text-xs text-slate-500 mt-1">{app.location}</div>
                    </td>
                    <td className="p-4 space-y-0.5 text-xs">
                      <div className="text-slate-900 dark:text-white font-medium">Total: <span className="font-bold">{app.totalFee} Tk</span></div>
                      <div className="text-slate-500">Paid: {app.paidAmount} Tk</div>
                      {app.dueAmount > 0 ? (
                        <div className="text-amber-600 font-bold">Due: {app.dueAmount} Tk</div>
                      ) : (
                        <div className="text-emerald-600 font-bold">Fully paid</div>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        app.paymentStatus === "paid" 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}>
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {app.paymentStatus !== "paid" ? (
                        <button
                          onClick={() => handleUpdatePayment(app._id, app.totalFee)}
                          disabled={updatePaymentMutation.isPending}
                          className="bg-[var(--color-primary)] text-white font-bold px-4 py-2 rounded-xl text-xs hover:opacity-90 transition disabled:opacity-50 cursor-pointer shadow-sm"
                        >
                          {updatePaymentMutation.isPending ? "Updating..." : "Collect Due"}
                        </button>
                      ) : (
                        <span className="text-emerald-600 text-xs font-bold">Checked in</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}