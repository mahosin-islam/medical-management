import React from 'react';
import Link from 'next/link';

// 🎯 ১. ইন্টারফেস পরিবর্তন: Next.js 15+ এ params এখন একটা Promise
interface SingleDoctorProps {
  params: Promise<{
    id: string;
  }>;
}

async function getSingleDoctor(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/home/doctors/${id}`, {
      cache: "no-store"
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return null;
  }
}

export default async function DoctorDetailPage({ params }: SingleDoctorProps) {
  // 🎯 ২. ফিক্স: params কে এখানে await করে আইডি বের করতে হবে
  const resolvedParams = await params;
  const doctor = await getSingleDoctor(resolvedParams.id);

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto my-20 text-center p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-red-500">ডাক্তারের প্রোফাইল পাওয়া যায়নি!</h2>
        <p className="text-zinc-500 text-sm mt-2">অনুগ্রহ করে সঠিক আইডি দিয়ে চেষ্টা করুন।</p>
        <Link href="/" className="mt-4 inline-block text-sm bg-zinc-900 text-white px-4 py-2 rounded-lg">
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const { bioDetails, scheduleConfig } = doctor;
  const openMonths = Array.isArray(scheduleConfig?.nextMonthsToSchedule) ? scheduleConfig.nextMonthsToSchedule : [];

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      {/* 🔙 ব্যাক বাটন */}
      <Link href="/" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-800 transition mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Specialists
      </Link>

      {/* 🚀 মেইন প্রোফাইল কার্ড হেডার */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          {/* বড় প্রোফাইল আইকন */}
          <div className="h-24 w-24 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-3xl shadow-inner border border-blue-100 dark:border-blue-900/30">
            {doctor.name ? doctor.name[0] : "D"}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">{doctor.name || "Specialist Doctor"}</h1>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">Verified Medical Specialist</p>
              </div>
              {/* লাইভ এভেলেবিলিটি ব্যাজ */}
              <span className="mt-2 sm:mt-0 px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 text-xs font-semibold rounded-full self-center sm:self-start border border-emerald-100 dark:border-emerald-900/20">
                ● Accepting Patients
              </span>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 flex items-center justify-center sm:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1.5 text-zinc-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              {doctor.email}
            </p>
          </div>
        </div>
      </div>

      {/* 📊 দুই কলামের বিস্তারিত ইনফরমেশন গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* বাম পাশের বড় কলাম: ক্লিনিক ও চেম্বার ডিটেইলস */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-4 flex items-center">
              <span className="mr-2">🏥</span> Chamber Information
            </h3>
            <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-900">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Chamber Address</p>
                <p className="text-base font-medium text-zinc-800 dark:text-zinc-200">{bioDetails?.clinicAddress || "Address not provided"}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-900">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Consultation Fee</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{bioDetails?.consultationFee || 500} BDT</p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-100 dark:border-zinc-900">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Daily Patient Limit</p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{scheduleConfig?.maxPatients || 20} Max</p>
                </div>
              </div>
            </div>
          </div>

          {/* প্রফেশনাল শিডিউল ও টাইমিং */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-4 flex items-center">
              <span className="mr-2">🕒</span> Availability Schedule
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2.5 border-b border-zinc-100 dark:border-zinc-900">
                <span className="text-sm font-medium text-zinc-500">Visiting Hours</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg">
                  {scheduleConfig?.startTime} - {scheduleConfig?.endTime}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 mb-2">Weekly Available Days</p>
                <div className="flex flex-wrap gap-2">
                  {scheduleConfig?.availableDays?.map((day: string) => (
                    <span key={day} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-semibold">
                      🗓️ {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ডান পাশের ছোট কলাম: বুকিং অ্যাকশন সাইডবার */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-b from-blue-50/50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm sticky top-6 text-center">
            <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 mb-2">Need an Appointment?</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">নিচের বাটনে ক্লিক করে আপনার সুবিধাজনক স্লটটি কনফার্ম করুন।</p>
            
            {openMonths.length > 0 && (
              <div className="mb-4 text-left p-3 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-950/20 rounded-xl">
                <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wide block mb-0.5">Active Months</span>
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{openMonths.join(", ")}</p>
              </div>
            )}

            {/* 🎯 ৩. ফিক্স: params.id এর জায়গায় resolvedParams.id বসবে */}
            <Link 
              href={`/doctors/${resolvedParams.id}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-sm hover:shadow-md block"
            >
              Book Appointment Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}