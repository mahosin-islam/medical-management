import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const userEmail = session.user.email.toLowerCase();
    const authUser = await db.collection("user").findOne({ 
      email: { $regex: new RegExp(`^${userEmail}$`, "i") } 
    });
    
    if (!authUser) return NextResponse.json({ success: false, error: "Patient profile missing" }, { status: 404 });

    const { receiverId, text } = await request.json();

    const myId = authUser._id.toString();

    const newMessage = {
      senderId: myId, // পেশেন্টের আইডি
      receiverId: receiverId, // ডক্টরের আইডি
      message: text, 
      text: text, // 👈 সেফটি ফিল্ড (উভয় ইউআই এর জন্য)
      timestamp: new Date(), 
    };

    await db.collection("messages").insertOne(newMessage);

    // 🚀 Pusher রিয়েল-টাইম ট্রিগার (ডক্টরকে মেসেজ পুশ করবে)
    try {
      const channelName = `chat-${[myId, receiverId].sort().join("-")}`;
      await pusherServer.trigger(channelName, "new-message", {
        ...newMessage,
        _id: new Date().getTime().toString(), // ইনস্ট্যান্ট কী-এর জন্য টেম্পোরারি আইডি
      });
    } catch (pusherErr) {
      console.error("Pusher trigger error:", pusherErr);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}