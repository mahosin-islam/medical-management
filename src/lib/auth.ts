
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: { 
        enabled: true, 
    }, 
    // 🌟 ১. এখানে কাস্টম রোল ফিল্ড যুক্ত করা হলো
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false, // true দিতে পারেন, তবে ডিফল্ট ভ্যালু থাকলে false রাখাই নিরাপদ
                defaultValue: "patient", // সাইন-আপের সময় রোল না পাঠালে অটোমেটিক 'patient' সেট হবে
            },
        },
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIEN_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});