import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import DoctorProfileForm from "./DoctorProfileForm"; // 👈 আমরা এখন তৈরি করব

export default async function DoctorDashboardProfile() {
  // 🔐 Better-Auth সেশন চেক
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email.toLowerCase();

  // 🔎 মঙ্গোডিবি থেকে ওই ডক্টরের প্রোফাইল ডাটা তুলে আনা
  const doctorData = await db.collection("doctors").findOne({
    email: { $regex: new RegExp(`^${userEmail}$`, "i") }
  });

  // ক্লায়েন্ট ফরমে পাস করার জন্য ডাটা ফরম্যাট করা
  const doctorProfile = {
    id: doctorData ? doctorData._id.toString() : "",
    name: doctorData ? doctorData.name : (session.user.name || ""),
    email: userEmail,
    image: doctorData ? doctorData.image : (session.user.image || ""),
    degree: doctorData?.degree || "",
    specialty: doctorData?.specialty || "",
    hospital: doctorData?.hospital || "",
    experience: doctorData?.experience || "",
    consultationFee: doctorData?.bioDetails?.consultationFee || "",
    about: doctorData?.bioDetails?.about || "",
    specialization: doctorData?.specialization || [],
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">My Profile Settings</h1>
        <p className="text-xs text-zinc-500">আপনার প্রফেশনাল প্রোফাইল, চেম্বার ফি এবং বায়ো আপডেট করুন যা রোগীরা দেখতে পাবে।</p>
      </div>

      {/* 🛠️ ক্লায়েন্ট ফরম কম্পোনেন্ট */}
      <DoctorProfileForm initialData={doctorProfile} />
    </div>
  );
}