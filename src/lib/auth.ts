import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "@/lib/mongodb"; 

export const auth = betterAuth({

    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: { 
        enabled: true, 
    }, 
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "patient",
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