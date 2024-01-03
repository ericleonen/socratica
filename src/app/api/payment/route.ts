import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_TEST!);
    let { priceID, quantity, userID } = await req.json();
    const session = await stripe.checkout.sessions.create({
         line_items: [{
            price: priceID,
            quantity
         }],
         mode: "payment",
         success_url: "http://localhost:3000/app",
         cancel_url: "http://localhost:3000/app",
         metadata: {
            quantity,
            userID
         }
    });

    return NextResponse.json(session.url);
}