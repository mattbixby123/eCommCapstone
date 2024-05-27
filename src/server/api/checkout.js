// require('dotenv').config();
const router = require("express").Router();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'))

const stripe = require('stripe')(process.env.TEST_KEY)

router.post('/create-checkout-session', async (req, res) => {
  try {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.cartProducts.map(cartProduct => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: cartProduct.product.name
            },
            unit_amount: cartProduct.product.price*100
          },
          quantity: cartProduct.quantity
        }
      }),
      success_url: `${process.env.SERVER_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SERVER_URL}/cart?message=Your order was cancelled. Please try again.`
    });

    return res.json({ url: session.url })

  } catch (e) {
    if (!res.headersSent)
    res.status(500).json({ error: e.message })
  }
});


module.exports = router