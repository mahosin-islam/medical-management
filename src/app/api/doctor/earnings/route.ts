import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const selectedMonth = searchParams.get("month"); // ফ্রন্টএন্ড থেকে আসা মাস (যেমন: "June 2026")

    if (!doctorId) {
      return NextResponse.json({ success: false, error: "Doctor ID missing" }, { status: 400 });
    }

    let doctorObjectId;
    try {
      doctorObjectId = new ObjectId(doctorId);
    } catch (e) {
      doctorObjectId = null;
    }

    // ১. বেসিক ম্যাচ কন্ডিশন (ডক্টর আইডি এবং পেইড অ্যামাউন্ট)
    const baseMatch: any = {
      $and: [
        {
          $or: [
            { doctorId: doctorId },
            ...(doctorObjectId ? [{ doctorId: doctorObjectId }] : [])
          ]
        },
        { paidAmount: { $gt: 0 } }
      ]
    };

    // ২. ডক্টর যদি কোনো নির্দিষ্ট মাস সিলেক্ট করেন, তবে সেই মাসের ফিল্টার যোগ হবে
    if (selectedMonth) {
      baseMatch.$and.push({ month: selectedMonth });
    }

    // ৩. ফিল্টার করা মাসের টোটাল ইনকাম ও টোটাল রোগী ক্যালকুলেশন
    const statsData = await db.collection("appointments").aggregate([
      { $match: baseMatch },
      { $group: { _id: null, total: { $sum: "$paidAmount" }, count: { $sum: 1 } } }
    ]).toArray();

    const totalEarnings = statsData[0]?.total || 0;
    const totalPatients = statsData[0]?.count || 0;

    // ৪. ডক্টরের ডাটাবেজে থাকা সব ইউনিক মাসের লিস্ট (ড্রপডাউনে দেখানোর জন্য)
    const availableMonths = await db.collection("appointments").distinct("month", {
      $or: [
        { doctorId: doctorId },
        ...(doctorObjectId ? [{ doctorId: doctorObjectId }] : [])
      ]
    });

    // ৫. চার্টের জন্য ডেটা (সিলেক্টেড মাসের ট্রানজেকশন ডেটা ডে-ওয়াইজ বা ওভারঅল সামারি)
    const monthlyBreakdown = await db.collection("appointments").aggregate([
      { $match: baseMatch },
      {
        $group: {
          _id: "$date", // তারিখ অনুযায়ী গ্রাফের বার (Bar) তৈরি হবে (যেমন: 2026-06-19)
          earnings: { $sum: "$paidAmount" }
        }
      },
      { $sort: { _id: 1 } }
    ]).toArray();

   const chartData = monthlyBreakdown.map((item: any) => ({
  name: item._id, // তারিখ
  Amount: item.earnings
}));

    // ৬. ওই মাসের ট্রানজেকশন টেবিল ডাটা
    const recentTransactions = await db.collection("appointments")
      .find(baseMatch)
      .sort({ bookedAt: -1 })
      .project({
        patientName: 1,
        patientEmail: 1,
        paidAmount: 1,
        date: 1,
        paymentStatus: 1
      })
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        totalEarnings,
        totalPatients,
        chartData,
        recentTransactions,
        availableMonths: availableMonths.sort() // মাসগুলো সর্ট করে পাঠানো
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}