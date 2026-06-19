import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || ""; // নাম বা হাসপাতালের জন্য সার্চ
    const specialty = searchParams.get("specialty") || ""; // ক্যাটাগরি ফিল্টার

    // 🎯 মঙ্গোডিবি ডায়নামিক কুয়েরি অবজেক্ট
    const filterConditions: any = {};

    // ১. টেক্সট সার্চ (নাম বা হাসপাতালের নামের আংশিক মিল চেক করবে - Case Insensitive)
    if (query) {
      filterConditions.$or = [
        { name: { $regex: query, $options: "i" } },
        { hospital: { $regex: query, $options: "i" } }
      ];
    }

    // ২. মঙ্গোডিবি অ্যারে ফিল্টার ($in ব্যবহার করে specialization অ্যারের ভেতরে চেক করা)
    if (specialty) {
      filterConditions.specialization = { $in: [specialty] };
    }

    const doctors = await db.collection("doctors")
      .find(filterConditions)
      .project({
        name: 1,
        degree: 1,
        specialty: 1,
        specialization: 1,
        image: 1,
        hospital: 1,
        experience: 1,
        "bioDetails.consultationFee": 1
      })
      .toArray();

    return NextResponse.json({ success: true, data: doctors });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}