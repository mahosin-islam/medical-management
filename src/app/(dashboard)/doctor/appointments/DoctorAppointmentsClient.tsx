"use client";

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // 👈 TanStack Query টুলস
import Swal from 'sweetalert2'; 
import toast from 'react-hot-toast'; 

interface ClientProps {
  currentDoctor: {
    id: string; 
    name: string;
  };
}

// 🌐 ডাটা ফেচ করার কোর ফাংশন
const fetchDoctorAppointments = async (doctorId: string, date: string) => {
  if (!doctorId) return [];
  const res = await fetch(`/api/doctor/appointments?doctorId=${doctorId}&date=${date}`);
  const result = await res.json();
  if (!result.success) throw new Error(result.error || "Failed to fetch");
  return result.data || [];
};

export default function DoctorAppointmentsClient({ currentDoctor }: ClientProps) {
  const queryClient = useQueryClient(); // 👈 ক্যাশ ইনভ্যালিডেট করার জন্য ক্লায়েন্ট

  // 📅 বাংলাদেশের টাইমজোন অনুযায়ী আজকের ডেট স্ট্রিং (YYYY-MM-DD)
  const getTodayDateString = () => {
    const today = new Date();
    return today.toLocaleDateString('sv-SE', { timeZone: 'Asia/Dhaka' }); 
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

  // ================= 🚀 ১. TANSTACK QUERY (GET REQUEST) =================
  const { 
    data: appointments = [], 
    isLoading, 
    isFetching,
    refetch 
  } = useQuery({
    queryKey: ['doctorAppointments', currentDoctor?.id, selectedDate], // 🎯 এই কি (Key) অনুযায়ী ডাটা ক্যাশ হবে
    queryFn: () => fetchDoctorAppointments(currentDoctor.id, selectedDate),
    enabled: !!currentDoctor?.id, // ডক্টর আইডি থাকলেই কেবল কুয়েরি রান হবে (গার্ড ক্লজ)
    staleTime: 1000 * 60 * 3, // ৩ মিনিট পর্যন্ত ডাটা একদম তাজা থাকবে
    placeholderData: (previousData) => previousData, // ডেট চেঞ্জ করলে স্ক্রিন ঝিলিক (Flash/White) মারবে না
  });

  // ================= ⚡ ২. TANSTACK MUTATION (PATCH REQUEST) =================
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
    onMutate: () => {
      return toast.loading("পেমেন্ট আপডেট করা হচ্ছে...");
    },
    onSuccess: (data, variables, contextToastId) => {
      // 🎉 সাকসেস হলে টোস্ট মেসেজ আপডেট হবে
      toast.success("পেমেন্ট সফলভাবে আপডেট হয়েছে! ✓", { id: contextToastId });
      
      // 🔄 ক্যাশ ইনভ্যালিডেট করে ব্যাকএন্ড থেকে লেটেস্ট ডাটা রি-ফেচ করবে অটোমেটিক
      queryClient.invalidateQueries({ queryKey: ['doctorAppointments', currentDoctor?.id, selectedDate] });
    },
    onError: (error: any, variables, contextToastId) => {
      toast.error(`Error: ${error.message || "নেটওয়ার্ক সমস্যা!"}`, { id: contextToastId });
    }
  });

  // 🔥 পেমেন্ট আপডেট কন্ট্রোলার
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

    // TanStack Mutation ট্রিগার করা হলো
    updatePaymentMutation.mutate({ appointmentId, totalFee });
  };

  // 🛑 সেশন এরর গার্ড
  if (!currentDoctor?.id) {
    return (
      <div className="p-16 text-center text-red-500 font-bold bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto mt-10">
        ⚠️ কোনো বৈধ ডাক্তার অ্যাকাউন্ট সেশন খুঁজে পাওয়া যায়নি। দয়া করে আবার লগইন করুন।
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* টপ বার */}
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
        
        <div className="flex items-center space-x-3 bg-zinc-50 dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <span className="text-xs font-bold text-zinc-500 uppercase px-2">📅 Select Date</span>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs font-semibold bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 focus:outline-none"
          />
        </div>
      </div>

      {/* টেবিল এরিয়া */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Live Patient Queue ({appointments.length})
          </h3>
          <button onClick={() => refetch()} className="text-xs font-bold text-blue-600 hover:underline">
            🔄 Refresh List
          </button>
        </div>

        {isLoading && !appointments.length ? (
          <div className="p-16 text-center text-xs font-medium text-zinc-500">ডাটা লোড হচ্ছে...</div>
        ) : appointments.length === 0 ? (
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
                {appointments.map((app: any) => (
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
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-xl text-[11px] disabled:bg-zinc-400"
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