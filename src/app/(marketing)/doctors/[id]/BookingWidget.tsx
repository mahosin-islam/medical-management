"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BookingWidgetProps {
  doctor: {
    _id: string;
    name: string;
    phone?: string; 
    bioDetails?: { clinicAddress?: string; consultationFee?: number; chamberPhone?: string; };
    chamberConfig?: { clinicAddress: string; consultationFee: number; chamberPhone?: string; };
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
  currentUser: {
    name: string;
    email: string;
  } | null; 
}

export default function BookingWidget({ doctor, currentUser }: BookingWidgetProps) {
  const pathname = usePathname();

  const clinicAddress = doctor?.bioDetails?.clinicAddress || doctor?.chamberConfig?.clinicAddress || "N/A";
  const consultationFee = Number(doctor?.bioDetails?.consultationFee || doctor?.chamberConfig?.consultationFee) || 500;
  const doctorPhone = doctor?.bioDetails?.chamberPhone || doctor?.chamberConfig?.chamberPhone || doctor?.phone || "N/A";
  
  const minRequiredFee = consultationFee / 2; 

  const { _id: doctorId, scheduleConfig } = doctor || {};
  
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
  const [patientPhone, setPatientPhone] = useState<string>("");

  const [paidAmountInput, setPaidAmountInput] = useState<number>(minRequiredFee);
  const [paymentError, setPaymentError] = useState<string>("");

  const today = new Date(); 
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  if (!currentUser || !currentUser.email) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-sm space-y-4">
        <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto text-xl font-bold">
          🔒
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Appointment Booking</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            অ্যাপয়েন্টমেন্ট নিশ্চিত করতে এবং ডাক্তারের সাথে সিরিয়াল নিতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-950 p-3 rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs font-semibold text-slate-600 dark:text-zinc-300">
          Consultation Fee: <span className="text-[var(--color-primary)] font-bold">৳ {consultationFee}</span>
        </div>

        <Link
          href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
          className="w-full inline-flex items-center justify-center bg-[var(--color-primary)] hover:opacity-90 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
        >
          Login to Book Appointment
        </Link>
      </div>
    );
  }

  if (!doctor || !scheduleConfig || !scheduleConfig.availableDays || scheduleConfig.availableDays.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-sm">
        <h3 className="text-sm font-bold text-red-500 mb-2">Booking Unavailable</h3>
        <p className="text-xs text-slate-500 leading-relaxed">এই ডাক্তারের কোনো অ্যাক্টিভ শিডিউল সেট করা নেই।</p>
      </div>
    );
  }

  const isValidBDPhone = (phone: string) => {
    const phoneRegex = /^01[3-9]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = 
    selectedDateStr && 
    selectedSerial && 
    isValidBDPhone(patientPhone) && 
    paidAmountInput >= minRequiredFee && 
    paidAmountInput <= consultationFee && 
    !isSubmitting;

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

  const handlePaymentChange = (value: number) => {
    setPaidAmountInput(value);
    if (value < minRequiredFee) {
      setPaymentError(`Minimum advance payment is 50% (${minRequiredFee} Tk)`);
    } else if (value > consultationFee) {
      setPaymentError(`Payment cannot exceed the total fee (${consultationFee} Tk)`);
    } else {
      setPaymentError("");
    }
  };

  const handleConfirmBooking = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId,
          doctorName: doctor.name,            
          doctorPhone: doctorPhone,            
          monthStr: currentMonthKey, 
          dateStr: selectedDateStr,  
          dayName: selectedDayName,   
          serialNumber: selectedSerial,
          patientName: currentUser.name, 
          patientEmail: currentUser.email, 
          patientPhone: patientPhone, 
          location: selectedLocation,
          consultationType,
          appointmentType,
          totalFee: consultationFee,           
          paidAmountInput: paidAmountInput,   
        })
      });

      if (response.ok) {
        setBookingSuccess(true);
        setBookedSerials((prev) => [...prev, selectedSerial!]);
      } else {
        const errData = await response.json();
        alert(errData.error || "Booking failed! This slot might have just been taken.");
      }
    } catch (error) {
      alert("Network error!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    const finalStatus = (consultationFee - paidAmountInput) === 0 ? "Completed" : "Pending";

    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-sm">
        <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">✓</div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appointment Requested!</h3>
        <p className="text-xs text-slate-500 mt-2">পেশেন্ট <span className="font-semibold text-slate-800 dark:text-zinc-200">{currentUser.name}</span> এর জন্য ডেট {selectedDateStr}-এ সিরিয়াল <span className="font-bold text-[var(--color-primary)]">#{selectedSerial}</span> কনফার্ম হয়েছে।</p>
        
        <div className="mt-3 flex justify-center gap-2">
          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg ${finalStatus === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
            Status: {finalStatus}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-950 text-xs p-3 rounded-2xl mt-3 text-slate-600 dark:text-zinc-400 font-medium border border-slate-200 dark:border-zinc-800">
          Paid Advance: <span className="text-emerald-600 font-bold">{paidAmountInput} Tk</span> | Due Balance: <span className="text-rose-500 font-bold">{consultationFee - paidAmountInput} Tk</span>
        </div>
        <button onClick={() => { setIsBookingStarted(false); setBookingSuccess(false); setSelectedDateStr(""); setSelectedSerial(null); setPatientPhone(""); setPaidAmountInput(minRequiredFee); setPaymentError(""); }} className="mt-4 w-full bg-[var(--color-primary)] text-white text-xs font-bold py-2.5 rounded-2xl cursor-pointer shadow-sm">Done</button>
      </div>
    );
  }

  if (!isBookingStarted) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 text-center shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Need an Appointment?</h3>
        <p className="text-xs text-slate-500 mb-3 leading-relaxed">Hi <span className="font-semibold text-slate-800 dark:text-zinc-200">{currentUser.name}</span>, নিচের বাটনে ক্লিক করে আপনার স্লটটি কনফার্ম করুন</p>
        <p className="text-xs font-bold text-slate-400 mb-5 uppercase tracking-wider">Consultation Fee: {consultationFee} Tk</p>
        <button onClick={() => setIsBookingStarted(true)} className="w-full bg-[var(--color-primary)] hover:opacity-90 text-white font-bold py-3 px-4 rounded-2xl text-sm transition shadow-sm cursor-pointer">Book Appointment Now</button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-3">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold text-slate-800 dark:text-zinc-200 uppercase tracking-wider">Select Location & Slot</h3>
          <span className="text-xs font-bold text-[var(--color-primary)] mt-0.5">Fee: {consultationFee} Tk</span>
        </div>
        <button onClick={() => setIsBookingStarted(false)} className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer">Cancel</button>
      </div>

      {/* 👤 লগইনড ইউজার ইনফো প্রোফাইল */}
      <div className="bg-slate-50 dark:bg-zinc-950 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 flex items-center gap-3">
        <div className="h-8 w-8 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-xs uppercase">
          {currentUser.name ? currentUser.name[0] : "U"}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">{currentUser.name}</h4>
          <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
        </div>
        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-lg border border-emerald-200/50 flex-shrink-0 uppercase">Account</span>
      </div>

      {/* 📞 মোবাইল নম্বর ইনপুট */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Contact Mobile Number <span className="text-red-500">*</span>
        </label>
        <input 
          type="tel"
          maxLength={11}
          placeholder="e.g. 01712345678"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, ''))}
          className={`w-full text-xs border rounded-2xl p-3 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 focus:outline-none transition font-medium ${
            patientPhone.length > 0 && !isValidBDPhone(patientPhone)
              ? "border-red-500" 
              : "border-slate-200 dark:border-zinc-800 focus:border-[var(--color-primary)]"
          }`}
        />
        {patientPhone.length > 0 && !isValidBDPhone(patientPhone) && (
          <p className="text-[10px] text-red-500 font-semibold">দয়া করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।</p>
        )}
      </div>

      {/* 📍 লোকেশন */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Select a Location</label>
        <div 
          onClick={() => setSelectedLocation(clinicAddress)}
          className={`p-4 border rounded-2xl cursor-pointer transition flex items-start space-x-3 ${selectedLocation ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-slate-200 dark:border-zinc-800 hover:border-slate-300'}`}
        >
          <div className={`h-4 w-4 rounded-full border flex items-center justify-center mt-0.5 ${selectedLocation ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white' : 'border-slate-300'}`}>
            {selectedLocation && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">Chamber / Clinic</h4>
            <p className="text-xs text-slate-500 mt-0.5">{clinicAddress}</p>
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-3 space-y-4 pt-4 border-t border-dashed border-slate-200 dark:border-zinc-800">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Type</label>
              <button type="button" className="w-full text-center py-2 text-xs font-bold rounded-xl border bg-[var(--color-primary)]/10 border-[var(--color-primary)] text-[var(--color-primary)]">Face to Face</button>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Category</label>
              <select 
                value={appointmentType} 
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 p-2 bg-slate-50 dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 focus:outline-none"
              >
                {["New Patient", "Follow Up", "Report Show"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select an Available Time</label>
            <div onClick={() => setShowCalendar(!showCalendar)} className="w-full border border-slate-200 dark:border-zinc-800 rounded-2xl p-3 flex justify-between items-center cursor-pointer bg-slate-50 dark:bg-zinc-950 shadow-sm">
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">{selectedDateStr || "Choose Date (yyyy-mm-dd)"}</span>
              <span className="text-slate-400 text-xs">📅</span>
            </div>

            {showCalendar && (
              <div className="absolute left-0 bottom-full mb-2 z-50 w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 shadow-xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <div className="flex space-x-1">
                    <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-xs px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg font-bold cursor-pointer">←</button>
                    <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-xs px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg font-bold cursor-pointer">→</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-bold text-slate-400 uppercase">
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
                        className={`h-8 text-xs font-bold rounded-xl flex items-center justify-center transition cursor-pointer ${isSelected ? "bg-[var(--color-primary)] text-white shadow-sm" : isAvailable ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20" : "text-slate-300 dark:text-zinc-700 cursor-not-allowed opacity-50"}`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {selectedDateStr && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Available Serial Slots</label>
              <div className="grid grid-cols-5 gap-1.5 max-h-28 overflow-y-auto border border-slate-200 dark:border-zinc-800 rounded-2xl p-2.5 bg-slate-50/50 dark:bg-zinc-950">
                {Array.from({ length: scheduleConfig?.maxPatients || 20 }, (_, i) => i + 1).map((serial) => {
                  const isBooked = bookedSerials.includes(serial);
                  return (
                    <button
                      key={serial}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSerial(serial)}
                      className={`p-2 text-xs font-bold rounded-xl border text-center transition cursor-pointer ${
                        isBooked 
                          ? "bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 border-transparent cursor-not-allowed line-through" 
                          : selectedSerial === serial 
                            ? "bg-[var(--color-primary)] text-white border-transparent shadow-sm" 
                            : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-slate-400"
                      }`}
                    >
                      #{serial}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 💸 পেমেন্ট ইনপুট সেকশন */}
          {selectedDateStr && (
            <div className="space-y-2 bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-2xl p-4">
              <div className="flex justify-between items-center text-xs font-bold text-[var(--color-primary)]">
                <span>ADVANCE PAYMENT</span>
                <span className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-2.5 py-0.5 rounded-lg text-[10px]">Min 50% Required</span>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  min={minRequiredFee}
                  max={consultationFee}
                  value={paidAmountInput}
                  onChange={(e) => handlePaymentChange(Number(e.target.value))}
                  className={`w-full px-3.5 py-2.5 text-xs font-bold rounded-xl border outline-none bg-white dark:bg-zinc-900 text-slate-900 dark:text-white ${
                    paymentError ? "border-red-500" : "border-slate-200 dark:border-zinc-800 focus:border-[var(--color-primary)]"
                  }`}
                />
                <span className="font-bold text-xs text-slate-500">Tk</span>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleConfirmBooking}
            className="w-full bg-[var(--color-primary)] hover:opacity-90 text-white font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition shadow-sm disabled:opacity-50 cursor-pointer mt-2"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}