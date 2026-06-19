import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const userEmail = session.user.email.toLowerCase();
    
    // ১. ইউজার কালেকশন থেকে পেশেন্টের আইডি এবং ফোন নাম্বার দুটাই রিড করা হচ্ছে
    const authUser = await db.collection("user").findOne({ 
      email: { $regex: new RegExp(`^${userEmail}$`, "i") } 
    });
    
    if (!authUser) return NextResponse.json({ success: false, error: "Profile missing" }, { status: 404 });

    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get("partnerId"); // এটি ডক্টর ইলিয়াসের আইডি

    const myId = authUser._id.toString(); // সিফাতের আইডি ("6a338dbb1bac8ec275d9f00b")
    const myPhone = authUser.phone || "01325465768"; // আপনার ডাটাবেজের ফোন নাম্বার ফলব্যাকসহ

    // ২. ম্যাজিক কোয়েরি: আইডি অথবা ফোন নাম্বার—যেটাই ম্যাচ করুক চ্যাট হিস্ট্রিতে চলে আসবে
    const messages = await db.collection("messages")
      .find({
        $or: [
          // কেইস ক: সিফাত পাঠিয়েছে ইলিয়াসকে (ID to ID)
          { senderId: myId, receiverId: partnerId },
          
          // কেইস খ: ইলিয়াস পাঠিয়েছে সিফাতকে কিন্তু রিসিভার আইডি হিসেবে সিফাতের আইডি ব্যবহার করেছে
          { senderId: partnerId, receiverId: myId },
          
          // কেইস গ: ইলিয়াস পাঠিয়েছে সিফাতকে কিন্তু রিসিভার আইডি হিসেবে সিফাতের ফোন নাম্বার ব্যবহার করেছে (যা আপনার ডাটাবেজে ঘটছে)
          { senderId: partnerId, receiverId: myPhone }
        ]
      })
      .sort({ timestamp: 1 }) // নতুন মেসেজ নিচে এবং পুরানো মেসেজ উপরে থাকবে
      .toArray();

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}