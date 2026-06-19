import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    // ১. Better-Auth সেশন থেকে লগইন থাকা ইউজারের ইমেইল নেওয়া হচ্ছে
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const patientEmail = session.user.email.toLowerCase();

    // ২. appointments কালেকশন থেকে এই পেশেন্টের সব বুকিং ডেটা খোঁজা হচ্ছে
    // এখানে $regex ব্যবহার করা হয়েছে যাতে বড়-ছোট হাতের অক্ষরে কোনো সমস্যা না হয়
    const appointments = await db.collection("appointments")
      .find({ 
        patientEmail: { $regex: new RegExp(`^${patientEmail}$`, "i") } 
      })
      .sort({ bookedAt: -1 }) // লেটেস্ট বুকিংগুলো সবার ওপরে দেখানোর জন্য
      .toArray();

    // ৩. সফলভাবে ডাটা রিটার্ন করা হচ্ছে
    return NextResponse.json({ success: true, data: appointments });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}