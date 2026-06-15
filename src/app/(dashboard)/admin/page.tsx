"use client";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle,
  Stethoscope,
  UserPlus,
  Shield,
  Activity,
  TrendingUp,
  Edit2,
  Trash2,
  Search,
  Download,
  Eye,
  UserCheck,
  UserX,
  Hospital,
  CreditCard,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";



// ১. অ্যাডমিন স্ট্যাটিস্টিকস
const adminStats = [
  { name: "Total Doctors", value: "24", icon: Stethoscope, change: "+3 this month", isIncrease: true, color: "blue" },
  { name: "Total Patients", value: "1,892", icon: Users, change: "+142 new", isIncrease: true, color: "emerald" },
  { name: "Today's Appointments", value: "156", icon: Calendar, change: "32 pending", isIncrease: false, color: "amber" },
  { name: "Revenue (Monthly)", value: "৳3,24,500", icon: DollarSign, change: "+12.5%", isIncrease: true, color: "purple" },
];

// ২. ডাক্তার লিস্ট
const doctorsList = [
  { 
    id: 1, 
    name: "Dr. Siam Khan", 
    specialty: "Cardiologist", 
    patients: 342, 
    rating: 4.8, 
    status: "Active",
    experience: "8 years",
    consultationFee: 800,
    todayAppointments: 12,
    joinDate: "Jan 2023",
    image: "SK"
  },
  { 
    id: 2, 
    name: "Dr. Nusrat Jahan", 
    specialty: "Dermatologist", 
    patients: 278, 
    rating: 4.9, 
    status: "Active",
    experience: "6 years",
    consultationFee: 1000,
    todayAppointments: 8,
    joinDate: "Mar 2023",
    image: "NJ"
  },
  { 
    id: 3, 
    name: "Dr. Arif Rahman", 
    specialty: "Neurologist", 
    patients: 195, 
    rating: 4.7, 
    status: "On Leave",
    experience: "10 years",
    consultationFee: 1200,
    todayAppointments: 0,
    joinDate: "Jun 2022",
    image: "AR"
  },
  { 
    id: 4, 
    name: "Dr. Farhana Akter", 
    specialty: "Pediatrician", 
    patients: 421, 
    rating: 4.9, 
    status: "Active",
    experience: "12 years",
    consultationFee: 700,
    todayAppointments: 15,
    joinDate: "Sep 2021",
    image: "FA"
  },
];

// ৩. সাম্প্রতিক লেনদেন
const recentTransactions = [
  { id: "#TR-001", patient: "Mahsin Siam", doctor: "Dr. Siam Khan", amount: 800, date: "Today, 10:30 AM", status: "Completed" },
  { id: "#TR-002", patient: "Anika Rahman", doctor: "Dr. Nusrat Jahan", amount: 1000, date: "Today, 09:15 AM", status: "Completed" },
  { id: "#TR-003", patient: "Rakib Ahmed", doctor: "Dr. Arif Rahman", amount: 1200, date: "Yesterday", status: "Pending" },
  { id: "#TR-004", patient: "Tahmina Begum", doctor: "Dr. Farhana Akter", amount: 700, date: "Yesterday", status: "Completed" },
];

// ৪. পেন্ডিং অ্যাপয়েন্টমেন্ট

const pendingAppointments = [
  { id: 1, patient: "Shahidul Islam", doctor: "Dr. Siam Khan", time: "02:30 PM", type: "Check-up", requestedAt: "Today, 09:45 AM" },
  { id: 2, patient: "Jasmine Akhter", doctor: "Dr. Nusrat Jahan", time: "04:00 PM", type: "Follow-up", requestedAt: "Today, 10:20 AM" },
  { id: 3, patient: "Kamal Hossain", doctor: "Dr. Farhana Akter", time: "05:15 PM", type: "Consultation", requestedAt: "Yesterday, 08:30 PM" },
];
export default function AdminDashboardPage() {



  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = doctorsList.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 bg-background min-h-screen p-4 md:p-8 text-foreground transition-colors duration-300">
      
      {/* ================= হেডার সেকশন ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <p className="text-muted-foreground text-sm">
              Manage doctors, patients, and appointments
            </p>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Shield className="w-3 h-3" />
              Super Admin
            </span>
          </div>
        </div>
        
        {/* অ্যাকশন বাটনসমূহ */}
        <div className="flex gap-3">
          <button className="text-sm font-semibold text-foreground bg-card hover:bg-accent px-5 py-2.5 rounded-2xl border border-border transition-all flex items-center gap-2 cursor-pointer active:scale-95">
            <Download className="w-4 h-4 text-muted-foreground" />
            Export Report
          </button>
         <Link href="/admin/add-doctor">
          <button className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-2xl hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95">
            <UserPlus className="w-4 h-4" />
            Add Doctor
          </button>
         </Link>
        </div>
      </div>

      {/* ================= নেভিগেশন ট্যাব ================= */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {["overview", "doctors", "patients", "appointments", "reports"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all capitalize cursor-pointer active:scale-95 ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border"
            }`}
          >
            {tab === "overview" && <BarChart3 className="w-4 h-4 inline mr-2" />}
            {tab === "doctors" && <Stethoscope className="w-4 h-4 inline mr-2" />}
            {tab === "patients" && <Users className="w-4 h-4 inline mr-2" />}
            {tab === "appointments" && <Calendar className="w-4 h-4 inline mr-2" />}
            {tab === "reports" && <Activity className="w-4 h-4 inline mr-2" />}
            {tab}
          </button>
        ))}
      </div>

      {/* ================= স্ট্যাটিস্টিকস কার্ড ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground">{stat.name}</span>
                {/* আইকন কন্টেইনার থিম কালারের সাথে খাপ খাইয়ে রি-কালার করা হয়েছে */}
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.isIncrease ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= মেইন গ্রিড লেআউট ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ─── বাম দিক: ডাক্তার লিস্ট এবং ট্রানজেকশন (২ কলাম) ─── */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ডাক্তার ম্যানেজমেন্ট টেবিল কার্ড */}
          <div className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-bold text-foreground text-lg">Doctor Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manage all doctors and their schedules</p>
                </div>
                {/* সার্চ বার ইনপুট ফিল্ড */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-background border border-border text-foreground rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64 transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted/50">
                  <tr className="text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <th className="px-6 py-4">Doctor</th>
                    <th className="px-6 py-4">Specialty</th>
                    <th className="px-6 py-4">Patients</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Fee</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredDoctors.map((doctor, idx) => (
                    <motion.tr
                      key={doctor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-accent/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
                            {doctor.image}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-sm">{doctor.name}</p>
                            <p className="text-xs text-muted-foreground">{doctor.experience}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/80">{doctor.specialty}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{doctor.patients}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold text-amber-500">★</span>
                          <span className="text-sm text-foreground/80">{doctor.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">৳{doctor.consultationFee}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          doctor.status === "Active" 
                            ? "bg-emerald-500/10 text-emerald-500" 
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {doctor.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {doctor.status}
                        </span>
                      </td>
                      {/* অ্যাকশন বাটন আইকন কালার ফিক্স */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-accent text-blue-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 hover:bg-accent text-red-500 hover:text-red-600 rounded-lg transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-border bg-muted/20 text-center">
              <button className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 mx-auto cursor-pointer">
                View All Doctors <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* সাম্প্রতিক ট্রানজেকশন কার্ড */}
          <div className="bg-card rounded-3xl border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-lg">Recent Transactions</h3>
                  <p className="text-sm text-muted-foreground mt-1">Payment history and revenue tracking</p>
                </div>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer">
                  View All <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-border">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 hover:bg-accent/30 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <CreditCard className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="truncate">
                        <p className="font-semibold text-foreground text-sm truncate">{transaction.patient}</p>
                        <p className="text-xs text-muted-foreground truncate">{transaction.doctor} • {transaction.id}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-foreground">৳{transaction.amount}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        transaction.status === "Completed" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── ডান দিক: পেন্ডিং অ্যাপ্রুভাল ও সিস্টেম হেলথ (১ কলাম) ─── */}
        <div className="space-y-6">
          
          {/* পেন্ডিং অ্যাপ্রুভাল কার্ড */}
          <div className="bg-card rounded-3xl border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground text-lg">Pending Approvals</h3>
                <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/20">
                  {pendingAppointments.length} pending
                </span>
              </div>
            </div>
            <div className="divide-y divide-border">
              {pendingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-accent/20 transition-colors">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <div>
                      <p className="font-semibold text-foreground text-sm">{appointment.patient}</p>
                      <p className="text-xs text-muted-foreground">{appointment.doctor} • {appointment.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20 transition-colors cursor-pointer">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer">
                        <UserX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {appointment.time}
                    </span>
                    <span>Requested: {appointment.requestedAt}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <button className="w-full bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all cursor-pointer active:scale-95 shadow-sm">
                Manage All Pending
              </button>
            </div>
          </div>

          {/* সিস্টেম হেলথ কার্ড - প্রিমিয়াম ডার্ক/লাইট অ্যাকসেন্ট গ্রেডিয়েন্ট */}
          <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-3xl shadow-lg text-primary-foreground">
            <h3 className="font-bold text-lg mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 opacity-90">
                  <span>Server Status</span>
                  <span className="font-semibold text-emerald-300">Operational</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 opacity-90">
                  <span>Database Usage</span>
                  <span>64%</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                  <div className="bg-sky-300 h-2 rounded-full w-[64%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 opacity-90">
                  <span>Active Sessions</span>
                  <span>142</span>
                </div>
                <div className="w-full bg-primary-foreground/20 rounded-full h-2">
                  <div className="bg-amber-300 h-2 rounded-full w-[72%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* কুইক স্ট্যাটস গ্রিড কার্ড */}
          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
            <h3 className="font-bold text-foreground text-lg mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/40 border border-border/50 rounded-xl">
                <Hospital className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Departments</p>
                <p className="font-bold text-foreground text-lg">8</p>
              </div>
              <div className="text-center p-3 bg-muted/40 border border-border/50 rounded-xl">
                <p className="w-5 h-5 text-purple-500 mx-auto mb-2 font-bold text-base">＋</p>
                <p className="text-xs text-muted-foreground">New Today</p>
                <p className="font-bold text-foreground text-lg">23</p>
              </div>
              <div className="text-center p-3 bg-muted/40 border border-border/50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Growth</p>
                <p className="font-bold text-foreground text-lg">+18%</p>
              </div>
              <div className="text-center p-3 bg-muted/40 border border-border/50 rounded-xl">
                <Activity className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Avg. Wait</p>
                <p className="font-bold text-foreground text-lg">12min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}