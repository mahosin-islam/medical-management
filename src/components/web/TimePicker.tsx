// src/components/TimePicker.tsx
import React, { useState, useEffect, useRef } from 'react';

interface TimePickerProps {
  label: string;
  value: string; // "10:30 PM" ফরম্যাটে ডাটা হ্যান্ডেল হবে
  onChange: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("PM");
  const containerRef = useRef<HTMLDivElement>(null);

  // ডাটাবেজ থেকে ডাটা আসলে তা ভেঙে পপআপে সিঙ্ক করা
  useEffect(() => {
    if (value && value.includes(":") && value.includes(" ")) {
      const [time, p] = value.split(" ");
      const [h, m] = time.split(":");
      setHour(h);
      setMinute(m);
      setPeriod(p);
    }
  }, [value]);

  // পপআপের বাইরে ক্লিক করলে যেন পপআপ বন্ধ হয়ে যায়
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (h: string, m: string, p: string) => {
    onChange(`${h}:${m} ${p}`);
  };

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  // মিনিটের লিস্ট (আপনার স্ক্রিনশটের মতো ০0 থেকে ৫৯ পর্যন্ত জেনারেট করা হলো)
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="relative flex flex-col gap-1 w-full" ref={containerRef}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      
      {/* মেইন ইনপুট ফিল্ড যেখানে ক্লিক করলে পপআপ খুলবে */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 cursor-pointer shadow-sm hover:border-zinc-300"
      >
        <span className="font-medium">{value || "Select Time"}</span>
        {/* 🕒 ঘড়ির আইকন (Lucide Icon এর মতো SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>

      {/* 🎯 পপআপ মেনু (আপনার স্ক্রিনশটের হুবহু ডিজাইন) */}
      {isOpen && (
        <div className="absolute left-0 top-[105%] z-50 flex bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-2 w-[240px] h-[260px]">
          
          {/* Hour কলাম */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin flex flex-col gap-1">
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => { setHour(h); handleSelect(h, minute, period); }}
                className={`py-1.5 text-sm font-medium rounded transition ${hour === h ? 'bg-blue-600 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}`}
              >
                {h}
              </button>
            ))}
          </div>

          <div className="w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

          {/* Minute কলাম */}
          <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin flex flex-col gap-1">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMinute(m); handleSelect(hour, m, period); }}
                className={`py-1.5 text-sm font-medium rounded transition ${minute === m ? 'bg-blue-600 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1"></div>

          {/* AM/PM কলাম */}
          <div className="w-[60px] flex flex-col gap-1">
            {["AM", "PM"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => { setPeriod(p); handleSelect(hour, minute, p); }}
                className={`py-2 text-sm font-bold rounded transition ${period === p ? 'bg-blue-600 text-white' : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200'}`}
              >
                {p}
              </button>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};