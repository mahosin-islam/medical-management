import React from 'react'
import Link from "next/link";
function Singl({doc}:any) {
  return (
   <div key={doc._id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex gap-4 hover:shadow-md transition">
            <div className="w-20 h-28 bg-blue-50 dark:bg-blue-950/40 rounded-xl overflow-hidden shrink-0 flex items-center justify-center font-bold text-blue-600 text-xl">
                {doc.image ? (
                    <img
                        src={doc.image}
                        alt={doc.name || "Doctor"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>
                        {doc.name
                            ? doc.name.replace("ডাঃ ", "").replace("Dr. ", "").charAt(0)
                            : "D"}
                    </span>
                )}
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
  )
}

export default Singl