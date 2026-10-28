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
    <div className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">Messages</h1>
        <p className="text-sm text-muted-foreground mt-1">Chat with your doctors from completed consultations.</p>
      </div>

      {/* 💬 মেইন চ্যাট ইন্টারফেস কন্টেইনার */}
      <div className="flex-1 min-h-0">
        <PatientChatContainer allowedDoctors={allowedDoctors} patientId={patientIdString} />
      </div>
    </div>
  );
}