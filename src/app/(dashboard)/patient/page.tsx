"use client";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Pill,
  Stethoscope,
  MessageCircle,
  DollarSign,
  Download,
  Video,
  MapPin
} from "lucide-react";

// ১. পেশেন্ট স্ট্যাটিস্টিকস ডাটা
const patientStats = [
  { name: "Total Appointments", value: "24", icon: Calendar, change: "+3 this month", isIncrease: true },
  { name: "Upcoming Visits", value: "2", icon: Clock, change: "Next: Tomorrow, 10:30 AM", isIncrease: false },
  { name: "Active Prescriptions", value: "4", icon: Pill, change: "2 ending soon", isIncrease: false },
  { name: "Total Spent", value: "৳12,450", icon: DollarSign, change: "This month: ৳3,200", isIncrease: true },
];

// ২. আসন্ন অ্যাপয়েন্টমেন্ট
const upcomingAppointments = [
  { id: 1, doctor: "Dr. Siam Khan", specialty: "Cardiologist", time: "Tomorrow, 10:30 AM", type: "Check-up", status: "Confirmed", isVideo: false },
  { id: 2, doctor: "Dr. Nusrat Jahan", specialty: "Dermatologist", time: "Feb 25, 03:00 PM", type: "Follow-up", status: "Pending", isVideo: true },
];

// ৩. সাম্প্রতিক প্রেসক্রিপশন
const recentPrescriptions = [
  { id: 1, doctor: "Dr. Siam Khan", date: "Feb 10, 2024", medicines: ["Cardimap 5mg", "Losartan 50mg"], refill: "5 days left" },
  { id: 2, doctor: "Dr. Arif Rahman", date: "Feb 5, 2024", medicines: ["Amoxicillin 500mg", "Paracetamol"], refill: "Expired" },
];

// ৪. স্বাস্থ্য টিপস
const healthTips = [
  { id: 1, title: "Stay Hydrated", description: "Drink at least 8 glasses of water daily", icon: "💧" },
  { id: 2, title: "Regular Exercise", description: "30 minutes walk can improve heart health", icon: "🏃" },
  { id: 3, title: "Sleep Well", description: "7-8 hours of sleep boosts immunity", icon: "😴" },
];

export default function PatientDashboardPage() {

  return (
    <div className="space-y-8 bg-background text-foreground min-h-screen transition-colors duration-300">
      
      {/* ওয়েলকাম হেডার */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, Mahsin Siam
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-muted-foreground text-sm">
              Patient ID: #MC-9021 | Member since Jan 2024
            </p>
            <span className="badge-success">
              <CheckCircle2 className="w-3 h-3" />
              Active
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-semibold text-primary bg-accent px-5 py-2.5 rounded-2xl border border-border hover:bg-accent/80 transition-colors flex items-center gap-2 cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            Message Doctor
          </button>
          <div className="text-sm font-semibold text-primary bg-accent px-5 py-2.5 rounded-2xl border border-border flex items-center transition-colors">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* স্ট্যাটিস্টিকস কার্ড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {patientStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="sc-card flex flex-col justify-between hover:border-primary/30"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground">{stat.name}</span>
                <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <span className={`text-xs font-medium ${stat.isIncrease ? "text-status-success" : "text-status-pending"}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* মেইন গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* বাম দিক: আসন্ন অ্যাপয়েন্টমেন্ট (২ কলাম) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* আসন্ন অ্যাপয়েন্টমেন্ট কার্ড */}
          <div className="sc-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground text-lg">Upcoming Appointments</h3>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                View All <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((app, idx) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-background border border-border rounded-2xl hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                      <Stethoscope className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{app.doctor}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{app.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium text-foreground/70 bg-muted px-2 py-0.5 rounded-md">{app.type}</span>
                        {app.isVideo && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-status-info-bg text-status-info transition-colors">
                            <Video className="w-3 h-3" />
                            Video Call
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 mt-3 sm:mt-0">
                    <span className="text-sm font-bold text-foreground bg-card border border-border px-3 py-1.5 rounded-xl shadow-xs transition-colors">
                      {app.time}
                    </span>
                    <span className={app.status === "Confirmed" ? "badge-success" : "badge-pending"}>
                      {app.status === "Confirmed" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {app.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="w-full bg-primary text-primary-foreground text-sm font-semibold py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-md mt-6 flex items-center justify-center gap-2 cursor-pointer">
              <Calendar className="w-4 h-4" />
              Book New Appointment
            </button>
          </div>

          {/* সাম্প্রতিক প্রেসক্রিপশন */}
          <div className="sc-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground text-lg">Recent Prescriptions</h3>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                View History <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="border-b border-muted last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{prescription.doctor}</p>
                      <p className="text-xs text-muted-foreground">{prescription.date}</p>
                    </div>
                    <button className="text-primary hover:bg-accent p-2 rounded-lg transition-colors cursor-pointer">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {prescription.medicines.map((medicine, idx) => (
                      <span key={idx} className="text-xs bg-muted text-foreground/80 px-2.5 py-1 rounded-full transition-colors">
                        {medicine}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2">
                    <span className={`text-xs font-medium ${
                      prescription.refill.includes("Expired") ? "text-red-500 dark:text-red-400" : "text-status-pending"
                    }`}>
                      Refill: {prescription.refill}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ডান দিক: কুইক অ্যাকশন ও হেলথ টিপস */}
        <div className="space-y-6">
          
          {/* কুইক অ্যাকশন (থিম কোড ব্র্যান্ড থিমড জেনুইন গ্রাডিয়েন্ট) */}
          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 rounded-3xl shadow-lg text-primary-foreground">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-xs text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-white/20 dark:hover:bg-black/30 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Video className="w-4 h-4" />
                Start Video Consultation
              </button>
              <button className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-xs text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-white/20 dark:hover:bg-black/30 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <FileText className="w-4 h-4" />
                Request Prescription Refill
              </button>
              <button className="w-full bg-white/10 dark:bg-black/20 backdrop-blur-xs text-primary-foreground text-sm font-semibold py-3 rounded-xl hover:bg-white/20 dark:hover:bg-black/30 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                Send Message to Doctor
              </button>
            </div>
          </div>

          {/* হেলথ টিপস */}
          <div className="sc-card">
            <h3 className="font-bold text-foreground text-lg mb-4">Health Tips</h3>
            <div className="space-y-4">
              {healthTips.map((tip) => (
                <div key={tip.id} className="flex items-start gap-3 p-3 bg-background border border-border rounded-xl transition-colors">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* কন্টাক্ট ইনফরমেশন (এমারজেন্সি সেকশন) */}
          <div className="sc-card">
            <h3 className="font-bold text-foreground text-lg mb-4">Emergency Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-500/10 dark:bg-red-500/20 border border-red-500/20 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-foreground">Emergency Hotline</span>
                </div>
                <span className="text-red-500 font-bold">10666</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-background border border-border rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground/80">Nearest Hospital</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground">2.5 km away</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}