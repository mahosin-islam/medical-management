import React from "react";
import Link from "next/link";
import { db } from "@/lib/mongodb";

export default async function FeaturedDoctors() {
  try {
    // 🎯 মঙ্গোডিবি থেকে মাত্র ৪ জন ডক্টরের ডাটা তুলে আনা (limit 4)
    const featuredDocs = await db.collection("doctors")
      .find({})
      .limit(4)
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
      <section className="py-16 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-950/20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* 🔥 সেকশন হেডার */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDocs.map((doc: any) => (
              <div 
                key={doc._id.toString()} 
                className="group bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                {/* ইমেজ সেকশন উইথ গ্রেডিয়েন্ট ওভারলে */}
                <div className="relative h-56 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                  {doc.image ? (
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 dark:from-zinc-900 dark:to-zinc-800 font-black text-4xl">
                      {doc.name ? doc.name[0] : "D"}
                    </div>
                  )}
                  {/* ব্যাজ */}
                  <span className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-[10px] font-bold text-zinc-800 dark:text-zinc-200 px-2.5 py-1 rounded-xl shadow-sm border border-zinc-200/40 dark:border-zinc-800">
                    ★ 4.9 Verified
                  </span>
                </div>

                {/* কন্টেন্ট বডি */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {doc.specialty || "General Physician"}
                    </p>
                    <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 font-medium">
                      {doc.degree}
                    </p>
                    
                    {/* মঙ্গোডিবি অ্যারে থেকে স্পেশালাইজেশন ট্যাগ */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {doc.specialization?.slice(0, 2).map((spec: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-[9px] font-bold rounded-md border border-zinc-100 dark:border-zinc-800/60">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* হসপিটাল এবং ফি বিবরণ */}
                  <div className="pt-3 border-t border-zinc-100 dark:divide-zinc-900 dark:border-zinc-900/60 flex flex-col gap-2">
                    <p className="text-[11px] text-zinc-400 line-clamp-1 flex items-center gap-1">
                      🏢 <span className="truncate">{doc.hospital || "Chamber Consultation"}</span>
                    </p>
                    
                    <div className="flex justify-between items-center pt-1">
                      <div>
                        <p className="text-[9px] text-zinc-400 font-medium">Visiting Fee</p>
                        <p className="text-xs font-black text-zinc-900 dark:text-zinc-50">৳ {doc.bioDetails?.consultationFee || 500}</p>
                      </div>
                      
                      <Link 
                        href={`/doctors/${doc._id.toString()}`}
                        className="text-[11px] bg-zinc-900 hover:bg-blue-600 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-600 dark:hover:text-white px-3 py-1.5 font-bold rounded-xl shadow-sm transition-colors duration-200"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading featured doctors:", error);
    return null; // কোনো এরর হলে ল্যান্ডিং পেজ ক্রাশ করবে না, জাস্ট সেকশনটা হাইড থাকবে
  }
}