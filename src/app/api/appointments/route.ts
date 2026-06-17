import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { db } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      doctorId, 
      monthStr,         
      dateStr,          
      dayName,          
      serialNumber,     
      patientName, 
      patientEmail,
      appointmentType,
      consultationType
    } = body;

    const doctorsCollection = db.collection("doctors");

    // মঙ্গোডিবির ডাইনামিক নেস্টেড পাথ তৈরি
    const basePath = `bookedSchedules.${monthStr}.${dateStr}`;

    // চেক করা: সিরিয়ালটি অলরেডি বুকড কি না
    const doctor = await doctorsCollection.findOne({ _id: new ObjectId(doctorId) });
    if (!doctor) {
      return NextResponse.json({ success: false, message: "Doctor not found" }, { status: 404 });
    }

    const existingSerials = doctor?.bookedSchedules?.[monthStr]?.[dateStr]?.serials || [];
    if (existingSerials.includes(serialNumber)) {
      return NextResponse.json({ success: false, message: "This serial is already booked!" }, { status: 400 });
    }

    // মঙ্গোডিবির নেটিভ আপডেট কোয়েরি
    await doctorsCollection.updateOne(
      { _id: new ObjectId(doctorId) },
      {
        $set: {
          [`${basePath}.day`]: dayName
        },
        $push: {
          [`${basePath}.serials`]: serialNumber,
          [`${basePath}.patientDetails`]: {
            serial: serialNumber,
            name: patientName,
            email: patientEmail,
            appointmentType,
            consultationType,
            status: "pending",
            bookedAt: new Date()
          }
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Booking successfully saved!" });

  } catch (error: any) {
    console.error("MongoDB native update error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}