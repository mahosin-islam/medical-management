"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
import toast from 'react-hot-toast'; 

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

  // Popover এর বাইরে ক্লিক করলে ক্যালেন্ডার পপআপ বন্ধ হয়ে যাবে
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
      confirmButtonColor: '#2563eb', 
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
    setIsCalendarOpen(false); // সিলেক্ট করার পর পপআপ বন্ধ হবে
  };

  // তারিখ ফরম্যাট (e.g. 08/26/2026)
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "All Dates";
    const [y, m, d] = dateStr.split("-");
    return `${m}/${d}/${y}`;
  };

  // সিলেক্টেড ডেট অনুযায়ী পেশেন্ট লিস্ট ফিল্টার
  const filteredAppointments = selectedDate
    ? appointments.filter((app: any) => app.date === selectedDate)
    : appointments;

  if (!currentDoctor?.id) {
    return (
      <div className="p-16 text-center text-red-500 font-bold bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto mt-10">
        ⚠️ কোনো বৈধ ডাক্তার অ্যাকাউন্ট সেশন খুঁজে পাওয়া যায়নি। দয়া করে আবার লগইন করুন।
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 🔝 Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Welcome, Dr. {currentDoctor.name}
            </h1>
            {isFetching && (
              <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950/40 px-2 py-0.5 rounded-md animate-pulse font-bold">
                Syncing...
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">আপনার আজকের চেম্বারের লাইভ পেশেন্ট লিস্ট ও পেমেন্ট হিসেব।</p>
        </div>

        {/* 📅 SELECT DATE Popover Trigger Container */}
        <div className="relative" ref={popoverRef}>
          <div className="flex items-center bg-zinc-50 dark:bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-bold text-zinc-500 uppercase px-3 flex items-center gap-1.5">
              <span>🗓️</span> SELECT DATE
            </span>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="text-xs font-semibold bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-3 hover:border-blue-500 transition"
            >
              <span>{formatDisplayDate(selectedDate)}</span>
              <span className="text-zinc-400">📅</span>
            </button>
          </div>

          {/* 🔍 Popover Dropdown Calendar */}
          {isCalendarOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl z-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 font-bold"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-md hover:bg-zinc-200 text-zinc-600 dark:text-zinc-300 font-bold"
                  >
                    ↓
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-bold text-zinc-400">
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
                      className={`relative h-8 text-xs font-semibold rounded-lg flex flex-col items-center justify-center transition ${
                        isSelected
                          ? "bg-blue-600 text-white font-bold shadow-md"
                          : available
                          ? "text-blue-600 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 hover:bg-blue-100"
                          : "text-zinc-400 dark:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span>{date.getDate()}</span>
                      {/* 🟢 পেশেন্ট বুকিং থাকলে সবুজ ছোট ডট */}
                      {hasBookings && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full absolute bottom-0.5 ${
                            isSelected ? "bg-white" : "bg-emerald-500"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 🦶 Popover Footer Actions */}
              <div className="mt-4 pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate("");
                    setIsCalendarOpen(false);
                  }}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Clear Filter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate(getTodayDateString());
                    setIsCalendarOpen(false);
                  }}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                >
                  Today
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📋 Full-Width Patient Queue Table */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Live Patient Queue ({filteredAppointments.length})
          </h3>
          <button onClick={() => refetch()} className="text-xs font-bold text-blue-600 hover:underline">
            🔄 Refresh List
          </button>
        </div>

        {isLoading && !filteredAppointments.length ? (
          <div className="p-16 text-center text-xs font-medium text-zinc-500">ডাটা লোড হচ্ছে...</div>
        ) : filteredAppointments.length === 0 ? (
          <div className="p-16 text-center text-xs text-zinc-400 font-medium">
            📭 এই তারিখে আপনার কোনো অ্যাপয়েন্টমেন্ট বুকিং নেই।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/40 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900">
                  <th className="p-4 text-center w-20">Serial</th>
                  <th className="p-4">Patient Info</th>
                  <th className="p-4">Type & Location</th>
                  <th className="p-4">Payment Summary</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-zinc-100 dark:divide-zinc-900">
                {filteredAppointments.map((app: any) => (
                  <tr key={app._id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20 transition">
                    <td className="p-4 text-center font-extrabold text-blue-600 text-sm bg-blue-50/10 dark:bg-blue-500/5">
                      #{app.serialNumber}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-zinc-800 dark:text-zinc-200">{app.patientName}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">📞 {app.patientPhone}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {app.appointmentType}
                      </span>
                      <div className="text-[11px] text-zinc-500 mt-1">📍 {app.location}</div>
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div>Total: <span className="font-bold">{app.totalFee} Tk</span></div>
                      <div className="text-emerald-600">Paid: {app.paidAmount} Tk</div>
                      {app.dueAmount > 0 ? (
                        <div className="text-rose-500 font-bold">Due: {app.dueAmount} Tk</div>
                      ) : (
                        <div className="text-emerald-600 font-bold">✓ Full Paid</div>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        app.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {app.paymentStatus !== "paid" ? (
                        <button
                          onClick={() => handleUpdatePayment(app._id, app.totalFee)}
                          disabled={updatePaymentMutation.isPending}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-xl text-[11px] disabled:bg-zinc-400 transition"
                        >
                          {updatePaymentMutation.isPending ? "Updating..." : "Collect Due"}
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-bold text-[11px]">✓ Checked In</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}