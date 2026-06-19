import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL as string;
if (!uri) {
  throw new Error("Please add your MONGODB_URL to .env.local or Vercel Environment Variables");
}

let client: MongoClient;
let db: any;

// Next.js Dev মোডে বারবার রিলোড হলে যেন নতুন কানেকশন তৈরি না হয়, সেজন্য global ক্যাশ ব্যবহার করা
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClient) {
    (global as any)._mongoClient = new MongoClient(uri);
  }
  client = (global as any)._mongoClient;
} else {
  // প্রোডাকশনে (Vercel) একটিমাত্র গ্লোবাল কানেকশন তৈরি হবে
  client = new MongoClient(uri);
}

// আপনার ডাটাবেজের মেইন গেটওয়ে
db = client.db();

// এগুলো এখন প্রজেক্টের যেকোনো জায়গা থেকে ইমপোর্ট করা যাবে
export { client, db };