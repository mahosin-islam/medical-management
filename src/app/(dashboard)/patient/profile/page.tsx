import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import PatientProfile from "./PatientProfile";

export default async function PatientProfilePage() {
  // 🔐 Better-Auth সেশন ভেরিফিকেশন
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email.toLowerCase();

  // 🔎 মঙ্গোডিবি থেকে পেশেন্ট প্রোফাইল ডাটা ফেচ
  const patientData = await db.collection("patients").findOne({
    email: { $regex: new RegExp(`^${userEmail}$`, "i") }
  });

  // ক্লায়েন্ট ফরমে পাস করার জন্য ক্লিন অবজেক্ট ফরম্যাট
  const patientProfile = {
    id: patientData ? patientData._id.toString() : "",
    name: patientData ? patientData.name : (session.user.name || ""),
    email: userEmail,
    image: patientData ? patientData.image : (session.user.image || ""),
    phone: patientData?.phone || "",
    bloodGroup: patientData?.bloodGroup || "",
    age: patientData?.age || "",
    gender: patientData?.gender || "",
    address: patientData?.address || "",
    medicalNotes: patientData?.medicalNotes || "", // অপশনাল লং টেক্সট (অ্যালার্জি বা ক্রনিক ডিজিজ)
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Patient Profile Settings</h1>
        <p className="text-xs text-zinc-500">আপনার ব্যক্তিগত তথ্য, কন্ট্যাক্ট এবং জরুরি মেডিকেল রেকর্ডস আপডেট করে রাখুন।</p>
      </div>

      {/* 🛠️ পেশেন্ট ক্লায়েন্ট ফর্ম */}
      <PatientProfile initialData={patientProfile} />
    </div>
  );
}