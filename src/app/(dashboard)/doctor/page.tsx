"use client";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Clock, 
  FileSpreadsheet, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

// ১. স্ট্যাটিস্টিকস ডাটা (Stats Data)
const stats = [
  { name: "Total Patients", value: "1,248", icon: Users, change: "+12% this week", isIncrease: true },
  { name: "Appointments Today", value: "18", icon: Calendar, change: "4 pending confirmation", isIncrease: false },
  { name: "Avg. Waiting Time", value: "14 min", icon: Clock, change: "-3 min from yesterday", isIncrease: true },
  { name: "Total Prescriptions", value: "892", icon: FileSpreadsheet, change: "+34 new today", isIncrease: true },
];

// ২. আজকের অ্যাপয়েন্টমেন্ট ডাটা (Upcoming Appointments)
const upcomingAppointments = [
  { id: 1, patient: "Zahid Hasan", time: "05:30 PM", type: "Check-up", status: "Confirmed" },
  { id: 2, patient: "Nusrat Jahan", time: "06:15 PM", type: "Report Show", status: "Pending" },
  { id: 3, patient: "Arif Rahman", time: "07:00 PM", type: "Follow-up", status: "Confirmed" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 bg-background text-foreground min-h-screen transition-colors duration-300">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, Dr. Siam Khan
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's what is happening with your chamber today.
          </p>
        </div>
        <div className="text-sm font-semibold text-primary bg-accent px-4 py-2.5 rounded-2xl border border-border self-start md:self-auto transition-colors">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Grid: Stat Cards (Framer Motion Integration) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, index) => {
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

      {/* Layout Grid: Appointments & Dynamic Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Patients Table (Takes 2 columns on large screen) */}
        <div className="sc-card lg:col-span-2 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground text-lg">Recent Patient Visits</h3>
              <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                View All <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="pb-3 pl-2">Patient</th>
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Department</th>
                    <th className="pb-3 text-right pr-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted text-sm font-medium text-foreground/80">
                  <tr className="hover:bg-accent/40 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-foreground">Mahsin Siam</td>
                    <td className="py-3.5 text-muted-foreground">#MC-9021</td>
                    <td className="py-3.5">
                      <span className="bg-status-info-bg text-status-info px-2.5 py-1 rounded-full text-xs font-bold transition-colors">
                        Cardiology
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2 text-muted-foreground">Today, 02:15 PM</td>
                  </tr>
                  <tr className="hover:bg-accent/40 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-foreground">Anika Rahman</td>
                    <td className="py-3.5 text-muted-foreground">#MC-8834</td>
                    <td className="py-3.5">
                      <span className="bg-purple-100/10 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full text-xs font-bold">
                        Pediatrics
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2 text-muted-foreground">Today, 11:30 AM</td>
                  </tr>
                  <tr className="hover:bg-accent/40 transition-colors">
                    <td className="py-3.5 pl-2 font-bold text-foreground">Rakib Ahmed</td>
                    <td className="py-3.5 text-muted-foreground">#MC-7612</td>
                    <td className="py-3.5">
                      <span className="bg-status-pending-bg text-status-pending px-2.5 py-1 rounded-full text-xs font-bold transition-colors">
                        Neurology
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2 text-muted-foreground">Yesterday</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Today's Appointments (Takes 1 column) */}
        <div className="sc-card flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-foreground text-lg mb-6">Upcoming Today</h3>
            <div className="space-y-4">
              {upcomingAppointments.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3.5 bg-background border border-border rounded-2xl transition-colors">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground text-sm">{app.patient}</span>
                    <span className="text-xs text-muted-foreground font-medium mt-0.5">{app.type}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-xs font-bold text-foreground bg-card border border-border px-2 py-1 rounded-xl shadow-xs transition-colors">
                      {app.time}
                    </span>
                    <span className={app.status === "Confirmed" ? "badge-success" : "badge-pending"}>
                      {app.status === "Confirmed" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full bg-primary text-primary-foreground text-sm font-semibold py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-md mt-6 cursor-pointer">
            Manage All Appointments
          </button>
        </div>

      </div>
    </div>
  );
}