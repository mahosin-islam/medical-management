import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { appointmentId, collectAmount } = body;

    if (!appointmentId || !collectAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ১. মঙ্গোডিবি থেকে ইউনিক আইডি দিয়ে কারেন্ট অ্যাপয়েন্টমেন্ট খুঁজে বের করা
    const appointment = await db.collection("appointments").findOne({ _id: new ObjectId(appointmentId) });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    // ২. নতুন পেমেন্ট ও ডিউ ক্যালকুলেশন
    const newPaidAmount = appointment.paidAmount + Number(collectAmount);
    const newDueAmount = appointment.totalFee - newPaidAmount;
    const newPaymentStatus = newDueAmount <= 0 ? "paid" : "partial";

    // ৩. ডাটাবেজে ইউনিক আইডি ধরে সরাসরি আপডেট করা
    await db.collection("appointments").updateOne(
      { _id: new ObjectId(appointmentId) },
      {
        $set: {
          paidAmount: newPaidAmount,
          dueAmount: newDueAmount < 0 ? 0 : newDueAmount, // মাইনাস ভ্যালু রোধ করতে
          paymentStatus: newPaymentStatus,
        },
      }
    );

    return NextResponse.json({ success: true, message: "Payment updated successfully" });
  } catch (error) {
    console.error("Update due error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}