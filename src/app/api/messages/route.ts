import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { pusherServer } from "@/lib/pusher";


// 🚀 ১. আগের চ্যাট হিস্ট্রি লোড করা (GET)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const senderId = searchParams.get("senderId"); 
    const receiverId = searchParams.get("receiverId"); 

    if (!senderId || !receiverId) {
      return NextResponse.json({ success: false, error: "Sender or Receiver ID missing" }, { status: 400 });
    }

    const patientUser = await db.collection("user").findOne({
      $or: [
        { phone: receiverId },
        { email: { $regex: new RegExp(`^${receiverId}$`, "i") } }
      ]
    });
    
    const patientRealId = patientUser ? patientUser._id.toString() : null;

    const chatHistory = await db.collection("messages")
      .find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: senderId, receiverId: patientRealId },
          { senderId: patientRealId, receiverId: senderId },
          { senderId: receiverId, receiverId: senderId }
        ]
      })
      .sort({ timestamp: 1 }) 
      .toArray();

    return NextResponse.json({ success: true, data: chatHistory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 🚀 ২. নতুন মেসেজ পাঠানো (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderId, receiverId, message } = body;

    if (!senderId || !receiverId || !message?.trim()) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // 🎯 ডাটাবেজে মঙ্গো আইডি ট্র্যাকিং ফিক্স
    const patientUser = await db.collection("user").findOne({
      $or: [
        { phone: receiverId },
        { email: { $regex: new RegExp(`^${receiverId}$`, "i") } },
        { _id: receiverId }
      ]
    });
    const finalReceiverId = patientUser ? patientUser._id.toString() : receiverId.toString();

    const newMessage = {
      senderId: senderId.toString(),
      receiverId: finalReceiverId, 
      message: message.trim(),
      text: message.trim(), // 👈 সেফটি ফিল্ড (পেশেন্ট ক্যাশের জন্য)
      timestamp: new Date(),
    };

    await db.collection("messages").insertOne(newMessage);

    // 🚀 Pusher রিয়েল-টাইম ট্রিগার (পেশেন্টকে মেসেজ পুশ করবে)
    try {
      const channelName = `chat-${[senderId.toString(), finalReceiverId].sort().join("-")}`;
      await pusherServer.trigger(channelName, "new-message", {
        ...newMessage,
        _id: new Date().getTime().toString(),
      });
    } catch (pusherErr) {
      console.error("Pusher server trigger error:", pusherErr);
    }

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}