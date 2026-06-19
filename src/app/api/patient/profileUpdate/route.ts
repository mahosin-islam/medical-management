import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const userEmail = session.user.email.toLowerCase();

    // 🔄 মঙ্গোডিবিতে পেশেন্টের এক্সট্রা ডাটা আপসার্ট (Upsert) করা হচ্ছে
    await db.collection("patients").updateOne(
      { email: { $regex: new RegExp(`^${userEmail}$`, "i") } },
      {
        $set: {
          name: body.name,
          phone: body.phone,
          bloodGroup: body.bloodGroup,
          age: Number(body.age) || 0,
          gender: body.gender,
          address: body.address,
          medicalNotes: body.medicalNotes,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Patient profile updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}