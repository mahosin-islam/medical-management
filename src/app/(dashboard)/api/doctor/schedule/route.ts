import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await client.connect();
    isConnected = true;
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { 
            email, 
            clinicAddress, 
            consultationFee, 
            chamberPhone, // 🌟 নতুন
            experience,      // 🌟 নতুন
            hospital,        // 🌟 নতুন
            education,       // 🌟 নতুন
            specialization,  // 🌟 নতুন
            availableDays, 
            startTime, 
            endTime, 
            maxPatients, 
            nextMonthsToSchedule, 
            isClosed 
        } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        await connectDB();
        const db = client.db();

        const updateResult = await db.collection("doctors").updateOne(
            { email: email },
            {
                $set: {
                    // 🌟 রুট লেভেলের নতুন প্রফেশনাল ফিল্ডসমূহ সেভ করা হচ্ছে
                    experience: Number(experience) || 0,
                    hospital: hospital || "",
                    // যদি টেক্সট এরিয়া থেকে কমা দিয়ে ডাটা আসে, তবে অ্যারে বানিয়ে সেভ করবে, অন্যথায় খালি অ্যারে
                    education: Array.isArray(education) ? education : (education ? education.split(",").map((s: string) => s.trim()) : []),
                    specialization: Array.isArray(specialization) ? specialization : (specialization ? specialization.split(",").map((s: string) => s.trim()) : []),
                    
                    bioDetails: {
                        clinicAddress: clinicAddress || "",
                        consultationFee: Number(consultationFee) || 500,
                        chamberPhone: chamberPhone || "" // 🌟 চেম্বার কন্টাক্ট ফোন নাম্বার
                    },
                    scheduleConfig: {
                        availableDays: availableDays || [],
                        startTime: startTime || "",
                        endTime: endTime || "",
                        maxPatients: Number(maxPatients) || 20,
                        nextMonthsToSchedule: nextMonthsToSchedule || [], 
                        isClosed: Boolean(isClosed),
                    },
                    updatedAt: new Date(),
                },
            },
            { upsert: true }
        );

        return NextResponse.json({ message: "শিডিউল ও প্রোফাইল সফলভাবে আপডেট হয়েছে!" }, { status: 200 });
    } catch (error: any) {
        console.error("Schedule PUT Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}