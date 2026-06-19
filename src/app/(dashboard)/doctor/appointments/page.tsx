import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { db } from "@/lib/mongodb";
import DoctorAppointmentsClient from "./DoctorAppointmentsClient";
import { redirect } from "next/navigation";

export default async function DoctorAppointmentsPage() {
  // 🔐 কারেন্ট একটিভ সেশন চেক
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ইউজার যদি লগইন না থাকে তবে তাকে সরাসরি রিডাইরেক্ট করা হবে
  if (!session?.user?.email) {
    redirect("/login");
  }
 

  const userEmail = session.user.email.toLowerCase();


  // 🔎 ডক্টর কালেকশন থেকে লগইন করা ইউজারের প্রোফাইল আইডি (...d299) খুঁজে বের করা হচ্ছে
  const doctorData = await db.collection("doctors").findOne({ 
    email: { $regex: new RegExp(`^${userEmail}$`, "i") } 
  });

  // যদি ডক্টর প্রোফাইল থাকে তবে প্রোফাইল আইডি যাবে, নয়তো ব্যাকআপ হিসেবে সেশন ইউজার আইডি যাবে
  const currentDoctor = {
    id: doctorData ? doctorData._id.toString() : session.user.id.toString(),
    name: doctorData ? doctorData.name : (session.user.name || "Doctor"),
  };

  // ক্লায়েন্ট কম্পোনেন্টে কারেন্ট ইউজারের ডাটা সেফলি পাস করা হলো
  return <DoctorAppointmentsClient currentDoctor={currentDoctor} />;
}