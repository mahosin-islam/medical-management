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
   console.log("email",email)
    await connectDB();
    const db = client.db();
    
    // 🎯 আপনার থিংকিং অনুযায়ী লগইন করা ইমেইল দিয়ে ডাটাবেজে খোঁজা হচ্ছে
    const doctor = await db.collection("doctors").findOne({ email });
    console.log("doct",doctor)

    // যদি এই ইমেইলে কোনো ডাক্তারই না থাকে
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found in collection" }, { status: 404 });
    }

    // 🎯 ফিক্স: ডাক্তার যদি থাকে, কিন্তু তার bioDetails বা scheduleConfig না থাকে,
    // তবে ক্র্যাশ এড়াতে অবজেক্টগুলো ব্যাকএন্ড থেকেই ডিফাইন করে রেসপন্স পাঠানো হচ্ছে।
    const responseData = {
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      degree: doctor.degree,
      image: doctor.image,
      bioDetails: doctor.bioDetails || {
        clinicAddress: "",
        consultationFee: 500
      },
      scheduleConfig: doctor.scheduleConfig || {
        availableDays: [],
        startTime: "",
        endTime: "",
        maxPatients: 20,
        nextMonthsToSchedule: 1,
        isClosed: false
      }
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}