"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

interface ClientProps {
  currentDoctor: {
    id: string;
    name: string;
  };
}

export default function MyPatientsClient({ currentDoctor }: ClientProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // 🔄 ডাটাবেজ থেকে ইউনিক রোগীদের লিস্ট নিয়ে আসা
  const fetchPatients = useCallback(async () => {
    if (!currentDoctor?.id) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/doctor/patients?doctorId=${currentDoctor.id}`);
      const result = await res.json();
      if (result.success) {
        setPatients(result.data || []);
      } else {
        toast.error(result.error || "রোগীদের ডাটা লোড করতে ব্যর্থ হয়েছে");
        setPatients([]);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
      toast.error("নেটওয়ার্ক সমস্যা! আবার চেষ্টা করুন।");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, [currentDoctor?.id]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // 🔍 নাম অথবা ফোন নাম্বার দিয়ে রোগীদের লাইভ ফিল্টার করার লজিক
  const filteredPatients = patients.filter((patient) => {
    const nameMatch = patient.patientName?.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = patient.patientPhone?.includes(searchQuery);
    return nameMatch || phoneMatch;
  });

  // 👁️ রোগীর বিস্তারিত হিস্ট্রি দেখার অ্যালার্ট (ভবিষ্যতে আপনি এখানে ওল্ড প্রেসক্রিপশন দেখাতে পারবেন)
  const handleViewHistory = (patientName: string, totalVisits: number, lastVisit: string) => {
    Swal.fire({
      title: `<span class="text-lg font-bold">${patientName} এর তথ্য</span>`,
      html: `
        <div class="text-left text-sm space-y-2 p-2">
          <p><strong>মোট ভিজিট:</strong> ${totalVisits} বার</p>
          <p><strong>সর্বশেষ ভিজিট:</strong> ${new Date(lastVisit).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'ঠিক আছে',
      confirmButtonColor: '#2563eb',
      background: document.documentElement.classList.contains('dark') ? '#09090b' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#fafafa' : '#18181b',
    });
  };

  if (!currentDoctor?.id) {
    return (
      <div className="p-16 text-center text-red-500 font-bold bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto mt-10">
        ⚠️ কোনো বৈধ ডাক্তার অ্যাকাউন্ট সেশন খুঁজে পাওয়া যায়নি। দয়া করে আবার লগইন করুন।
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* 🔝 টপ বার ও সার্চ বক্স */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm gap-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            My Patients Directory
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">আপনার কাছে চিকিৎসা নেওয়া সকল রোগীদের লাইফটাইম তালিকা ও হিস্ট্রি।</p>
        </div>
        
        {/* 🔍 লাইভ সার্চ ইনপুট */}
        <div className="w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-medium bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 📊 টেবিল এরিয়া */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20">
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Total Unique Patients ({filteredPatients.length})
          </h3>
          <button onClick={fetchPatients} className="text-xs font-bold text-blue-600 hover:underline">
            🔄 Refresh List
          </button>
        </div>

        {loading ? (
          <div className="p-16 text-center text-xs font-medium text-zinc-500">রোগীদের তালিকা লোড হচ্ছে...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-16 text-center text-xs text-zinc-400 font-medium">
            📭 কোনো রোগীর তথ্য খুঁজে পাওয়া যায়নি।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/40 text-[11px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-900">
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-center">Total Visits</th>
                  <th className="p-4">Last Visit</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-zinc-100 dark:divide-zinc-900">
                {filteredPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/20 transition">
                    {/* রোগীর নাম */}
                    <td className="p-4">
                      <div className="font-bold text-zinc-800 dark:text-zinc-200">{patient.patientName}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">ID: {patient._id.substring(0, 8)}...</div>
                    </td>
                    {/* ফোন নম্বর */}
                    <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">
                      📞 {patient.patientPhone}
                    </td>
                    {/* মোট ভিজিট কাউন্ট */}
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {patient.totalVisits} Times
                      </span>
                    </td>
                    {/* সর্বশেষ ভিজিটের ডেট */}
                    <td className="p-4 text-zinc-600 dark:text-zinc-400 font-medium">
                      📅 {patient.lastVisit}
                    </td>
                    {/* অ্যাকশন বাটন */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleViewHistory(patient.patientName, patient.totalVisits, patient.lastVisit)}
                        className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold px-3 py-2 rounded-xl text-[11px] transition border border-zinc-200 dark:border-zinc-800"
                      >
                        👁️ View Summary
                      </button>
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