"use client";

import { Wrench, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Prescriptions({ pageName }: { pageName: string }) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 p-4 rounded-3xl border border-amber-100 dark:border-amber-900/50 mb-4 animate-bounce">
        <Wrench className="w-8 h-8" />
      </div>
      
      <h2 className="text-base font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-wider">
        {pageName} Feature
      </h2>
      
      <p className="text-xs text-zinc-500 max-w-sm mt-2 leading-relaxed">
        এই পেজটির কাজ বর্তমানে চলমান রয়েছে।  মূল ফিচারগুলো টেস্ট করার পর খুব শীঘ্রই এটি লাইভ করা হবে।
      </p>

      <button
        onClick={() => router.back()}
        className="mt-6 flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </button>
    </div>
  );
}