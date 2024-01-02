import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!);
    let { priceID, quantity } = await req.json();
    const session = await stripe.checkout.sessions.create({
         line_items: [{
            price: priceID,
            quantity
         }],
         mode: "payment",
         success_url: "http://localhost:3000/app",
         cancel_url: "http://localhost:3000/app"
    });

    return NextResponse.json(session.url);
}