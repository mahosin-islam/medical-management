import React from "react";
import Link from "next/link";
import { db } from "@/lib/mongodb";

export default async function FeaturedDoctors() {
  try {
    // 🎯 মঙ্গোডিবি থেকে মাত্র ৪ জন ডক্টরের ডাটা তুলে আনা (limit 4)
    const featuredDocs = await db.collection("doctors")
     
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
        "bioDetails.consultationFee": 1
      })
      .toArray();

    if (!featuredDocs || featuredDocs.length === 0) return null;
    
    return (
      <section className="py-10 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-950/20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* 🔥 সেকশন হেডার */}
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

          {/* 📊 প্রিমিয়াম ৪-কলাম গ্রিড লেআউট */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {featuredDocs?.map((doc: any) => (
            <div key={doc._id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex gap-4 hover:shadow-md transition">
              <div className="w-20 h-30 bg-blue-50 dark:bg-blue-950/40 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-blue-600 text-xl">
                {doc.image ? <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" /> : doc.name[0]}
              </div>
              
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">{doc.name}</h3>
                <p className="text-[11px] text-zinc-500 font-medium truncate">{doc.degree}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {doc.specialization?.map((spec: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[10px] font-semibold rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400 truncate pt-1">🏥 {doc.hospital || "N/A"}</p>
                
                <div className="flex justify-between items-center pt-2 border-t border-zinc-100 dark:border-zinc-900 mt-2">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">৳ {doc.bioDetails?.consultationFee || 500}</span>
                  <Link href={`/doctors/${doc._id}`} className="text-[11px] font-bold text-blue-600 hover:underline">
                    View Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {featuredDocs?.length === 0 && (
            <div className="col-span-full text-center text-xs text-zinc-400 p-12 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              No doctors found matching your criteria.
            </div>
          )}
        </div>

        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading featured doctors:", error);
    return null; // কোনো এরর হলে ল্যান্ডিং পেজ ক্রাশ করবে না, জাস্ট সেকশনটা হাইড থাকবে
  }
}