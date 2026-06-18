"use client";

import React, { useState } from 'react';

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
  };
}

export default function BookingWidget({ doctor, currentUser }: BookingWidgetProps) {
  // ১. যদি ইউজার লগইন না থাকে বা ইমেইল না পায়
  if (!currentUser || !currentUser.email) {
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-sm font-bold text-amber-500 mb-2">Login Required</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">অ্যাপয়েন্টমেন্ট বুক করতে প্রথমে আপনার অ্যাকাউন্টে লগইন করুন।</p>
      </div>
    );
  }

  if (!doctor || !doctor.scheduleConfig || !doctor.scheduleConfig.availableDays || doctor.scheduleConfig.availableDays.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-sm font-bold text-red-500 mb-2">Booking Unavailable</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">এই ডাক্তারের কোনো অ্যাক্টিভ শিডিউল সেট করা নেই।</p>
      </div>
    );
  }

  const clinicAddress = doctor.bioDetails?.clinicAddress || doctor.chamberConfig?.clinicAddress || "N/A";
  const consultationFee = Number(doctor.bioDetails?.consultationFee || doctor.chamberConfig?.consultationFee) || 500;
  const doctorPhone = doctor.bioDetails?.chamberPhone || doctor.chamberConfig?.chamberPhone || doctor.phone || "N/A";
  
  const minRequiredFee = consultationFee / 2; // 💸 মিনিমাম ৫০% ফি ক্যালকুলেশন

  const { _id: doctorId, scheduleConfig } = doctor;
  
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

  // 💸 পেমেন্টের জন্য স্টেট (ডিফল্ট হিসেবে মিনিমাম ৫০% পেমেন্ট সেট থাকবে)
  const [paidAmountInput, setPaidAmountInput] = useState<number>(minRequiredFee);
  const [paymentError, setPaymentError] = useState<string>("");

  const today = new Date(); 
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  const isValidBDPhone = (phone: string) => {
    const phoneRegex = /^01[3-9]\d{8}$/;
    return phoneRegex.test(phone);
  };

  // পেমেন্ট ভ্যালিডেশন সহ ফর্ম ভ্যালিড চেক
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

  // 💸 পেমেন্ট ইনপুট চেঞ্জ হ্যান্ডলার ও রিয়েলটাইম এরর ভ্যালিডেশন
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
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl">✓</div>
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Appointment Requested!</h3>
        <p className="text-xs text-zinc-500 mt-2">পেশেন্ট <span className="font-semibold text-zinc-800 dark:text-zinc-200">{currentUser.name}</span> এর জন্য ডেট {selectedDateStr}-এ সিরিয়াল <span className="font-bold text-blue-600">#{selectedSerial}</span> কনফার্ম হয়েছে।</p>
        <div className="bg-zinc-50 dark:bg-zinc-900 text-[11px] p-2.5 rounded-xl mt-3 text-zinc-600 dark:text-zinc-400 font-medium">
          Paid Advance: <span className="text-emerald-600 font-bold">{paidAmountInput} Tk</span> | Due Balance: <span className="text-red-500 font-bold">{consultationFee - paidAmountInput} Tk</span>
        </div>
        <button onClick={() => { setIsBookingStarted(false); setBookingSuccess(false); setSelectedDateStr(""); setSelectedSerial(null); setPatientPhone(""); setPaidAmountInput(minRequiredFee); setPaymentError(""); }} className="mt-4 w-full bg-zinc-900 text-white text-xs font-semibold py-2 rounded-xl">Done</button>
      </div>
    );
  }

  if (!isBookingStarted) {
    return (
      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-sm">
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 mb-2">Need an Appointment?</h3>
        <p className="text-xs text-zinc-500 mb-3 leading-relaxed">Hi <span className="font-semibold text-zinc-800 dark:text-zinc-200">{currentUser.name}</span>, নিচের বাটনে ক্লিক করে আপনার স্লটটি কনফার্ম করুন</p>
        <p className="text-[11px] font-bold text-zinc-400 mb-5">Consultation Fee: {consultationFee} Tk</p>
        <button onClick={() => setIsBookingStarted(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm">Book Appointment Now</button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm text-left space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-900 pb-3">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">Select Location & Slot</h3>
          <span className="text-[11px] font-bold text-emerald-600 mt-0.5">Fee: {consultationFee} Tk</span>
        </div>
        <button onClick={() => setIsBookingStarted(false)} className="text-xs text-zinc-400 hover:text-zinc-600 font-medium">Cancel</button>
      </div>

      {/* 👤 লগইনড ইউজার ইনফো প্রোফাইল */}
      <div className="bg-zinc-50 dark:bg-zinc-900/40 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs uppercase">
          {currentUser.name ? currentUser.name[0] : "U"}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{currentUser.name}</h4>
          <p className="text-[10px] text-zinc-500 truncate">{currentUser.email}</p>
        </div>
        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md border border-emerald-200/50 flex-shrink-0">Account</span>
      </div>

      {/* 📞 মোবাইল নম্বর ইনপুট */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
          Contact Mobile Number <span className="text-red-500">*</span>
        </label>
        <input 
          type="tel"
          maxLength={11}
          placeholder="e.g. 01712345678"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, ''))}
          className={`w-full text-xs border rounded-xl p-2.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 ${
            patientPhone.length > 0 && !isValidBDPhone(patientPhone)
              ? "border-red-500 focus:ring-red-500" 
              : "border-zinc-200 dark:border-zinc-800 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />
        {patientPhone.length > 0 && !isValidBDPhone(patientPhone) && (
          <p className="text-[10px] text-red-500 font-medium">দয়া করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।</p>
        )}
      </div>

      {/* 📍 লোকেশন */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Select a Location</label>
        <div 
          onClick={() => setSelectedLocation(clinicAddress)}
          className={`p-3.5 border rounded-xl cursor-pointer transition flex items-start space-x-3 ${selectedLocation ? 'border-blue-500 bg-blue-50/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'}`}
        >
          <div className={`h-4 w-4 rounded-full border flex items-center justify-center mt-0.5 ${selectedLocation ? 'border-blue-600 bg-blue-600 text-white' : 'border-zinc-300'}`}>
            {selectedLocation && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">Chamber / Clinic</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">{clinicAddress}</p>
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-3 space-y-4 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Type</label>
              <button type="button" className="w-full text-center py-1.5 text-xs font-semibold rounded-xl border bg-blue-50 dark:bg-blue-950/30 border-blue-600 text-blue-600">Face to Face</button>
            </div>
            <div>
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Category</label>
              <select 
                value={appointmentType} 
                onChange={(e) => setAppointmentType(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-800 p-1.5 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none"
              >
                {["New Patient", "Follow Up", "Report Show"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">Select an Available Time</label>
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

          {selectedDateStr && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Available Serial Slots</label>
              <div className="grid grid-cols-5 gap-1.5 max-h-24 overflow-y-auto border border-zinc-100 dark:border-zinc-900 rounded-xl p-2 bg-zinc-50/50">
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

          {/* 💸 পেমেন্ট ইনপুট সেকশন (আপডেটেড: এখন ডেট সিলেক্ট করার সাথে সাথেই আসবে) */}
          {selectedDateStr && (
            <div className="space-y-2 bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/50 dark:border-blue-900/30 rounded-xl p-3.5">
              <div className="flex justify-between items-center text-[11px] font-bold text-blue-700 dark:text-blue-400">
                <span>ADVANCE PAYMENT</span>
                <span className="bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-md text-[10px]">Min 50% Required</span>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  min={minRequiredFee}
                  max={consultationFee}
                  value={paidAmountInput}
                  onChange={(e) => handlePaymentChange(Number(e.target.value))}
                  className={`w-full px-3 py-1.5 text-xs font-bold rounded-lg border outline-none bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 ${
                    paymentError ? "border-red-500 focus:ring-red-500" : "border-blue-200 dark:border-blue-900 focus:border-blue-500"
                  }`}
                />
                <span className="font-bold text-xs text-zinc-500">Tk</span>
              </div>

              <div className="flex justify-between text-[10px] text-zinc-400 pt-0.5 font-medium">
                <span>Min Require: {minRequiredFee} Tk</span>
                <span>Remaining Due: <span className="font-bold text-zinc-600 dark:text-zinc-300">{consultationFee - paidAmountInput} Tk</span></span>
              </div>

              {paymentError && (
                <p className="text-[10px] text-red-500 font-semibold mt-1">⚠️ {paymentError}</p>
              )}
            </div>
          )}

          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleConfirmBooking}
            className={`w-full py-2.5 rounded-xl font-bold text-xs transition shadow-sm ${
              isFormValid
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