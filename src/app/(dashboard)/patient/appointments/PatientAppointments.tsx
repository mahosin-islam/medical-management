"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full sc-card p-0 overflow-hidden rounded-3xl"
    >
      
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">My Appointments</h1>
        <p className="text-sm text-muted-foreground mt-1">View your booked appointments, payments, and visit status.</p>
      </div>

      {/* টেবিল কন্টেইনার (মোবাইলে স্ক্রোলের জন্য overflow-x-auto) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <th className="p-4 pl-6">Doctor & Location</th>
              <th className="p-4">Appointment Date</th>
              <th className="p-4">Serial</th>
              <th className="p-4">Consultation</th>
              <th className="p-4">Payment & Fees</th>
              <th className="p-4 pr-6 text-right">Visit Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm text-foreground">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-16 text-center text-muted-foreground">
                  No appointments found.
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
                  <tr key={appt._id} className="hover:bg-accent/30 transition-colors">
                    
                    {/* ১. ডাক্তার এবং চেম্বার লোকেশন */}
                    <td className="p-5 pl-6 max-w-xs">
                      <div className="font-medium text-foreground">
                        Dr. {appt.doctorName}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{appt.location}</span>
                      </div>
                    </td>

                    {/* ২. তারিখ ও বার */}
                    <td className="p-5">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {appt.date}
                      </div>
                      <div className="text-xs text-muted-foreground ml-5 mt-0.5">{appt.day}</div>
                    </td>

                    {/* ৩. সিরিয়াল নাম্বার */}
                    <td className="p-5 font-medium text-primary">
                      #{appt.serialNumber.toString().padStart(2, "0")}
                    </td>

                    {/* ৪. কনসালটেশন টাইপ */}
                    <td className="p-5">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-muted text-foreground">
                        {appt.consultationType}
                      </span>
                    </td>

                    {/* ৫. পেমেন্ট হিসাব ও ডিউ ট্র্যাকিং */}
                    <td className="p-5">
                      <div className="space-y-1">
                        <div className="text-foreground">
                          Total: <span className="font-medium">৳{appt.totalFee}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                            isPaid 
                              ? "badge-success" 
                              : isPartial 
                              ? "badge-pending" 
                              : "badge-pending"
                          }`}>
                            {appt.paymentStatus}
                          </span>
                          
                          {appt.dueAmount > 0 && (
                            <span className="text-xs text-status-pending">
                              Due: ৳{appt.dueAmount}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* ৬. ভিজিট স্ট্যাটাস (Pending / Completed) */}
                    <td className="p-5 pr-6 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs ${
                        isCompleted
                          ? "badge-success"
                          : "badge-pending"
                      }`}>
                        {isCompleted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5" />
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
    </motion.div>

  );
}