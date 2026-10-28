"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import toast from 'react-hot-toast';
import PusherClient from 'pusher-js';

interface MessengerProps {
  currentDoctor: {
    id: string;
    name: string;
  };
}

export default function DoctorMessengerClient({ currentDoctor }: MessengerProps) {
  const [chatList, setChatList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const [activePatient, setActivePatient] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [typedMessage, setTypedMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ডক্টর ডিরেক্টরি লোড করা
  const fetchChatPatients = useCallback(async () => {
    if (!currentDoctor?.id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/doctor/messenger?doctorId=${currentDoctor.id}`, { cache: 'no-store' });
      const result = await res.json();
      if (result.success) setChatList(result.data || []);
    } catch (error) {
      toast.error("ডাটা লোড করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }, [currentDoctor?.id]);

  useEffect(() => {
    fetchChatPatients();
  }, [fetchChatPatients]);

  // চ্যাট হিস্ট্রি লোড
  const handleLaunchChat = async (patient: any) => {
    const patientId = patient.patientId || patient._id || patient.patientPhone;
    
    setActivePatient(patient);
    setMessages([]); 
    
    try {
      const res = await fetch(`/api/messages?senderId=${currentDoctor.id}&receiverId=${patientId}`);
      const result = await res.json();
      if (result.success) {
        setMessages(result.data || []);
      } else {
        toast.error("পুরোনো মেসেজ লোড করা যায়নি");
      }
    } catch (error) {
      toast.error("পুরোনো মেসেজ লোড করা যায়নি");
    }
  };

  // 🚀 Pusher রিয়েল-টাইম লিসেনার সাবস্ক্রিপশন (ফিক্সড পার্ট)
  useEffect(() => {
    const patientId = activePatient?.patientId || activePatient?._id || activePatient?.patientPhone;
    
    if (!patientId || !currentDoctor?.id) return;

    // ✅ সেফ ইনিশিয়েলাইজেশন
    const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
    });

    // 🎯 ফিক্স: আইডি দুটিকে স্ট্রিং বানিয়ে ট্রিম (Trim) করা হলো যাতে চ্যানেলের নাম হুবহু ম্যাচ করে
    const docIdStr = String(currentDoctor.id).trim();
    const patIdStr = String(patientId).trim();
    const channelName = `chat-${[docIdStr, patIdStr].sort().join("-")}`;
    
    const channel = pusher.subscribe(channelName);

    channel.bind("new-message", (data: any) => {
      setMessages((prev) => {
        // ডুপ্লিকেট মেসেজ প্রিভেনশন চেক
        const isDuplicate = prev.some(
          (msg) => 
            (msg.message === data.message || msg.text === data.text || msg.message === data.text || msg.text === data.message) && 
            msg.senderId === data.senderId
        );
        if (isDuplicate) return prev;
        return [...prev, data];
      });
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(channelName); // 🎯 নির্দিষ্ট চ্যানেল আনসাবস্ক্রাইব করা হলো
      // ❌ pusher.disconnect(); 👈 এই লাইনটি কেটে দেওয়া হলো যাতে কানেকশন ড্রপ না করে
    };
  }, [activePatient, currentDoctor?.id]);

  // অটো স্ক্রোল টু বটম
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // মেসেজ পাঠানো
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const patientId = activePatient.patientId || activePatient._id || activePatient.patientPhone;
    
    if (!typedMessage.trim() || !patientId) return;

    const messageText = typedMessage.trim();
    setTypedMessage("");

    const tempMessage = {
      senderId: currentDoctor.id,
      receiverId: patientId,
      message: messageText,
      text: messageText, 
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: currentDoctor.id,
          receiverId: patientId, 
          message: messageText,
          text: messageText, 
        }),
      });
      const result = await res.json();
      if (!result.success) {
        toast.error("মেসেজটি পাঠানো যায়নি");
      }
    } catch (error) {
      toast.error("নেটওয়ার্ক ত্রুটি, আবার চেষ্টা করুন");
    }
  };

  const filteredChats = chatList.filter((p) => 
    p.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.patientEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="sc-card space-y-3">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">Chat with your patients</p>
          </div>
          <input 
            type="text" 
            placeholder="Search patient..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm bg-background text-foreground placeholder:text-muted-foreground px-3.5 py-2.5 rounded-2xl border border-border focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
          />
        </div>

        <div className="sc-card p-0 overflow-hidden h-[520px] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Loading...</div>
          ) : filteredChats.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No patients found</div>
          ) : (
            <div className="divide-y divide-border/70">
              {filteredChats.map((chat) => {
                const chatPatientId = chat.patientId || chat._id;
                const currentActiveId = activePatient?.patientId || activePatient?._id;
                const isSelected = currentActiveId === chatPatientId;

                return (
                  <button 
                    key={chat._id} 
                    onClick={() => handleLaunchChat(chat)}
                    className={`w-full text-left p-4 transition flex items-center justify-between ${isSelected ? 'bg-accent/60' : 'hover:bg-accent/40'}`}
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{chat.patientName}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{chat.patientEmail}</p>
                    </div>
                    <span className="text-xs font-medium text-primary">Chat</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="lg:col-span-2"
      >
        {activePatient ? (
          <div className="sc-card p-0 h-[600px] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{activePatient.patientName}</h2>
                <p className="text-xs text-muted-foreground">{activePatient.patientEmail} {activePatient.patientPhone ? `• ${activePatient.patientPhone}` : ""}</p>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-background/40">
              {messages.map((msg, idx) => {
                const isMe = msg.senderId === currentDoctor.id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md px-3.5 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-card text-foreground border border-border rounded-bl-md'}`}>
                      {msg.message || msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-border flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 text-sm bg-background text-foreground placeholder:text-muted-foreground px-3.5 py-2.5 rounded-2xl border border-border focus:outline-none focus:ring-1 focus:ring-primary/40 transition"
              />
              <button type="submit" className="bg-primary text-primary-foreground font-medium px-4 py-2.5 rounded-2xl text-sm hover:opacity-90 transition">
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="sc-card h-[600px] flex flex-col justify-center items-center text-center">
            <MessageSquare className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Select a patient from the list to start chatting.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}