import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      doctorId,
      doctorName,         // 👈 পেশেন্ট ড্যাশবোর্ডের জন্য ডক্টরের নামও সেভ করে রাখছি
      doctorPhone,        // 👈 ডক্টরের ফোন নম্বর
      monthStr,
      dateStr,
      dayName,
      serialNumber,
      patientName,
      patientEmail,
      patientPhone,
      paidAmountInput,    // 👈 পেশেন্ট কত টাকা ইনপুট দিল
      totalFee,           // 👈 ডক্টরের টোটাল ফি
      location,
      consultationType,
      appointmentType,
    } = body;

    // ১. মিনিমাম ৫০% পেমেন্ট ভ্যালিডেশন (ব্যাকএন্ড সেফটি)
    const minRequired = Number(totalFee) / 2;
    const paid = Number(paidAmountInput);
    
    if (paid < minRequired) {
      return NextResponse.json(
        { error: `You must pay at least 50% (${minRequired} Tk) of the total fee.` },
        { status: 400 }
      );
    }

    // ২. Due এবং Payment Status ক্যালকুলেশন
    const dueAmount = Number(totalFee) - paid;
    const paymentStatus = dueAmount === 0 ? "paid" : "partial";

    // ৩. নতুন অ্যাপয়েন্টমেন্ট অবজেক্ট (মঙ্গোডিবি এখানে অটোমেটিক ইউনিক _id জেনারেট করবে)
    const newAppointment = {
      doctorId: new ObjectId(doctorId),
      doctorName: doctorName || "Unknown Doctor",
      doctorPhone: doctorPhone || "N/A",
      patientName,
      patientEmail,
      patientPhone,
      location,
      consultationType,
      appointmentType,
      totalFee: Number(totalFee),
      paidAmount: paid,
      dueAmount: dueAmount,
      paymentStatus: paymentStatus,
      date: dateStr,
      month: monthStr,
      day: dayName,
      serialNumber: Number(serialNumber),
      status: "pending",
      bookedAt: new Date(),
    };

    // ৪. appointments কালেকশনে ডাটা ইনসার্ট
    const result = await db.collection("appointments").insertOne(newAppointment);

    // ৫. ডক্টরের শিডিউল আপডেট (আগের লজিক)
    const updateKey = `bookedSchedules.${monthStr}.${dateStr}`;
    await db.collection("doctors").updateOne(
      { _id: new ObjectId(doctorId) },
      {
        $addToSet: {
          [`${updateKey}.serials`]: Number(serialNumber)
        } as any
      }
    );

    return NextResponse.json(
      { success: true, appointmentId: result.insertedId },
      { status: 201 }
    );

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}