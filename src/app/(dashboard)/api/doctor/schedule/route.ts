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
        const { email, clinicAddress, consultationFee, availableDays, startTime, endTime, maxPatients, nextMonthsToSchedule, isClosed } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        console.log("scheduleami", email);

        await connectDB();
        const db = client.db();

        const updateResult = await db.collection("doctors").updateOne(
            { email: email },
            {
                $set: {
                    bioDetails: {
                        clinicAddress: clinicAddress || "",
                        consultationFee: Number(consultationFee) || 500,
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

        return NextResponse.json({ message: "শিডিউল সফলভাবে আপডেট হয়েছে!" }, { status: 200 });
    } catch (error: any) {
        console.error("Schedule PUT Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}