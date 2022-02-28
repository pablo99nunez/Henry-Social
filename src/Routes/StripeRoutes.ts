import { Router } from "express";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const router = Router();

const url = "http://localhost:3000";

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1KXWElLGYRECuQlukQBSkY6p",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${url}/`,
    cancel_url: `${url}/`,
  });
  res.json({ url: session.url });
});

router.get("/total-revenue", async (req, res) => {
  const balanceTransactions = await stripe.balanceTransactions.list({
    limit: 3,
  });

  const amountTotal = balanceTransactions.data.reduce((a: any, b: any) => ({
    amount: a.amount + b.amount,
  })).amount;
  res.json(amountTotal / 100);
});

export default router;
