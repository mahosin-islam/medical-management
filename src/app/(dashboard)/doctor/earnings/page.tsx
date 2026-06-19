import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import DoctorEarningsClient from "./DoctorEarningsClient";


export default async function DoctorEarningsPage() {
  // 🔐 ১. কারেন্ট একটিভ সেশন চেক
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email.toLowerCase();

  // 🔎 ২. ডক্টর কালেকশন থেকে লগইন করা ডক্টরের আইডি বের করা
  const doctorData = await db.collection("doctors").findOne({
    email: { $regex: new RegExp(`^${userEmail}$`, "i") }
  });

  const currentDoctor = {
    id: doctorData ? doctorData._id.toString() : session.user.id.toString(),
    name: doctorData ? doctorData.name : (session.user.name || "Doctor"),
  };

  // 🎯 ৩. ডায়নামিক ক্লায়েন্ট কম্পোনেন্টে ডাটা পাস
  return <DoctorEarningsClient currentDoctor={currentDoctor} />;
}