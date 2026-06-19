import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    // সেশন ইউজারের পেশেন্ট আইডি বের করা
    const patient = await db.collection("patients").findOne({ email: session.user.email.toLowerCase() });
    if (!patient) return NextResponse.json({ success: false, error: "Patient profile missing" }, { status: 404 });

    const { receiverId, text } = await request.json();

    const newMessage = {
      senderId: patient._id.toString(), // পেশেন্ট পাঠাচ্ছে
      receiverId: receiverId, // ডক্টরের আইডি
      text,
      createdAt: new Date(),
    };

    await db.collection("messages").insertOne(newMessage);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}