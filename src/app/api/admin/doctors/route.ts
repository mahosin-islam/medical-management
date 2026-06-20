import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb"; // 🎯 আপনার প্রজেক্টের সঠিক mongodb ফাইলের পাথটি এখানে দিন (যেমন: @/lib/mongodb)

export async function GET() {
  try {
    // ১. আপনার এক্সিস্টিং 'db' গেটওয়ে ব্যবহার করে 'doctors' কালেকশন থেকে সব ডাটা আনা হচ্ছে
    // নতুন ডাক্তারদের আগে দেখানোর জন্য _id: -1 দিয়ে sort করা হয়েছে
    const doctorsData = await db.collection("doctors").find({}).sort({ _id: -1 }).toArray();

    // ২. মঙ্গোডিবির অবজেক্ট আইডি (_id) এবং বাকি ডাটাকে ফ্রন্টএন্ড টেবিলের ফরম্যাটের সাথে ম্যাপ করা
    const formattedDoctors = doctorsData.map((doc: any) => ({
      id: doc._id.toString(), // মঙ্গোডিবির ObjectId কে স্ট্রিং এ কনভার্ট করা হলো
      name: doc.name || "",
      email: doc.email || "",
      phone: doc.phone || "",
      specialty: doc.specialty || "",
      experience: doc.experience || "",
      degree: doc.degree || "",
      bio: doc.bio || "",
      image: doc.image || "",
      status: doc.status || "Active", // স্ট্যাটাস না থাকলে ডিফল্ট Active
    }));

    // ৩. সাকসেস রেসপন্স পাঠানো
    return NextResponse.json({ success: true, doctors: formattedDoctors }, { status: 200 });

  } catch (error: any) {
    console.error("ShifaCare Admin Doctors Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Database connection or fetch failed" },
      { status: 500 }
    );
  }
}