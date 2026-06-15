import React from 'react';
import Link from 'next/link';
interface DoctorData {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  bioDetails?: {
    clinicAddress?: string;
    consultationFee?: number;
  };
  scheduleConfig?: {
    availableDays?: string[];
    startTime?: string;
    endTime?: string;
    nextMonthsToSchedule?: string[];
  };
}

async function getDoctors(): Promise<DoctorData[]> {
  try {
    // 🎯 আপনার লোকাল বা প্রোডাকশন ইউআরএল অনুযায়ী ফেচ হবে
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/home/doctors`, { 
      cache: "no-store" // প্রতিবার লেটেস্ট ডাটা রিফ্লেক্ট করার জন্য
    });
    
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to load doctors in UI:", error);
    return [];
  }
}

export default async function findDoctor() {
  const doctors = await getDoctors();

  if (doctors.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500">
        আপাতত কোনো ডাক্তারের শিডিউল অ্যাভেইলেবল নেই।
      </div>
    );
  }

  return (
     <div className='mb-10'>
         <section className="py-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl my-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">Our Available Specialists</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">সরাসরি ডাটাবেজ থেকে ভেরিফাইড ডাক্তারদের শিডিউল দেখে অ্যাপয়েন্টমেন্ট বুক করুন।</p>
        </div>

        {/* 🎯 মডার্ন রেসপনসিভ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => {
            const { bioDetails, scheduleConfig } = doctor;
            const openMonths = Array.isArray(scheduleConfig?.nextMonthsToSchedule) ? scheduleConfig.nextMonthsToSchedule : [];

            return (
              <div key={doctor._id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
                <div>
                  {/* ডাক্তারের নাম ও ইমেইল */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {doctor.name ? doctor.name[0] : "D"}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">{doctor.name || "Specialist Doctor"}</h3>
                      <p className="text-xs text-zinc-400">{doctor.email}</p>
                    </div>
                  </div>

                  {/* চেম্বার ও ফি */}
                  <div className="space-y-2 my-4 border-t border-b border-zinc-100 dark:border-zinc-900 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span className="truncate"><strong>Chamber:</strong> {bioDetails?.clinicAddress || "Not Specified"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>💵</span>
                      <span><strong>Fee:</strong> {bioDetails?.consultationFee || 500} BDT</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>⏰</span>
                      <span><strong>Time:</strong> {scheduleConfig?.startTime} - {scheduleConfig?.endTime}</span>
                    </div>
                  </div>

                  {/* সাপ্তাহিক দিনসমূহের ব্যাজ */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-1.5">Available Days:</p>
                    <div className="flex flex-wrap gap-1">
                      {scheduleConfig?.availableDays?.map((day) => (
                        <span key={day} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded text-xs font-medium">
                          {day.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* বুকিং ওপেন থাকা মাসগুলো */}
                  {openMonths.length > 0 && (
                    <div className="mb-4 p-2 bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/30 rounded-lg">
                      <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        🗓️ Booking Open: {openMonths.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* বুকিং অ্যাকশন বাটন */}
                <Link 
  href={`/doctors/${doctor._id}`}
  className="w-full text-center bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 py-2.5 rounded-xl font-semibold text-sm transition mt-4 block"
>
  View Profile & Book
</Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
     </div>
  );
}

