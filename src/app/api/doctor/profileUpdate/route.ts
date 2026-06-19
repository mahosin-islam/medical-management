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

    // মঙ্গোডিবি আপডেট অপারেশন (যদি ডাটা না থাকে তবে নতুন ডক্টর প্রোফাইল তৈরি হবে - upsert)
    await db.collection("doctors").updateOne(
      { email: { $regex: new RegExp(`^${userEmail}$`, "i") } },
      {
        $set: {
          name: body.name,
          degree: body.degree,
          specialty: body.specialty,
          hospital: body.hospital,
          experience: Number(body.experience) || 0,
          specialization: body.specialization || [],
          "bioDetails.consultationFee": Number(body.consultationFee) || 0,
          "bioDetails.about": body.about,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}