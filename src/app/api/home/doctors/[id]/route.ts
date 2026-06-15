import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await client.connect();
    isConnected = true;
}

// 🎯 ফিক্স: params কে Promise টাইপ দেওয়া হলো
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        // 🎯 ফিক্স: এপিআই-তেও params কে await করতে হবে
        const resolvedParams = await params;
        const { id } = resolvedParams;

        // আইডি ভ্যালিড কিনা চেক
        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid or missing Doctor ID" }, { status: 400 });
        }

        await connectDB();
        const db = client.db();

        const doctor = await db.collection("doctors").findOne({
            _id: new ObjectId(id)
        });

        if (!doctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }

        return NextResponse.json(doctor, { status: 200 });
    } catch (error: any) {
        console.error("Single Doctor Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}