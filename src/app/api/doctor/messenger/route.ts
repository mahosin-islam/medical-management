import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    if (!doctorId) {
      return NextResponse.json({ success: false, error: "Doctor ID missing" }, { status: 400 });
    }

    let doctorObjectId;
    try {
      doctorObjectId = new ObjectId(doctorId);
    } catch (e) {
      doctorObjectId = null;
    }

    // 🎯 Aggregation Pipeline ব্যবহার করে appointments এবং user কালেকশন মার্জ করা হচ্ছে
    const chatPatients = await db.collection("appointments").aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { doctorId: doctorId },
                ...(doctorObjectId ? [{ doctorId: doctorObjectId }] : [])
              ]
            },
            {
              $or: [
                { dueAmount: 0 },
                { dueAmount: "0" },
                { status: "completed" },
                { paymentStatus: "paid" },
                { paymentStatus: "partial" }
              ]
            }
          ]
        }
      },
      {
        $sort: { bookedAt: -1 } // লেটেস্ট অ্যাপয়েন্টমেন্ট ওপরে রাখার জন্য
      },
      {
        $group: {
          _id: { $toLower: "$patientEmail" }, // ইমেইল অনুযায়ী ডুপ্লিকেট রিমুভ করা হচ্ছে
          patientName: { $first: "$patientName" },
          patientEmail: { $first: "$patientEmail" },
          patientPhone: { $first: "$patientPhone" },
          appointmentId: { $first: "$_id" }
        }
      },
      // 🎯 ম্যাজিক পার্ট: 'user' কালেকশন থেকে ইমেইল মিলিয়ে পেশেন্টের আসল Better-Auth ডাটা আনা হচ্ছে
      {
        $lookup: {
          from: "user", // আপনার কালেকশনের নাম 'users' হলে এখানে "users" লিখে দিবেন
          let: { email: "$patientEmail" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [ { $toLower: "$email" }, { $toLower: "$$email" } ]
                }
              }
            }
          ],
          as: "authUserData"
        }
      },
      {
        $unwind: {
          path: "$authUserData",
          preserveNullAndEmptyArrays: true // যদি কোনো কারণে ইউজার কালেকশনে ডাটা না থাকে তাও যেন ক্র্যাশ না করে
        }
      },
      {
        $project: {
          _id: "$appointmentId", // চ্যাট লিস্টের UI লুপের জন্য ইউনিক কী
          patientName: 1,
          patientEmail: 1,
          patientPhone: 1,
          // 🆔 Better-Auth থেকে আসা আসল ইউজার আইডি স্ট্রিং আকারে পাঠানো হচ্ছে
          patientId: { $toString: "$authUserData._id" } 
        }
      }
    ]).toArray();

    return NextResponse.json({ success: true, data: chatPatients });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}