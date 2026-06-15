// src/components/web/MonthPicker.tsx
import React, { useState, useEffect, useRef } from 'react';

interface MonthPickerProps {
  label: string;
  selectedMonths: string[];
  onChange: (months: string[]) => void;
  dynamicMonths: { label: string; value: number }[];
}

export const MonthPicker: React.FC<MonthPickerProps> = ({ label, selectedMonths = [], onChange, dynamicMonths }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleToggleMonth = (monthLabel: string) => {
    const safeSelected = Array.isArray(selectedMonths) ? selectedMonths : [];
    if (safeSelected.includes(monthLabel)) {
      onChange(safeSelected.filter((m) => m !== monthLabel));
    } else {
      onChange([...safeSelected, monthLabel]);
    }
  };

  const safeSelectedMonths = Array.isArray(selectedMonths) ? selectedMonths : [];

  return (
    <div className="relative flex flex-col gap-1 w-full" ref={containerRef}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      
      {/* মেইন বাটন ফিল্ড যেখানে ক্লিক করলে পপআপ খুলবে */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2.5 border rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 cursor-pointer shadow-sm hover:border-zinc-300 transition"
      >
        <span className="text-sm font-medium truncate max-w-[180px]">
          {safeSelectedMonths.length > 0 
            ? safeSelectedMonths.map(m => m.split(' ')[0]).join(', ') 
            : "Select Months"
          }
        </span>
        {/* 📅 ক্যালেন্ডার আইকন */}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 flex-shrink-0">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>

      {/* 🎯 মডার্ন পপআপ মেনু (টাইম পিকারের মতো চমৎকার ডিজাইন) */}
      {isOpen && (
        <div className="absolute left-0 top-[105%] z-50 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-3 w-[260px]">
          <div className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-2 px-1 uppercase tracking-wider">
            Available Months (2026)
          </div>
          
          {/* মাসের গ্রিড লেআউট */}
          <div className="grid grid-cols-1 gap-1">
            {dynamicMonths.map((month) => {
              const isSelected = safeSelectedMonths.includes(month.label);
              return (
                <button
                  key={month.value}
                  type="button"
                  onClick={() => handleToggleMonth(month.label)}
                  className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition ${
                    isSelected 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <span>{month.label}</span>
                  {isSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* ক্লিয়ার বাটন */}
          {safeSelectedMonths.length > 0 && (
            <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-red-500 hover:text-red-600 font-semibold px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20 transition"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};