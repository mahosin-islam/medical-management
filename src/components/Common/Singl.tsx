import React from 'react';
import Link from "next/link";

export default function Singl({ doc }: any) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex gap-4 hover:shadow-md transition-all duration-200">
      
      {/* 1. Doctor Avatar / Image Box */}
      <div className="w-20 h-28 bg-card  overflow-hidden shrink-0 flex items-center justify-center font-bold text-[var(--color-primary)] text-xl">
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

      {/* 2. Doctor Info Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="text-sm font-bold text-foreground truncate">{doc.name}</h3>
        <p className="text-[11px] text-muted-foreground font-medium truncate">{doc.degree}</p>
        
        {/* Specialization Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {doc.specialization?.map((spec: string, i: number) => (
            <span 
              key={i} 
              className="px-2 py-0.5 bg-[var(--color-accent)] text-[var(--color-primary)] text-[10px] font-semibold rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground truncate pt-1">
          🏥 {doc.hospital || "N/A"}
        </p>

        {/* Footer: Fee & Profile Link */}
        <div className="flex justify-between items-center pt-2.5 border-t border-border mt-2">
          <span className="text-xs font-bold text-foreground">
            ৳ {doc.bioDetails?.consultationFee || 500}
          </span>
          <Link 
            href={`/doctors/${doc._id}`} 
            className="text-[11px] font-bold text-[var(--color-primary)] hover:underline inline-flex items-center gap-1"
          >
            <span>View Profile</span>
            <span>→</span>
          </Link>
        </div>
      </div>
      
    </div>
  );
}