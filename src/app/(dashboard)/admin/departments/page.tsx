import React from 'react'

function DepartMents() {
  return (
  <div className="p-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 max-w-lg text-center shadow-sm space-y-4">
      
      {/* এনিমেটেড বা সুন্দর আইকন */}
      <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold animate-pulse">
        ⚙️
      </div>
      
      {/* টেক্সট মেসেজ */}
      <div className="space-y-1.5">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
          Feature Under Construction
        </h2>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto leading-relaxed">
          আমরা এই পেজের ব্যাকএন্ড ফাংশনালিটি আরও নিখুঁত করার জন্য কাজ করছি। খুব শীঘ্রই আপনার রোগীদের লাইফটাইম ডিরেক্টরি ও মেডিকেল সামারি এখানে লাইভ দেখতে পাবেন!
        </p>
      </div>

      {/* রিল্যাক্সিং প্রোগ্রেস বার (লুকস প্রফেশনাল) */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-1.5 rounded-full overflow-hidden">
        <div className="bg-blue-600 h-full w-2/3 rounded-full animate-infinite"></div>
      </div>

      {/* ব্যাক বাটন */}
      <div className="pt-2">
        <button 
         
          className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition"
        >
          ← Go Back
        </button>
      </div>

    </div>
  </div>
);
}

export default DepartMents