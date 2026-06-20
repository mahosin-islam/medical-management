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
            <div className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-8 text-center h-[560px]">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400">
                    <ShieldAlert className="w-8 h-8 mx-auto text-amber-500 mb-2" />
                    <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">No Chat Support Available</h3>
                    <p className="text-[11px] max-w-sm mt-1">আপনার কোনো সম্পন্ন হওয়া (Completed) অ্যাপয়েন্টমেন্ট নেই। ডাক্তার ভিジット কমপ্লিট হলে চ্যাট অপশন চালু হবে।</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3 shadow-sm h-[560px]">

            {/* 📁 বাম পাশ: ডক্টর লিস্ট প্যানেল */}
            <div className="border-r border-zinc-200 dark:border-zinc-800 flex flex-col bg-zinc-50/50 dark:bg-zinc-900/10 h-full overflow-hidden">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">My Doctors list</p>
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
                                        ? "bg-blue-600 text-white shadow-sm"
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
            <div className="md:col-span-2 flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden">
                {selectedDoctor ? (
                    <>
                        {/* চ্যাট হেডার */}
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-zinc-900 flex items-center justify-center text-blue-600 font-bold text-xs">
                                {selectedDoctor.name ? selectedDoctor.name[0] : "D"}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{selectedDoctor.name}</h4>
                                <p className="text-[10px] text-zinc-400">{selectedDoctor.specialty}</p>
                            </div>
                        </div>

                        {/* মেসেজেস এরিয়া */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/30 dark:bg-zinc-950/10">
                            {isLoading ? (
                                <p className="text-[11px] text-zinc-400 text-center italic">Loading conversations...</p>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-12 text-zinc-400 space-y-1">
                                    <MessageSquare className="w-5 h-5 mx-auto opacity-40" />
                                    <p className="text-[11px]">ডাক্তারের সাথে আপনার চ্যাট শুরু করুন।</p>
                                </div>
                            ) : (
                                messages.map((msg: any) => {
                                    const isMe = msg.senderId === patientId; 
                                    return (
                                        <div key={msg._id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-xs px-3 py-2 rounded-2xl text-xs shadow-sm leading-relaxed ${
                                                    isMe
                                                        ? "bg-blue-600 text-white rounded-br-none" 
                                                        : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-100 dark:border-zinc-800/60" 
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
                        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
                            <input
                                type="text"
                                value={typedMessage}
                                onChange={(e) => setTypedMessage(e.target.value)}
                                placeholder="Type your medical query..."
                                className="flex-1 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                            />
                            <button
                                type="submit"
                                disabled={!typedMessage.trim() || sendMessageMutation.isPending}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-100 dark:disabled:bg-zinc-900 text-white disabled:text-zinc-400 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-400 text-xs italic">
                        বাম পাশ থেকে ডাক্তার সিলেক্ট করুন
                    </div>
                )}
            </div>

        </div>
    );
}