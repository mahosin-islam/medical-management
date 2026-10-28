"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, User, MessageSquare, ShieldAlert } from "lucide-react";
import PusherClient from "pusher-js"; 

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
}

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    message?: string; // 🎯 ডক্টর অ্যাপের 'message' ফিল্ডের সাথে সেফটি সিঙ্ক
    createdAt: string;
}

export default function PatientChatContainer({ allowedDoctors, patientId }: { allowedDoctors: Doctor[]; patientId: string }) {
    const queryClient = useQueryClient();
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(allowedDoctors[0] || null);
    const [typedMessage, setTypedMessage] = useState("");
    
    // অটো স্ক্রোল টু বটম এর জন্য রেফারেন্স
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 🔎 TanStack Query: চ্যাট হিস্ট্রি লোড করা
    const { data: messages = [], isLoading } = useQuery<Message[]>({
        queryKey: ["chatHistory", selectedDoctor?.id],
        queryFn: async () => {
            if (!selectedDoctor) return [];
            const res = await fetch(`/api/chat/history?partnerId=${selectedDoctor.id}`);
            const result = await res.json();
            return result.messages || [];
        },
        enabled: !!selectedDoctor,
    });

    // 🚀 Pusher রিয়েল-টাইম লিসেনার সাবস্ক্রিপশন
    useEffect(() => {
        if (!selectedDoctor?.id || !patientId) return;

        const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
        });

        const docIdStr = String(selectedDoctor.id).trim();
        const patIdStr = String(patientId).trim();
        const channelName = `chat-${[docIdStr, patIdStr].sort().join("-")}`;
        
        const channel = pusher.subscribe(channelName);

        channel.bind("new-message", () => {
            queryClient.invalidateQueries({ queryKey: ["chatHistory", selectedDoctor.id] });
        });

        return () => {
            channel.unbind_all();
            pusher.unsubscribe(channelName);
            // 🎯 pusher.disconnect(); 👈 কানেকশন ড্রপ প্রিভেনশন সাকসেসফুলি বজায় রইলো
        };
    }, [selectedDoctor?.id, patientId, queryClient]);

    // 🚀 TanStack Mutation: নতুন মেসেজ পাঠানোর জন্য
    const sendMessageMutation = useMutation({
        mutationFn: async (text: string) => {
            const res = await fetch("/api/chat/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    receiverId: selectedDoctor?.id,
                    text,
                    message: text, // 🎯 ব্যাকএন্ড বা ডক্টর প্যানেল যদি 'message' এক্সপেক্ট করে
                }),
            });
            return res.json();
        },
        onSuccess: () => {
            setTypedMessage("");
            queryClient.invalidateQueries({ queryKey: ["chatHistory", selectedDoctor?.id] });
        },
    });

    // 🎯 ফিক্স: মেসেজ লোড বা নতুন মেসেজ আসলে অটোমেটিক নিচে স্ক্রোল করার নির্ভরযোগ্য লজিক
    useEffect(() => {
        if (!isLoading && messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!typedMessage.trim() || !selectedDoctor) return;
        sendMessageMutation.mutate(typedMessage.trim());
    };

    if (allowedDoctors.length === 0) {
        return (
            <div className="flex-1 sc-card flex flex-col items-center justify-center p-8 text-center h-full rounded-3xl">
                <div className="p-6 bg-background/50 rounded-2xl border border-dashed border-border text-center max-w-sm">
                    <ShieldAlert className="w-8 h-8 mx-auto text-primary mb-3" />
                    <h3 className="text-foreground font-medium">No Chat Support Available</h3>
                    <p className="text-sm text-muted-foreground mt-1">Chat is available with doctors after your appointments are completed.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1   sc-card p-0 overflow-hidden grid grid-cols-1 md:grid-cols-3 h-full rounded-3xl">

            {/* 📁 বাম পাশ: ডক্টর লিস্ট প্যানেল */}
            <div className="border-r border-border flex flex-col bg-background/40 h-full overflow-hidden">
                <div className="p-4 border-b border-border">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Doctorsd</p>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {allowedDoctors.map((doc) => {
                        const isSelected = selectedDoctor?.id === doc.id;
                        return (
                            <button
                                key={doc.id}
                                type="button"
                                onClick={() => setSelectedDoctor(doc)}
                                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition ${
                                    isSelected
                                        ? "bg-primary text-white shadow-sm"
                                        : "hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                                }`}
                            >
                                <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 overflow-hidden flex items-center justify-center font-bold">
                                    {doc.image ? <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" /> : <User className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate">{doc.name}</p>
                                    <p className={`text-[10px] truncate ${isSelected ? "text-blue-100" : "text-zinc-400"}`}>{doc.specialty}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 💬 ডান পাশ: একটিভ চ্যাট উইন্ডো */}
            <div className="md:col-span-2 flex flex-col h-full overflow-hidden">
                {selectedDoctor ? (
                    <>
                        {/* চ্যাট হেডার */}
                        <div className="p-4 bg-background/40 border-b border-border flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-accent text-primary flex items-center justify-center font-medium">
                                {selectedDoctor.name ? selectedDoctor.name[0] : "D"}
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-foreground">Dr. {selectedDoctor.name}</h4>
                                <p className="text-xs text-muted-foreground">{selectedDoctor.specialty}</p>
                            </div>
                        </div>

                        {/* মেসেজেস এরিয়া */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {isLoading ? (
                                <p className="text-sm text-muted-foreground text-center mt-8">Loading conversations...</p>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground space-y-2">
                                    <MessageSquare className="w-6 h-6 mx-auto" />
                                    <p className="text-sm">Start a conversation with your doctor.</p>
                                </div>
                            ) : (
                                messages.map((msg: any) => {
                                    const isMe = msg.senderId === patientId; 
                                    return (
                                        <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-xs sm:max-w-sm px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                                                    isMe
                                                        ? "bg-primary text-primary-foreground rounded-br-md" 
                                                        : "bg-muted text-foreground rounded-bl-md" 
                                                }`}
                                            >
                                                {msg.message || msg.text}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* মেসেজ টাইপিং ফর্ম ইনপুট */}
                        <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2">
                            <input
                                type="text"
                                value={typedMessage}
                                onChange={(e) => setTypedMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 text-sm bg-background text-foreground placeholder:text-muted-foreground border border-border rounded-2xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary/40"
                            />
                            <button
                                type="submit"
                                disabled={!typedMessage.trim() || sendMessageMutation.isPending}
                                className="bg-primary text-primary-foreground disabled:opacity-50 px-4 py-2.5 rounded-2xl text-sm hover:opacity-90 transition flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
                        Select a doctor to start chatting
                    </div>
                )}
            </div>

        </div>
    );
}