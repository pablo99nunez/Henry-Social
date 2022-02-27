import axios from "axios";
import stripe from "stripe";

// const st = new stripe.Stripe(process.env.STRIPE_SECRET&&process.env.STRIPE_SECRET)

/* async function createAccount() {
  const account = await stripe.accounts.create({ type: "express" });
} */

(async () => {
  await axios("https://api.stripe.com/v1/products", {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET}`,
    },
  }).then((res) => console.log(res.data));
})();
