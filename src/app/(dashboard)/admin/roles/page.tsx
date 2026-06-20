"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, Shield, Search, Loader2, RefreshCw } from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "patient" | "doctor" | string;
  image?: string;
}

export default function AdminRoleManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // 🔎 TanStack Query: সব ইউজার নিয়ে আসা
  const { data: users = [], isLoading } = useQuery<UserType[]>({
    queryKey: ["adminAllUsers"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      const result = await res.json();
      return result.users || [];
    },
  });

  // 🚀 TanStack Mutation: রোল পরিবর্তন করার রিকোয়েস্ট পাঠানো
  const changeRoleMutation = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: string }) => {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      });
      return res.json();
    },
    onSuccess: () => {
      // রোল সফলভাবে চেঞ্জ হলে টেবিল ডাটা রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["adminAllUsers"] });
    },
  });

  const handleRoleChange = (userId: string, currentRole: string) => {
    // 🔐 সেফটি গার্ড: যদি বর্তমান রোল admin হয়, তবে ফাংশনটি এখানেই থেমে যাবে
    if (currentRole === "admin") return;

    // যদি বর্তমান রোল patient হয় তবে doctor হবে, আর doctor হলে patient হবে
    const newRole = currentRole === "patient" ? "doctor" : "patient";
    changeRoleMutation.mutate({ userId, newRole });
  };

  // সার্চ ফিল্টার লজিক
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-zinc-50 dark:bg-zinc-950 min-h-screen text-zinc-800 dark:text-zinc-200">
      
      {/* হেডার ও সার্চ বার */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">Role Management</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">ShifaCare ইউজারদের রোল (Patient / Doctor) তাৎক্ষণিকভাবে পরিবর্তন করুন।</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold shadow-sm"
          />
        </div>
      </div>

      {/* 📊 ইউজার লিস্ট টেবিল */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/70 dark:bg-zinc-800/40 text-[10px] font-black text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-4">User Details</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Current Role</th>
                <th className="p-4 text-right">Toggle Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs font-semibold">
              
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-zinc-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-500 mb-2" />
                    <p className="italic text-[11px]">Syncing BetterAuth collection...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-zinc-400 text-[11px]">
                    কোনো ইউজার খুঁজে পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition">
                    
                    {/* নাম ও প্রোফাইল পিকচার */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center border border-zinc-200 dark:border-zinc-700 font-bold">
                        {user.image ? (
                          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-4 h-4 text-zinc-400" />
                        )}
                      </div>
                      <span className="font-bold text-zinc-800 dark:text-zinc-100">{user.name}</span>
                    </td>

                    {/* ইমেইল */}
                    <td className="p-4 text-zinc-500 dark:text-zinc-400">{user.email}</td>

                    {/* বর্তমান রোল ব্যাজ */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                        user.role === "admin"
                          ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/20"
                          : user.role === "doctor"
                            ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/20"
                            : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/20"
                      }`}>
                        <Shield className="w-3 h-3" />
                        {user.role.toUpperCase()}
                      </span>
                    </td>

                    {/* রোল চেঞ্জ বাটন */}
                    <td className="p-4 text-right">
                      <button
                        type="button"
                        // 🎯 কন্ডিশনাল ডিজেবল: রোল যদি admin হয় অথবা মিউটেশন রানিং থাকে
                        disabled={user.role === "admin" || changeRoleMutation.isPending}
                        onClick={() => handleRoleChange(user.id, user.role)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition shadow-sm text-[11px] ${
                          user.role === "admin"
                            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-60"
                            : user.role === "patient"
                              ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                              : "bg-zinc-900 dark:bg-zinc-100 hover:opacity-90 text-white dark:text-zinc-950 cursor-pointer"
                        }`}
                      >
                        <RefreshCw className={`w-3 h-3 ${changeRoleMutation.isPending && user.role !== "admin" ? "animate-spin" : ""}`} />
                        {user.role === "admin" 
                          ? "Admin Locked" 
                          : `Change to ${user.role === "patient" ? "Doctor" : "Patient"}`
                        }
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}