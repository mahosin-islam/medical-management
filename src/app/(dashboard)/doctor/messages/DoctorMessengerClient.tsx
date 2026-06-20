"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  // Pusher রিয়েল-টাইম লিসেনার সাবস্ক্রিপশন
  useEffect(() => {
    const patientId = activePatient?.patientId || activePatient?._id || activePatient?.patientPhone;
    
    if (!patientId || !currentDoctor?.id) return;

// ✅ ১টি লাইনের সেফ ফিক্স (যা কখনো পেজ ক্র্যাশ করতে দেবে না):
const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY || "", {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2",
});

    const channelName = `chat-${[currentDoctor.id, patientId].sort().join("-")}`;
    const channel = pusher.subscribe(channelName);

    channel.bind("new-message", (data: any) => {
      setMessages((prev) => {
        // ডুপ্লিকেট মেসেজ প্রিভেনশন চেক (টেক্সট এবং মেসেজ উভয় ফিল্ডই চেক রাখা হলো)
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
      channel.unsubscribe();
      pusher.disconnect();
    };
    // 🎯 ফিক্স: ডিপেন্ডেন্সি অ্যারে সঠিকভাবে হ্যান্ডেল করা হলো যাতে চ্যাট সুইচ করলে লিসেনার না হারায়
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
      text: messageText, // 🎯 পেশেন্ট সাইডের স্কিমার সাথে ম্যাচ করানোর সেফটি ফিল্ড
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
          text: messageText, // 🎯 ব্যাকএন্ড চ্যাট রাউটে যদি 'text' ফিল্ড এক্সপেক্ট করে
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">Patients</h1>
            <p className="text-[11px] text-zinc-500">Mahoin পেইড রোগীদের চ্যাট লিস্ট</p>
          </div>
          <input 
            type="text" 
            placeholder="Search patient..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-zinc-50 dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none"
          />
        </div>

        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden h-[450px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-900">
          {loading ? (
            <div className="p-8 text-center text-xs text-zinc-500">লোড হচ্ছে...</div>
          ) : filteredChats.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400">📭 কোনো ইউজার নেই।</div>
          ) : (
            filteredChats.map((chat) => {
              // 🎯 একটিভ ট্র্যাকিং আইডি সিঙ্ক করা হলো
              const chatPatientId = chat.patientId || chat._id;
              const currentActiveId = activePatient?.patientId || activePatient?._id;
              const isSelected = currentActiveId === chatPatientId;

              return (
                <div 
                  key={chat._id} 
                  onClick={() => handleLaunchChat(chat)}
                  className={`p-4 cursor-pointer transition flex justify-between items-center ${isSelected ? 'bg-zinc-100 dark:bg-zinc-900' : 'hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40'}`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{chat.patientName}</h4>
                    <p className="text-[10px] text-zinc-500">{chat.patientEmail}</p>
                  </div>
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-500/10 text-blue-600 px-2 py-1 rounded-lg font-bold">Chat 💬</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        {activePatient ? (
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm h-[560px] flex flex-col justify-between overflow-hidden">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{activePatient.patientName}</h2>
                <p className="text-[10px] text-zinc-400">{activePatient.patientEmail} | {activePatient.patientPhone}</p>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-zinc-50/30 dark:bg-zinc-950/10">
              {messages.map((msg, idx) => {
                const isMe = msg.senderId === currentDoctor.id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-3 py-2 rounded-2xl text-xs shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-100 dark:border-zinc-800/60'}`}>
                      {/* 🎯 ফিক্স ১: এপিআই থেকে ডেটা 'text' বা 'message' যাই আসুক যেন ক্র্যাশ না করে */}
                      {msg.message || msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message here..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 text-xs bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none"
              />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                Send 🚀
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm h-[560px] flex flex-col justify-center items-center text-zinc-400 text-xs">
            📭 চ্যাট শুরু করতে বাম পাশের লিস্ট থেকে যেকোনো রোগীকে সিলেক্ট করুন।
          </div>
        )}
      </div>
    </div>
  );
}