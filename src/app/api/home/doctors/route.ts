import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await client.connect();
    isConnected = true;
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const db = client.db();

        // 🎯 লজিক: যেসব ডাক্তারদের শিডিউল কনফিগ আছে এবং ইমার্জেন্সি ক্লোজড করা নেই, শুধু তাদের আনা হবে
        const doctors = await db.collection("doctors")
            .find({
                "scheduleConfig": { $exists: true },
                "scheduleConfig.isClosed": { $ne: true }
            })
            .project({
                name: 1,
                email: 1,
                image: 1, // যদি প্রোফাইল পিকচার থাকে
                bioDetails: 1,
                scheduleConfig: 1
            })
            .toArray();

        return NextResponse.json(doctors, { status: 200 });
    } catch (error: any) {
        console.error("Home Doctors Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}