import Stripe from "stripe";

export const createCheckoutSession = async ({ customer_email, line_items,metadata }) => {
  const stripe = new Stripe(
    process.env.STRIPE_SK
  );
  const paymentData = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    metadata,
    customer_email,
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.FAILED_URL,
    line_items,
  });

  

  return paymentData;
};
