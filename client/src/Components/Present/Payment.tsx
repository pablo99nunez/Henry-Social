import { useStripe } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";

export default function Payment() {
  useEffect(() => {
    const stripe = useStripe();
    if (!stripe) {
      return;
    }
    stripe
      .redirectToCheckout({
        lineItems: [
          {
            price: "price_1KXWElLGYRECuQlukQBSkY6p",
            quantity: 1,
          },
        ],
        mode: "payment",
        successUrl: "http://localhost:3000/success",
        cancelUrl: "http://localhost:3000/error",
      })
      .then((res) => {
        if (res.error) console.log(res.error.message);
      });
  }, []);
  return <div>Payment</div>;
}
