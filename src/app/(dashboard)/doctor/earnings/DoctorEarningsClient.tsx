"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import toast from "react-hot-toast";

interface EarningsProps {
  currentDoctor: {
    id: string;
    name: string;
  };
}

export default function DoctorEarningsClient({ currentDoctor }: EarningsProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<string>(""); // সিলেক্টেড মাস স্টেট

  const fetchEarningsData = useCallback(async () => {
    setLoading(true);
    try {
      // ডক্টর আইডি এবং সিলেক্টেড মাস কুয়েরি প্যারামিটার হিসেবে পাঠানো হচ্ছে
      let url = `/api/doctor/earnings?doctorId=${currentDoctor.id}`;
      if (selectedMonth) {
        url += `&month=${encodeURIComponent(selectedMonth)}`;
      }

      const res = await fetch(url, { cache: "no-store" });
      const result = await res.json();
      if (result.success) {
        setStats(result.data);
        // প্রথমবার লোড হওয়ার সময় যদি ডিফল্ট কোনো মাস সিলেক্ট না থাকে, তবে প্রথম এভেলেবল মাসটি সেট করা
        if (!selectedMonth && result.data.availableMonths?.length > 0) {
          // কারেন্ট মাস ডাটাবেজে থাকলে সেটা দেখাবে, নয়তো একদম লেটেস্ট মাস
          setSelectedMonth(result.data.availableMonths[result.data.availableMonths.length - 1]);
        }
      }
    } catch (error) {
      toast.error("আর্নিংস ডাটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }, [currentDoctor.id, selectedMonth]);

  useEffect(() => {
    fetchEarningsData();
  }, [fetchEarningsData]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 📅 হেডার এবং মাস সিলেক্ট করার ড্রপডাউন ফিল্টার */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Earnings Dashboard</h1>
          <p className="text-[11px] text-zinc-500">স্বাগতম ডঃ {currentDoctor.name}! আপনার আয়ের হিসাব পর্যবেক্ষণ করুন।</p>
        </div>
        
        {/* 📊 মাস ফিল্টার ড্রপডাউন */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-zinc-500">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs bg-zinc-50 dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer"
          >
            {stats?.availableMonths?.map((m: string, idx: number) => (
              <option key={idx} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-xs text-zinc-500">ফিল্টার করা ডাটা লোড হচ্ছে...</div>
      ) : (
        <>
          {/* 💸 ওপরে সামারি কার্ড */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Earnings ({selectedMonth})</p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">৳ {stats?.totalEarnings || 0}</h2>
              <p className="text-[11px] text-emerald-600 mt-2">৳ এই মাসে আপনার মোট অর্জিত আয়</p>
            </div>

            <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Paid Patients ({selectedMonth})</p>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{stats?.totalPatients || 0} জন</h2>
              <p className="text-[11px] text-blue-600 mt-2">এই মাসে সফলভাবে পেমেন্ট করা রোগী</p>
            </div>
          </div>

          {/* 📊 তারিখ ভিত্তিক ডেইলি ইনকাম চার্ট */}
          <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Daily Revenue Breakdown</h3>
              <p className="text-[11px] text-zinc-500">{selectedMonth} মাসের তারিখ ভিত্তিক আয়ের গ্রাফ</p>
            </div>
            <div className="w-full h-64 text-xs">
              {stats?.chartData?.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" className="dark:stroke-zinc-800" />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="Amount" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-400">এই মাসে কোনো ট্রানজেকশন ডাটা নেই</div>
              )}
            </div>
          </div>

          {/* 📑 সিলেক্টেড মাসের লেনদেনের টেবিল */}
          <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Month Transactions</h3>
              <p className="text-[11px] text-zinc-500">{selectedMonth} মাসের সকল পেমেন্টের বিবরণ</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-900 text-zinc-500 font-medium">
                  <tr>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900 text-zinc-700 dark:text-zinc-300">
                  {stats?.recentTransactions?.length > 0 ? (
                    stats.recentTransactions.map((tx: any) => (
                      <tr key={tx._id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition">
                        <td className="p-4">
                          <div className="font-bold text-zinc-800 dark:text-zinc-200">{tx.patientName}</div>
                          <div className="text-[10px] text-zinc-400">{tx.patientEmail}</div>
                        </td>
                        <td className="p-4 text-zinc-500">{tx.date}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${tx.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'}`}>
                            {tx.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-zinc-900 dark:text-zinc-100">৳ {tx.paidAmount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-zinc-400">এই মাসে কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি।</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}