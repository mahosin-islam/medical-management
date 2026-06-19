import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const patient = await db.collection("patients").findOne({ email: session.user.email.toLowerCase() });
    if (!patient) return NextResponse.json({ success: false, error: "Profile missing" }, { status: 404 });

    const { searchParams } = new URL(request.url);
    const partnerId = searchParams.get("partnerId"); // ডক্টরের আইডি

    const myId = patient._id.toString();

    // আমি তাকে পাঠিয়েছি অথবা সে আমাকে পাঠিয়েছে—এমন সব মেসেজ সর্ট করে আনা
    const messages = await db.collection("messages")
      .find({
        $or: [
          { senderId: myId, receiverId: partnerId },
          { senderId: partnerId, receiverId: myId }
        ]
      })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}