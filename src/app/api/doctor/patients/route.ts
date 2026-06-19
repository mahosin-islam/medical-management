import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    if (!doctorId) {
      return NextResponse.json({ success: false, error: "Doctor ID is required" }, { status: 400 });
    }

    // 🔎 মঙ্গোডিবি এগ্রিগেশন কুয়েরি (ডক্টরের আইডি স্ট্রিং এবং অবজেক্ট আইডি উভয় ফরম্যাটেই হ্যান্ডেল করা হয়েছে)
    const patients = await db.collection("appointments").aggregate([
      { 
        $match: { 
          $or: [
            { doctorId: doctorId },
            { doctorId: ObjectId.isValid(doctorId) ? new ObjectId(doctorId) : null }
          ]
        } 
      },
      { $sort: { date: -1 } }, 
      {
        $group: {
          _id: "$patientPhone", // ফোন নাম্বার দিয়ে গ্রুপ করে ইউনিক করা হচ্ছে
          patientName: { $first: "$patientName" },
          patientPhone: { $first: "$patientPhone" },
          lastVisit: { $first: "$date" },
          totalVisits: { $sum: 1 } 
        }
      },
      { $sort: { lastVisit: -1 } } // লেটেস্ট ভিজিট করা রোগী সবার উপরে থাকবে
    ]).toArray();

    return NextResponse.json({ success: true, data: patients });

  } catch (error: any) {
    console.error("Error fetching my patients:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}