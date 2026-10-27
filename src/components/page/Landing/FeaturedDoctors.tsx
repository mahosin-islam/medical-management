import React, { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/mongodb";
import DoctorCardSkeleton from "@/components/Common/DoctorCardSkeleton";
import FeaturedDocsList from "./Doctors";

// 🔄 কার্ড লোডিং স্কেলিটন গ্রিড
function DoctorsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
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
      <div className="col-span-full text-center text-xs text-slate-500 p-12 bg-white rounded-2xl border border-slate-200">
        No doctors found matching your criteria.
      </div>
    );
  }

  // ObjectId Serialization Fix
  const featuredDocs = rawDocs.map((doc: any) => ({
    ...doc,
    _id: doc._id.toString(),
  }));

  return <FeaturedDocsList initialDocs={featuredDocs} />;
}

export default function FeaturedDoctors() {
  try {
    return (
      <section className="py-16 md:py-24 bg-[var(--color-background)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 🔥 Clean Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Our Featured Specialists
              </h2>
              <p className="text-sm md:text-base text-slate-500 font-normal">
                Consult with our experienced medical specialists for expert healthcare guidance.
              </p>
            </div>

            <Link
              href="/doctors"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:opacity-80 bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              <span>See All Doctors</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* 📊 Doctor Cards Grid with Suspense */}
          <Suspense fallback={<DoctorsGridSkeleton />}>
            <DoctorDataGrid/>
          </Suspense>

        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading featured doctors:", error);
    return null;
  }
}