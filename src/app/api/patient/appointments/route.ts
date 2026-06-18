import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
    }

    // ইমেইল ম্যাচ করে সব অ্যাপয়েন্টমেন্ট খুঁজে বের করা (সবচেয়ে নতুন বুকিং আগে দেখাবে)
    const appointments = await db
      .collection("appointments")
      .find({ patientEmail: email })
      .sort({ bookedAt: -1 })
      .toArray();

    // মঙ্গোডিবির ObjectId-কে ফ্রন্টএন্ড ফ্রেন্ডলি স্ট্রিং-এ কনভার্ট করা
    const formattedAppointments = appointments.map((app: any) => ({
      ...app,
      _id: app._id.toString(),
      doctorId: app.doctorId ? app.doctorId.toString() : "",
    }));

    return NextResponse.json({ success: true, data: formattedAppointments }, { status: 200 });
  } catch (error) {
    console.error("Fetch patient appointments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}