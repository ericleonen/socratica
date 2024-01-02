import Stripe from "stripe";
import { headers } from "next/headers";
import Cors from "micro-cors";

const cors = Cors({
    allowMethods: ["POST", "HEAD"]
});

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET!);

    const body = await req.text();
    const signature = headers().get("stripe-signature");
    const event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET_TEST!);

    if (event.type === "checkout.session.completed") {
        console.log("it worked!");
    }
}