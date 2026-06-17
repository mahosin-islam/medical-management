import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// 🌟 ১. বিল্ড সেফটির জন্য এনভায়রনমেন্ট ভ্যারিয়েবল চেক ও ক্লায়েন্ট ইনিশিয়ালাইজেশন ডিফেন্সিভ করা
const uri = process.env.MONGODB_URL;

// ডেপ্লয়মেন্টে বিল্ড টাইমে ক্র্যাশ আটকাতে রানটাইমে ক্লায়েন্ট তৈরি করার লজিক
let client: MongoClient | null = null;

function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URL env variable is missing! Please configure it in Vercel.");
  }
  if (!client) {
    client = new MongoClient(uri);
  }
  return client;
}

// 🌟 ২. রুটটিকে ডাইনামিক রেন্ডারিং ফোর্স করা যাতে বিল্ড টাইমে স্ট্যাটিক ডেটা কালেকশন ট্রাই না করে
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, specialty, degree, image } = body;

    // ব্যাকএন্ড ভ্যালিডেশন চেক
    if (!name || !email || !specialty || !degree || !image) {
      return NextResponse.json(
        { error: "সবগুলো ফিল্ড সঠিকভাবে পূরণ করুন।" },
        { status: 400 }
      );
    }

    // রানটাইমে সেফলি মঙ্গোডিবি ক্লায়েন্ট গেট করা
    const mongoClient = getMongoClient();
    await mongoClient.connect();
    const db = mongoClient.db();
    
    const doctorsCollection = db.collection("doctors");

    // চেক করা—এই ইমেইলের কোনো ডাক্তার অলরেডি অ্যাডমিন অ্যাড করেছে কি না
    const existingDoctor = await doctorsCollection.findOne({ email });
    if (existingDoctor) {
      return NextResponse.json(
        { error: "এই ইমেইল দিয়ে অলরেডি একজন ডাক্তার তালিকায় যুক্ত আছেন।" },
        { status: 400 }
      );
    }

    // শুধুমাত্র 'doctors' কালেকশনে ডাক্তারের প্রফেশনাল প্রোফাইল তৈরি করা
    await doctorsCollection.insertOne({
      name,
      email, 
      specialty,
      degree,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "ডাক্তার সফলভাবে 'doctors' কালেকশনে যুক্ত করা হয়েছে!" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Admin Doctor Add Error:", error);
    return NextResponse.json(
      { error: error.message || "সার্ভারে কোনো সমস্যা হয়েছে।" }, 
      { status: 500 }
    );
  }
  // 💡 নোট: সার্ভারলেস আর্কিটেকচারে প্রতি রিকোয়েস্টে client.close() তুলে দেওয়া হয়েছে 
  // যাতে কানেকশন পুলিং ঠিক থাকে এবং Vercel বিল্ড সাকসেস হয়।
}