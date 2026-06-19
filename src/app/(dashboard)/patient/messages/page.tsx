import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import PatientChatContainer from "./PatientChatContainer";

export default async function PatientMessagesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.email) {
    redirect("/login");
  }

  const userEmail = session.user.email.toLowerCase();

  // 🎯 ১. 'user' কালেকশন থেকে সিফাতের মেইন আইডিটা তুলে নেওয়া (চ্যাট কন্টেইনারে পাস করার জন্য)
  const authUser = await db.collection("user").findOne({ 
    email: { $regex: new RegExp(`^${userEmail}$`, "i") } 
  });

  if (!authUser) {
    redirect("/");
  }

  const patientIdString = authUser._id.toString();

  // 🎯 ২. ফিক্স: patientId-র বদলে patientEmail দিয়ে completed অ্যাপয়েন্টমেন্ট খোঁজা হচ্ছে
  const completedAppointments = await db.collection("appointments").find({
    patientEmail: { $regex: new RegExp(`^${userEmail}$`, "i") }, // 👈 ইমেইল ম্যাচিং
    status: "completed"
  }).toArray();

  // 🎯 ৩. ডুপ্লিকেট রিমুভ করে ইউনিক ডাক্তারদের ম্যাপ করা
  const doctorMap = new Map();
  completedAppointments.forEach((app: any) => {
    // ডাক্তার আইডি অবজেক্ট আইডি বা স্ট্রিং যাই হোক, ওটাকে স্ট্রিং করে কি (Key) বানাচ্ছি
    const docIdStr = app.doctorId.toString();
    
    if (!doctorMap.has(docIdStr)) {
      doctorMap.set(docIdStr, {
        id: docIdStr,
        name: app.doctorName,
        specialty: app.doctorSpecialty || "Specialist",
        image: app.doctorImage || ""
      });
    }
  });

  const allowedDoctors = Array.from(doctorMap.values());

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 h-[calc(100vh-120px)] flex flex-col space-y-4">
      <div>
        <h1 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">Consultation Messages</h1>
        <p className="text-xs text-zinc-500">আপনার সম্পন্ন হওয়া (Completed) অ্যাপয়েন্টমেন্টের ডাক্তারদের সাথে চ্যাট করুন।</p>
      </div>

      {/* 💬 মেইন চ্যাট ইন্টারফেস কন্টেইনার */}
      <PatientChatContainer allowedDoctors={allowedDoctors} patientId={patientIdString} />
    </div>
  );
}