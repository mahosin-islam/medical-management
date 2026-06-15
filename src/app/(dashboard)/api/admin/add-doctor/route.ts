import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, specialty, degree, image } = body;

    // ১. ব্যাকএন্ড ভ্যালিডেশন চেক
    if (!name || !email || !specialty || !degree || !image) {
      return NextResponse.json(
        { error: "সবগুলো ফিল্ড সঠিকভাবে পূরণ করুন।" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db();
    
    // 💡 এখানে শুধুমাত্র doctors কালেকশন ব্যবহার করা হচ্ছে, user কালেকশন নয়
    const doctorsCollection = db.collection("doctors");

    // ২. চেক করা—এই ইমেইলের কোনো ডাক্তার অলরেডি অ্যাডমিন অ্যাড করেছে কি না
    const existingDoctor = await doctorsCollection.findOne({ email });
    if (existingDoctor) {
      return NextResponse.json(
        { error: "এই ইমেইল দিয়ে অলরেডি একজন ডাক্তার তালিকায় যুক্ত আছেন।" },
        { status: 400 }
      );
    }

    // ৩. শুধুমাত্র 'doctors' কালেকশনে ডাক্তারের প্রফেশনাল প্রোফাইল তৈরি করা
    // এখানে কোনো userId বা Auth-এর ডেটা থাকবে না। এটা একদম ফ্রেশ এন্ট্রি।
    await doctorsCollection.insertOne({
      name,
      email, // এই ইউনিক ইমেইল দিয়েই ভবিষ্যতে ডাক্তার লগইন করলে ডেটা ম্যাচ হবে
      specialty,
      degree,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "ডাক্তার সফলভাবে 'doctors' কালেকশনে যুক্ত করা হয়েছে!" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Admin Doctor Add Error:", error);
    return NextResponse.json({ error: "সার্ভারে কোনো সমস্যা হয়েছে।" }, { status: 500 });
  } finally {
    // ডাটাবেজ কানেকশন ক্লোজ করা
    await client.close();
  }
}