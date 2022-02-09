import Stripe from "stripe";
import handler from "./util/handler";
import { calculatedCost } from "./util/cost";

export const main = handler(async (event) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculatedCost(storage);
    const description = "Scratch charge";

    // Load the secret key from the environment variables
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd",
    });

    return { status: true };
});