"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PatientAppointments from "./PatientAppointments";


export default function PatientAppointmentsPage() {
  
  // এপিআই থেকে ডাটা ফেচ করা
  const { data: appointments = [], isLoading, error } = useQuery({
    queryKey: ["patientAppointments"],
    queryFn: async () => {
      const res = await fetch("/api/patient/appointment");
      const result = await res.json();
      return result.data || [];
    },
  });

  if (isLoading) {
    return <div className="p-12 text-center text-sm text-zinc-500">লোড হচ্ছে...</div>;
  }

  if (error) {
    return <div className="p-12 text-center text-sm text-rose-500">ডাটা লোড করতে সমস্যা হয়েছে!</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* আমরা আগে যে টেবিলটি বানিয়েছিলাম সেটি এখানে কল করা হলো */}
      <PatientAppointments appointments={appointments} />
    </div>
  );
}