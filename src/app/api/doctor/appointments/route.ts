import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const dateStr = searchParams.get("date"); // e.g. "2026-08-26" (Optional now)

    if (!doctorId) {
      return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
    }

    // 💡 ডাক্তার অবজেক্ট থেকে শিডিউল কনফিগারেশন আনা
    let doctorDoc = null;
    if (ObjectId.isValid(doctorId)) {
      doctorDoc = await db.collection("doctors").findOne({ _id: new ObjectId(doctorId) });
    }
    if (!doctorDoc) {
      doctorDoc = await db.collection("doctors").findOne({
        $or: [{ email: doctorId }, { name: doctorId }]
      });
    }

    // ক্যোয়ারী সেটআপ
    const query: any = {
      $or: [
        { doctorId: doctorId },
        { doctorId: ObjectId.isValid(doctorId) ? new ObjectId(doctorId) : null },
        { doctorEmail: doctorId },
        { doctorName: doctorId }
      ]
    };

    // যদি নির্দিষ্ট ডেট পাঠানো হয়
    if (dateStr) {
      query.date = dateStr;
    }

    const appointments = await db
      .collection("appointments")
      .find(query)
      .sort({ serialNumber: 1 })
      .toArray();

    const formatted = appointments.map((app: any) => ({
      ...app,
      _id: app._id.toString(),
      doctorId: app.doctorId?.toString() || doctorId,
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
      scheduleConfig: doctorDoc?.scheduleConfig || { availableDays: [] },
      bookedSchedules: doctorDoc?.bookedSchedules || {},
    }, { status: 200 });
  } catch (error) {
    console.error("Doctor fetch appointments error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ২. পেশেন্টের বকেয়া টাকা ও স্ট্যাটাস আপডেট করা
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