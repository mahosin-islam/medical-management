import { ObjectId } from "mongodb";
import BookingWidget from "./BookingWidget";
import { notFound } from "next/navigation";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers"; 

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { id } = await params;

  // আইডি ভ্যালিডেশন চেক
  if (!ObjectId.isValid(id)) {
    return notFound();
  }

  // 🌟 ১. Better-Auth এর নিয়ম অনুযায়ী সার্ভার কম্পোনেন্টে সেশন ফেচ করা
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🌟 ২. সেশন থেকে ডেটা নিয়ে সম্পূর্ণ ডাইনামিক অবজেক্ট তৈরি
  const currentUser = {
    name: session?.user?.name || "",   
    email: session?.user?.email || "", 
  };

  try {
    // ডাটাবেজ থেকে ডক্টরের রিয়াল ডাটা ফেচ করা
    const doctorData = await db.collection("doctors").findOne({ _id: new ObjectId(id) });

    if (!doctorData) {
      return notFound();
    }

    // সব বাফার, অবজেক্টআইডি এবং ডেটকে প্লেইন স্ট্রিং-এ কনভার্ট করা
    const doctor = {
      ...doctorData,
      _id: doctorData._id.toString(),
      userId: doctorData.userId ? doctorData.userId.toString() : "",
      createdAt: doctorData.createdAt ? doctorData.createdAt.toISOString() : null,
      updatedAt: doctorData.updatedAt ? doctorData.updatedAt.toISOString() : null,
      
      experience: Number(doctorData.experience) || 0,
      hospital: doctorData.hospital || "",
      education: Array.isArray(doctorData.education) ? doctorData.education : [],
      specialization: Array.isArray(doctorData.specialization) ? doctorData.specialization : [],
      
      bioDetails: {
        clinicAddress: doctorData.bioDetails?.clinicAddress || doctorData.chamberConfig?.clinicAddress || "Not Provided",
        consultationFee: Number(doctorData.bioDetails?.consultationFee || doctorData.chamberConfig?.consultationFee) || 500,
        chamberPhone: doctorData.bioDetails?.chamberPhone || "N/A",
      },

      scheduleConfig: doctorData.scheduleConfig ? {
        availableDays: doctorData.scheduleConfig.availableDays || [],
        startTime: doctorData.scheduleConfig.startTime || "",
        endTime: doctorData.scheduleConfig.endTime || "",
        nextMonthsToSchedule: doctorData.scheduleConfig.nextMonthsToSchedule || [],
        isClosed: Boolean(doctorData.scheduleConfig.isClosed),
      } : null,

      // ওল্ড কম্পোনেন্ট সেফটি ব্যাকআপ
      chamberConfig: {
        clinicAddress: doctorData.bioDetails?.clinicAddress || doctorData.chamberConfig?.clinicAddress || "N/A",
        consultationFee: Number(doctorData.bioDetails?.consultationFee || doctorData.chamberConfig?.consultationFee) || 500,
      }
    };

    const formattedDays = doctor.scheduleConfig?.availableDays?.join(", ") || "No Scheduled Days";

    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 bg-[var(--color-background)] min-h-screen transition-colors duration-300">
        {/* টপ প্রিমিয়াম ডক্টর প্রোফাইল ব্যানার */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex-shrink-0">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-3xl">
                {doctor.name ? doctor.name[0] : "D"}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold rounded-full uppercase tracking-wider border border-[var(--color-primary)]/20">
              ★ Verified Specialist
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{doctor.name}</h1>
            <p className="text-sm md:text-base font-semibold text-slate-500">{doctor.degree}</p>
            <p className="text-base font-bold text-[var(--color-primary)] uppercase tracking-wide">{doctor.specialty}</p>
            
            <div className="flex items-center justify-center md:justify-start gap-4 pt-1 text-xs font-medium text-slate-600 dark:text-zinc-400">
              <div className="flex items-center gap-1">
                <span className="text-amber-500 text-sm">★</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100">4.9</span> (Verified)
              </div>
              <div className="h-3 w-px bg-slate-200 dark:bg-zinc-800" />
              <div>💼 <span className="font-bold text-slate-900 dark:text-zinc-100">{doctor.experience}+ Years</span> Experience</div>
            </div>
          </div>
        </div>

        {/* মেইন লেআউট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            
            {/* ১. কারেন্ট হসপিটাল ও চেম্বার কন্টাক্ট */}
            <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">Chamber & Location</h2>
              <div className="space-y-3.5 text-sm">
                {doctor.hospital && (
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-base">🏥</span>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-zinc-200">Current Hospital</h4>
                      <p className="text-slate-600 dark:text-zinc-400 mt-0.5">{doctor.hospital}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <span className="text-slate-400 text-base">📍</span>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-zinc-200">Chamber Address</h4>
                    <p className="text-slate-600 dark:text-zinc-400 mt-0.5">{doctor.bioDetails.clinicAddress}</p>
                  </div>
                </div>
                {doctor.scheduleConfig && (
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-base">🕒</span>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-zinc-200">Visiting Hours</h4>
                      <p className="text-slate-600 dark:text-zinc-400 mt-0.5 capitalize">
                        {formattedDays} ({doctor.scheduleConfig.startTime} - {doctor.scheduleConfig.endTime})
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <span className="text-slate-400 text-base">📞</span>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-zinc-200">Chamber Contact</h4>
                    <p className="text-slate-600 dark:text-zinc-400 mt-0.5">{doctor.bioDetails.chamberPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ২. শিক্ষাগত যোগ্যতা (Education) */}
            {doctor.education.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">Education & Background</h2>
                <ul className="space-y-2.5 text-sm text-slate-600 dark:text-zinc-400">
                  {doctor.education.map((edu: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)] mt-0.5">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ৩. স্পেশালাইজেশন (Specializations) */}
            {doctor.specialization.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-zinc-800 pb-3">Specialization & Expertise</h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {doctor.specialization.map((spec: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-700">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ডান পাশের কলামে বুকিং উইজেট */}
          <div className="md:col-span-1">
            <div className="sticky top-6">
              <BookingWidget doctor={doctor as any} currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching doctor details:", error);
    return notFound();
  }
}