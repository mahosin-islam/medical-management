"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User, Shield, Search, Loader2 } from "lucide-react";
import Loading from "@/app/loading";

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

  const { data: users = [], isLoading } = useQuery<UserType[]>({
    queryKey: ["adminAllUsers"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      const result = await res.json();
      return result.users || [];
    },
  });

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
      queryClient.invalidateQueries({ queryKey: ["adminAllUsers"] });
    },
  });

  const handleRoleChange = (userId: string, currentRole: string) => {
    if (currentRole === "admin") return;
    const newRole = currentRole === "patient" ? "doctor" : "patient";
    changeRoleMutation.mutate({ userId, newRole });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleStyle = (role: string) => {
    if (role === "admin") return "badge-success";
    if (role === "doctor") return "badge-pending";
    return "bg-muted text-foreground";
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">Role Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Promote or demote users between roles</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground border border-border rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="sc-card p-0 overflow-hidden rounded-3xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Role</th>
                <th className="px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-sm text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-accent text-primary flex items-center justify-center">
                          {user.image ? (
                            <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </div>
                        <p className="font-medium text-foreground">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${getRoleStyle(user.role)}`}>
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.role === "admin" ? (
                        <span className="text-xs text-muted-foreground">Protected</span>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user.id, user.role)}
                          disabled={changeRoleMutation.isPending}
                          className="text-sm text-primary hover:underline disabled:opacity-50"
                        >
                          {changeRoleMutation.isPending ? "Updating..." : user.role === "patient" ? "Make Doctor" : "Make Patient"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
