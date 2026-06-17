import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await client.connect();
  isConnected = true;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    
    await connectDB();
    const db = client.db();
    
    const doctor = await db.collection("doctors").findOne({ email });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found in collection" }, { status: 404 });
    }

    // 🎯 ফিক্স ও ফিচার অ্যাড: নতুন প্রফেশনাল ফিল্ডগুলোর সেফটি ফালব্যাক সহ রেসপন্স তৈরি
    const responseData = {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      degree: doctor.degree,
      image: doctor.image,
      // 🌟 নতুন ডিরেক্ট প্রফেশনাল ফিল্ডস
      experience: Number(doctor.experience) || 0,
      hospital: doctor.hospital || "",
      education: doctor.education || [],
      specialization: doctor.specialization || [],
      
      bioDetails: doctor.bioDetails || {
        clinicAddress: "",
        consultationFee: 500,
        chamberPhone: "" // 🌟 নতুন ফিল্ড
      },
      scheduleConfig: doctor.scheduleConfig || {
        availableDays: [],
        startTime: "",
        endTime: "",
        maxPatients: 20,
        nextMonthsToSchedule: [],
        isClosed: false
      }
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}