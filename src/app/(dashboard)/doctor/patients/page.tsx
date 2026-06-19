import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { db } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import MyPatientsClient from "./MyPatientsClient";

export default async function MyPatientsPage() {
  // 🔐 কারেন্ট একটিভ সেশন চেক
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email.toLowerCase();

  // 🔎 ডক্টর কালেকশন থেকে লগইন করা ইউজারের প্রোফাইল আইডি খুঁজে বের করা
  const doctorData = await db.collection("doctors").findOne({ 
    email: { $regex: new RegExp(`^${userEmail}$`, "i") } 
  });

  const currentDoctor = {
    id: doctorData ? doctorData._id.toString() : session.user.id.toString(),
    name: doctorData ? doctorData.name : (session.user.name || "Doctor"),
  };

  return <MyPatientsClient currentDoctor={currentDoctor} />;
}