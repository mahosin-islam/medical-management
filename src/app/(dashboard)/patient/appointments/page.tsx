"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PatientAppointments from "./PatientAppointments";
import Loading from "@/app/loading";


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
    return <Loading/>;
  }

  if (error) {
    return <div className="p-12 text-center text-sm text-red-500">Failed to load appointments.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <PatientAppointments appointments={appointments} />
    </div>
  );
}