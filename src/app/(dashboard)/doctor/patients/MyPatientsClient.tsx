"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from "framer-motion";
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
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="sc-card flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            My Patients
          </h1>
          <p className="text-sm text-muted-foreground mt-1">All patients you&apos;ve treated in one place.</p>
        </div>
        
        <div className="w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm bg-background text-foreground placeholder:text-muted-foreground px-3.5 py-2.5 rounded-2xl border border-border focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="sc-card p-0 overflow-hidden rounded-3xl"
      >
        <div className="p-6 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">
            Patient List <span className="text-muted-foreground font-normal">({filteredPatients.length})</span>
          </h3>
          <button onClick={fetchPatients} className="text-sm text-primary hover:underline">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-16 text-center text-sm text-muted-foreground">Loading patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-16 text-center text-sm text-muted-foreground">
            No patients found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <th className="p-5">Patient</th>
                  <th className="p-5">Contact</th>
                  <th className="p-5 text-center">Total Visits</th>
                  <th className="p-5">Last Visit</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-border/60">
                {filteredPatients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-accent/30 transition-colors">
                    <td className="p-5">
                      <div className="font-medium text-foreground">{patient.patientName}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">ID: {patient._id.substring(0, 8)}...</div>
                    </td>
                    <td className="p-5 text-foreground">{patient.patientPhone}</td>
                    <td className="p-5 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-accent text-accent-foreground">
                        {patient.totalVisits} {patient.totalVisits === 1 ? "visit" : "visits"}
                      </span>
                    </td>
                    <td className="p-5 text-foreground">{patient.lastVisit}</td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => handleViewHistory(patient.patientName, patient.totalVisits, patient.lastVisit)}
                        className="text-sm text-primary hover:underline"
                      >
                        View Summary
                      </button>
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