import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_TEST!);
    const prices = await stripe.prices.list({ limit: 1 });

    return NextResponse.json(prices.data);
}