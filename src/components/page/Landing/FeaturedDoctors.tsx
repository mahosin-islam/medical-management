import React, { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/mongodb";
import DoctorCardSkeleton from "@/components/Common/DoctorCardSkeleton";
import FeaturedDocsList from "./Doctors";


// 🔄 কার্ড লোডিং স্কেলিটন গ্রিড
function DoctorsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <DoctorCardSkeleton key={i} />
      ))}
    </div>
  );
}

// 📦 ডাটা ফেচিং কম্পোনেন্ট
async function DoctorDataGrid() {
  const rawDocs = await db
    .collection("doctors")
    .find({})
    .limit(6)
    .project({
      name: 1,
      degree: 1,
      specialty: 1,
      specialization: 1,
      image: 1,
      hospital: 1,
      experience: 1,
      "bioDetails.consultationFee": 1,
    })
    .toArray();

  if (!rawDocs || rawDocs.length === 0) {
    return (
      <div className="col-span-full text-center text-xs text-zinc-400 p-12 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
        No doctors found matching your criteria.
      </div>
    );
  }

  // ObjectId Serialization Fix
  const featuredDocs = rawDocs.map((doc:any) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  return <FeaturedDocsList initialDocs={featuredDocs} />;
}

export default function FeaturedDoctors() {
  try {
    return (
      <section className="py-10 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-950/20">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* 🔥 সেকশন হেডার (সবসময় দেখা যাবে) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                Meet Our Experts
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-3 tracking-tight">
                Our Featured Specialists
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 mt-1">
                সেরা অভিজ্ঞ চিকিৎসকদের পরামর্শ নিন ঘরে বসেই।
              </p>
            </div>

            <Link
              href="/doctors"
              className="group text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline bg-white dark:bg-zinc-900 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition"
            >
              See All Doctors
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* 📊 শুধুমাত্র কার্ডের জায়গায় Skeleton দেখাবে */}
          <Suspense fallback={<DoctorsGridSkeleton />}>
            <DoctorDataGrid />
          </Suspense>

        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading featured doctors:", error);
    return null;
  }
}