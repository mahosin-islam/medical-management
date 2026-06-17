import React from 'react';
import Link from 'next/link'; // Next.js মডার্ন লিঙ্কিং এনশিওর করতে
import Image from 'next/image';

interface DoctorData {
  _id: string;
  name?: string;
  email: string;
  specialty?: string;   // 🌟 নতুন রিয়াল ফিল্ড
  degree?: string;      // 🌟 নতুন রিয়াল ফিল্ড
  image?: string;       // 🌟 নতুন রিয়াল ফিল্ড
  experience?: number;  // 🌟 নতুন রিয়াল ফিল্ড
  hospital?: string;    // 🌟 নতুন রিয়াল ফিল্ড
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
    const baseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/home/doctors`, {
      cache: "no-store"
    });

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to load doctors in UI:", error);
    return [];
  }
}

export default async function FindDoctor() {
  const doctors = await getDoctors();

  if (doctors.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500 font-medium">
        আপাতত কোনো ডাক্তারের শিডিউল অ্যাভেইলেবল নেই।
      </div>
    );
  }

  return (
    <div className='mb-10'>
      <section className="py-12 bg-zinc-50/50 dark:bg-zinc-900/40 rounded-3xl my-10 px-4 md:px-8 border border-zinc-200/50 dark:border-zinc-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 dark:text-zinc-50 tracking-tight">
              Our Available Specialists
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
              সরাসরি ডাটাবেজ থেকে ভেরিফাইড ডাক্তারদের শিডিউল ও চেম্বারের তথ্য দেখে অ্যাপয়েন্টমেন্ট বুক করুন।
            </p>
          </div>

          {/* 🎯 মডার্ন প্রিমিয়াম রেসপনসিভ গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => {
              const { bioDetails, scheduleConfig } = doctor;

              return (
                <div
                  key={doctor._id}
                  className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* 🌟 ডক্টর প্রোফাইল হেড (ইমেজ, ভেরিফাইড ব্যাজ ও এক্সপেরিয়েন্স) */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/60 flex-shrink-0 relative">
                        {doctor.image ? (
                          <Image
                            src={doctor.image}
                            alt={doctor.name || "Doctor"}
                            className="w-full h-full object-cover"
                            fill // width/height এর বদলে fill ব্যবহার করা হলো
                            priority
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold text-2xl">
                            {doctor.name ? doctor.name[0] : "D"}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded-full uppercase tracking-wider">
                            Verified
                          </span>
                          {doctor.experience && doctor.experience > 0 ? (
                            <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded">
                              💼 {doctor.experience} Yrs Exp
                            </span>
                          ) : null}
                        </div>
                        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
                          {doctor.name || "Specialist Doctor"}
                        </h3>
                        <p className="text-xs font-semibold text-zinc-500 truncate">
                          {doctor.degree || "MBBS"}
                        </p>
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide truncate">
                          {doctor.specialty || "General Specialist"}
                        </p>
                      </div>
                    </div>

                    {/* 🌟 বর্তমান কর্মস্থল বা মেইন হসপিটাল */}
                    {doctor.hospital && (
                      <div className="mb-3 px-3 py-2 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-100 dark:border-zinc-800/40 flex items-center gap-2">
                        <span className="text-sm">🏥</span>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 truncate font-medium">
                          {doctor.hospital}
                        </p>
                      </div>
                    )}

                    {/* চেম্বার, ফি ও টাইম ইনফো */}
                    <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-900 pt-3 pb-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400">📍</span>
                        <p className="truncate">
                          <strong>Chamber:</strong> {bioDetails?.clinicAddress || "Not Specified"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400">⏰</span>
                        <p>
                          <strong>Time:</strong> {scheduleConfig?.startTime || "N/A"} - {scheduleConfig?.endTime || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* সাপ্তাহিক অ্যাভেইলেবল দিনসমূহ */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {scheduleConfig?.availableDays && scheduleConfig.availableDays.length > 0 ? (
                          scheduleConfig.availableDays.map((day) => (
                            <span
                              key={day}
                              className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-md text-[10px] font-semibold"
                            >
                              {day.substring(0, 3)}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-zinc-400">No days scheduled</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 🌟 বটম সেকশন: ফি এবং অ্যাকশন বাটন */}
                  <div className="border-t border-zinc-100 dark:border-zinc-900 pt-3 mt-2 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Fee</p>
                      <p className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">
                        ৳{bioDetails?.consultationFee || 500}
                      </p>
                    </div>

                    <Link
                      href={`/doctors/${doctor._id}`}
                      className="flex-1 text-center bg-zinc-950 hover:bg-zinc-900 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 py-2.5 rounded-xl font-bold text-xs transition-colors duration-150"
                    >
                      View Profile & Book
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}