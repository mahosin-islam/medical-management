import { NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// 🔎 ১. সব ইউজারদের ডাটা নিয়ে আসার রাউট
export async function GET() {
  try {
    // BetterAuth সাধারণত 'users' কালেকশনে ডাটা রাখে
    const usersData = await db.collection("user").find({}).sort({ createdAt: -1 }).toArray();

    const formattedUsers = usersData.map((user: any) => ({
      id: user._id.toString(),
      name: user.name || "No Name",
      email: user.email,
      role: user.role || "patient", // ডিফাল্ট রোল না থাকলে 'patient'
      image: user.image || "",
    }));

    return NextResponse.json({ success: true, users: formattedUsers }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch users" }, { status: 500 });
  }
}

// 🚀 ২. ইউজারের রোল (Patient <=> Doctor) চেঞ্জ করার রাউট
export async function PATCH(request: Request) {
  try {
    const { userId, newRole } = await request.json();

    if (!userId || !newRole) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // ডাটাবেজে রোল আপডেট করা হচ্ছে
    const result = await db.collection("user").updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole, updatedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "User not found or role unchanged" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Role updated to ${newRole} successfully` }, { status: 200 });
  } catch (error: any) {
    console.error("Update role error:", error);
    return NextResponse.json({ success: false, message: "Failed to update role" }, { status: 500 });
  }
}