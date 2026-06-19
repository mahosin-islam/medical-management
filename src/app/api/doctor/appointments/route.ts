import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const dateStr = searchParams.get("date"); // e.g. "2026-06-18"

    if (!doctorId || !dateStr) {
      return NextResponse.json({ error: "Doctor ID and Date are required" }, { status: 400 });
    }

    // 💡 মেগা সেফ ক্যোয়ারী: doctorId যদি ইউজার আইডি, প্রোফাইল আইডি বা ইমেইলও হয়, সব ক্ষেত্রে ডাটা আসবে
    const query: any = {
      date: dateStr,
      $or: [
        { doctorId: doctorId },
        { doctorId: ObjectId.isValid(doctorId) ? new ObjectId(doctorId) : null },
        { doctorEmail: doctorId }, // যদি ফ্রন্টএন্ড থেকে আইডি-র জায়গায় ইমেইল পাস হয়
        { doctorName: doctorId }   // ব্যাকআপ হিসেবে নাম ম্যাচিং
      ]
    };

    const appointments = await db
      .collection("appointments")
      .find(query)
      .sort({ serialNumber: 1 })
      .toArray();

    // ObjectId-কে স্ট্রিংয়ে সেফ কনভার্ট করা
    const formatted = appointments.map((app: any) => ({
      ...app,
      _id: app._id.toString(),
      doctorId: app.doctorId?.toString() || doctorId,
    }));

    return NextResponse.json({ success: true, data: formatted }, { status: 200 });
  } catch (error) {
    console.error("Doctor fetch appointments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ২. পেশেন্টের বাকি টাকা ও স্ট্যাটাস আপডেট করা
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { appointmentId, totalFee } = body;

    if (!appointmentId || totalFee === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.collection("appointments").updateOne(
      { _id: new ObjectId(appointmentId) },
      {
        $set: {
          paidAmount: totalFee,
          dueAmount: 0,
          paymentStatus: "paid",
          status: "completed"
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Payment updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}