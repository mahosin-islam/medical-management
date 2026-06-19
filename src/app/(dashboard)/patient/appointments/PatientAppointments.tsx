"use client";
import { Calendar,  Clock, MapPin, CheckCircle2,  } from "lucide-react";

// ডাটাবেজের অবজেক্ট অনুযায়ী টাইপ সেফটি ইন্টারফেস
interface Appointment {
  _id: string;
  doctorId: string;
  doctorName: string;
  doctorPhone: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  location: string;
  consultationType: string;
  appointmentType: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: "paid" | "partial" | "unpaid";
  date: string;
  month: string;
  day: string;
  serialNumber: number;
  status: "pending" | "completed" | "canceled";
  bookedAt: string;
}

export default function PatientAppointments({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
      
      {/* হেডার পার্ট */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">My Appointments</h2>
        <p className="text-xs text-zinc-500 mt-1">আপনার বুকিং করা সকল ডাক্তারের তালিকা ও পেমেন্ট স্ট্যাটাস নিচে দেওয়া হলো।</p>
      </div>

      {/* টেবিল কন্টেইনার (মোবাইলে স্ক্রোলের জন্য overflow-x-auto) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/70 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-black uppercase text-zinc-400 tracking-wider">
              <th className="p-4 pl-6">Doctor & Location</th>
              <th className="p-4">Appointment Date</th>
              <th className="p-4">Serial</th>
              <th className="p-4">Consultation</th>
              <th className="p-4">Payment & Fees</th>
              <th className="p-4 pr-6 text-right">Visit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900 text-xs text-zinc-700 dark:text-zinc-300">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-zinc-400 italic">
                  📭 আপনার কোনো অ্যাপয়েন্টমেন্ট বুকিং করা নেই।
                </td>
              </tr>
            ) : (
              appointments.map((appt) => {
                // পেমেন্ট স্ট্যাটাস অনুযায়ী ডায়নামিক কালার ব্যাজ
                const isPaid = appt.paymentStatus === "paid";
                const isPartial = appt.paymentStatus === "partial";

                // ভিজিট স্ট্যাটাস অনুযায়ী ডায়নামিক কালার ব্যাজ
                const isCompleted = appt.status === "completed";

                return (
                  <tr key={appt._id} className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition">
                    
                    {/* ১. ডাক্তার এবং চেম্বার লোকেশন */}
                    <td className="p-4 pl-6 max-w-xs">
                      <div className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                        Dr. {appt.doctorName}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0 text-zinc-400" />
                        <span className="truncate">{appt.location}</span>
                      </div>
                    </td>

                    {/* ২. তারিখ ও বার */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {appt.date}
                      </div>
                      <div className="text-[10px] text-zinc-400 ml-5 mt-0.5">{appt.day}</div>
                    </td>

                    {/* ৩. সিরিয়াল নাম্বার */}
                    <td className="p-4 font-black text-zinc-500 dark:text-zinc-400">
                      #{appt.serialNumber.toString().padStart(2, "0")}
                    </td>

                    {/* ৪. কনসালটেশন টাইপ */}
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-lg text-[10px] font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/50">
                        {appt.consultationType}
                      </span>
                    </td>

                    {/* ৫. পেমেন্ট হিসাব ও ডিউ ট্র্যাকিং */}
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 font-bold text-zinc-800 dark:text-zinc-200">
                          <span>৳{appt.totalFee}</span>
                          <span className="text-[10px] font-normal text-zinc-400">(Total)</span>
                        </div>
                        
                        {/* পেমেন্ট স্ট্যাটাস ব্যাজ এবং ডিউ টেক্সট */}
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-0.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                            isPaid 
                              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600" 
                              : isPartial 
                              ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600" 
                              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600"
                          }`}>
                            {appt.paymentStatus}
                          </span>
                          
                          {appt.dueAmount > 0 && (
                            <span className="text-[10px] text-rose-500 font-semibold">
                              Due: ৳{appt.dueAmount}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* ৬. ভিজিট স্ট্যাটাস (Pending / Completed) */}
                    <td className="p-4 pr-6 text-right">
                      <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold ${
                        isCompleted
                          ? "bg-green-50 dark:bg-green-500/10 text-green-600"
                          : "bg-blue-50 dark:bg-blue-500/10 text-blue-600"
                      }`}>
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5 animate-pulse" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}