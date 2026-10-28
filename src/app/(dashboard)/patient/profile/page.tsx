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
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your personal information and medical details.</p>
      </div>

      {/* 🛠️ পেশেন্ট ক্লায়েন্ট ফর্ম */}
      <PatientProfile initialData={patientProfile} />
    </div>
  );
}