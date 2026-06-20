import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";

// 🔎 ১. অ্যাডমিনের প্রোফাইল ডাটা গেট (GET) করার রাউট
export async function GET(request: Request) {
  try {
    // 💡 আপনার অথেন্টিকেশন (BetterAuth) থেকে কারেন্ট লগইনড ইউজারের ইমেইল নিতে হবে।
    // এখানে কুয়েরি প্যারামিটার বা সেশন থেকে ইমেইলটি নেওয়া হচ্ছে (টেস্টিং এর জন্য কুয়েরি প্যারামিটার বেস্ট)
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // ডাটাবেজের 'user' বা 'users' কালেকশন থেকে অ্যাডমিনকে খোঁজা হচ্ছে
    const adminData = await db.collection("user").findOne({ email: email });

    if (!adminData) {
      // যদি কালেকশনের নাম 'users' হয় তার জন্য ব্যাকআপ চেক
      const backupCheck = await db.collection("users").findOne({ email: email });
      if (!backupCheck) {
        return NextResponse.json({ success: false, message: "Admin profile not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, admin: backupCheck }, { status: 200 });
    }

    return NextResponse.json({ success: true, admin: adminData }, { status: 200 });
  } catch (error: any) {
    console.error("Admin Profile Fetch Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

// 🚀 ২. অ্যাডমিনের প্রোফাইল ডাটা আপডেট (PUT) করার রাউট
export async function PUT(request: Request) {
  try {
    const { email, name, phone, image } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Admin email is required to update" }, { status: 400 });
    }

    // আপডেট করার অবজেক্ট তৈরি
    const updateFields: any = {
      updatedAt: new Date()
    };
    
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (image) updateFields.image = image;

    // BetterAuth কালেকশনে ডাটা আপডেট করা (প্রথমে 'user' কালেকশন ট্রাই করবে)
    let result = await db.collection("user").updateOne(
      { email: email },
      { $set: updateFields }
    );

    // যদি 'user' কালেকশনে না পেয়ে 'users' কালেকশনে থাকে
    if (result.matchedCount === 0) {
      result = await db.collection("user").updateOne(
        { email: email },
        { $set: updateFields }
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: "Admin account not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Admin profile updated successfully", 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Admin Profile Update Error:", error);
    return NextResponse.json({ success: false, message: "Failed to update profile" }, { status: 500 });
  }
}