import Stripe from "stripe";
import { headers } from "next/headers";
import Cors from "micro-cors";
import { Metadata } from "@stripe/stripe-js";
import { DocumentData } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebaseAdmin";

const cors = Cors({
    allowMethods: ["POST", "HEAD"]
});

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!);

    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);

    if (event.type === "checkout.session.completed") {
        const { userID, quantity } = event.data.object.metadata as Metadata;

        const userDoc = db.collection("users").doc(userID);
        const userData = (await userDoc.get()).data() as DocumentData;

        db.collection("users")
            .doc(userID)
            .update({ 
                tokens: parseInt(userData.tokens + "") + parseInt(quantity)
            })
    }

    return NextResponse.json({ ok: true });
}