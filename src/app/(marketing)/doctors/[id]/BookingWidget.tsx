"use client";

import React, { useState } from 'react';

interface BookingWidgetProps {
  doctor: {
    _id: string;
    name: string;
    chamberConfig: {
      clinicAddress: string;
      consultationFee: number;
    };
    scheduleConfig: {
      availableDays: string[];
      startTime: string;
      endTime: string;
      maxPatients: number;
    };
    bookedSchedules?: {
      [month: string]: {
        [date: string]: {
          day: string;
          serials: number[];
          patientDetails: any[];
        };
      };
    };
  };
}

export default function BookingWidget({ doctor }: BookingWidgetProps) {
  if (!doctor || !doctor.scheduleConfig || !doctor.scheduleConfig.availableDays || doctor.scheduleConfig.availableDays.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-sm font-bold text-red-500 mb-2">Booking Unavailable</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">এই ডাক্তারের কোনো অ্যাক্টিভ শিডিউল সেট করা নেই।</p>
      </div>
    );
  }

  const { _id: doctorId, scheduleConfig, chamberConfig } = doctor;
  
  const [isBookingStarted, setIsBookingStarted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [consultationType] = useState<string>("Face to Face");
  const [appointmentType, setAppointmentType] = useState<string>("New Patient");
  
  const [selectedDateStr, setSelectedDateStr] = useState<string>(""); 
  const [selectedSerial, setSelectedSerial] = useState<number | null>(null);
  
  const [currentMonthKey, setCurrentMonthKey] = useState<string>(""); 
  const [selectedDayName, setSelectedDayName] = useState<string>("");  
  const [bookedSerials, setBookedSerials] = useState<number[]>([]);

  const patientData = { name: "Salma", email: "salma@gmail.com" };
  
  // 🎯 হার্ডকোডেড তারিখ পরিবর্তন করে ডাইনামিক করা হলো
  const today = new Date(); 
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  const isDayAvailable = (date: Date) => {
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const compareToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (compareDate < compareToday) return false;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return scheduleConfig.availableDays.includes(daysOfWeek[date.getDay()]);
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let d = 1; d <= totalDaysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (!isDayAvailable(date)) return;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const dateKey = `${yyyy}-${mm}-${dd}`; 
    
    const monthKey = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayKey = daysOfWeek[date.getDay()];

    setSelectedDateStr(dateKey);
    setCurrentMonthKey(monthKey); 
    setSelectedDayName(dayKey);   
    setSelectedSerial(null); 
    setShowCalendar(false);

    const existingBookings = doctor?.bookedSchedules?.[monthKey]?.[dateKey]?.serials || [];
    setBookedSerials(existingBookings);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDateStr || !selectedSerial || !selectedLocation) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          monthStr: currentMonthKey, 
          dateStr: selectedDateStr,  
          dayName: selectedDayName,   
          serialNumber: selectedSerial,
          patientName: patientData.name,
          patientEmail: patientData.email,
          location: selectedLocation,
          consultationType,
          appointmentType,
          fee: chamberConfig.consultationFee
        })
      });

      if (response.ok) {
        setBookingSuccess(true);
        setBookedSerials((prev) => [...prev, selectedSerial]);
      } else {
        alert("Booking failed! This slot might have just been taken.");
      }
    } catch (error) {
      alert("Network error!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl">✓</div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Appointment Requested!</h3>
        <p className="text-xs text-zinc-500 mt-2">পেশেন্ট <span className="font-semibold text-zinc-800 dark:text-zinc-200">{patientData.name}</span> এর জন্য ডেট {selectedDateStr}-এ সিরিয়াল <span className="font-bold text-blue-600">#{selectedSerial}</span> কনফার্ম হয়েছে।</p>
        <button onClick={() => { setIsBookingStarted(false); setBookingSuccess(false); setSelectedDateStr(""); setSelectedSerial(null); }} className="mt-4 w-full bg-zinc-900 text-white text-xs font-semibold py-2 rounded-xl">Done</button>
      </div>
    );
  }

  if (!isBookingStarted) {
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">Need an Appointment?</h3>
        <p className="text-xs text-zinc-500 mb-5 leading-relaxed">নিচের বাটনে ক্লিক করে আপনার সুবিধাজনক স্লটটি কনফার্ম করুন</p>
        <button onClick={() => setIsBookingStarted(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm">Book Appointment Now</button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm text-left">
      <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-3 mb-4">
        <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Select Location & Slot</h3>
        <button onClick={() => setIsBookingStarted(false)} className="text-xs text-zinc-400 hover:text-zinc-600 font-medium">Cancel</button>
      </div>

      {/* 📍 লোকেশন */}
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Select a Location</label>
        <div 
          onClick={() => setSelectedLocation(chamberConfig.clinicAddress)}
          className={`p-3.5 border rounded-xl cursor-pointer transition flex items-start space-x-3 ${selectedLocation ? 'border-blue-500 bg-blue-50/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'}`}
        >
          <div className={`h-4 w-4 rounded-full border flex items-center justify-center mt-0.5 ${selectedLocation ? 'border-blue-600 bg-blue-600 text-white' : 'border-zinc-300'}`}>
            {selectedLocation && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Chamber / Clinic</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">{chamberConfig.clinicAddress}</p>
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-5 space-y-4 pt-4 border-t border-dashed border-zinc-200 dark:border-zinc-800">
          
          {/* কন্সাল্টেশন টাইপ */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Select Consultation Type</label>
            <button type="button" className="px-4 py-1.5 text-xs font-semibold rounded-full border bg-blue-50 dark:bg-blue-950/30 border-blue-600 text-blue-600">Face to Face</button>
          </div>

          {/* অ্যাপয়েন্টমেন্ট টাইপ */}
          <div>
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Appointment Type</label>
            <div className="flex gap-2">
              {["New Patient", "Follow Up", "Report Show"].map((type) => (
                <button key={type} type="button" onClick={() => setAppointmentType(type)} className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition ${appointmentType === type ? "bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 border-transparent shadow-sm" : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50"}`}>{type}</button>
              ))}
            </div>
          </div>

          {/* 📅 ক্যালেন্ডার ডেট সিলেকশন */}
          <div className="relative">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Select an Available Time</label>
            <div onClick={() => setShowCalendar(!showCalendar)} className="w-full border border-zinc-200 dark:border-zinc-800 rounded-xl p-2.5 flex justify-between items-center cursor-pointer bg-zinc-50 dark:bg-zinc-900 shadow-sm">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{selectedDateStr || "Choose Date (yyyy-mm-dd)"}</span>
              <span className="text-zinc-400 text-xs">📅</span>
            </div>

            {showCalendar && (
              <div className="absolute left-0 bottom-full mb-2 z-50 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <div className="flex space-x-1">
                    <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">←</button>
                    <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">→</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-zinc-400">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {generateCalendarDays().map((date, idx) => {
                    if (!date) return <div key={idx} />;
                    const isAvailable = isDayAvailable(date);
                    const isSelected = selectedDateStr === `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

                    return (
                      <button
                        key={idx} type="button" disabled={!isAvailable} onClick={() => handleDateSelect(date)}
                        className={`h-7 text-[11px] font-semibold rounded-md flex items-center justify-center transition ${isSelected ? "bg-blue-600 text-white" : isAvailable ? "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50" : "text-zinc-300 dark:text-zinc-700 cursor-not-allowed text-opacity-50"}`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 🎯 ডাইনামিক ডেট-ভিত্তিক সিরিয়াল স্লট গ্রিড */}
          {selectedDateStr && (
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Available Serial Slots</label>
              
              <div className="grid grid-cols-5 gap-1.5 max-h-28 overflow-y-auto border border-zinc-100 dark:border-zinc-900 rounded-xl p-2 bg-zinc-50/50">
                {Array.from({ length: scheduleConfig?.maxPatients || 20 }, (_, i) => i + 1).map((serial) => {
                  const isBooked = bookedSerials.includes(serial);

                  return (
                    <button
                      key={serial}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSerial(serial)}
                      className={`p-1.5 text-[10px] font-bold rounded-lg border text-center transition ${
                        isBooked 
                          ? "bg-zinc-200 text-zinc-400 border-transparent cursor-not-allowed line-through dark:bg-zinc-900 dark:text-zinc-600" 
                          : selectedSerial === serial 
                            ? "bg-blue-600 text-white border-transparent shadow-sm" 
                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      #{serial}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ফাইনাল সাবমিট বাটন */}
          <button
            type="button"
            disabled={!selectedDateStr || !selectedSerial || isSubmitting}
            onClick={handleConfirmBooking}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow-sm ${
              selectedDateStr && selectedSerial && !isSubmitting
                ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" 
                : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Processing..." : "Confirm Appointment"}
          </button>
        </div>
      )}
    </div>
  );
}