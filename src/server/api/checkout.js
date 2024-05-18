require('dotenv').config();
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
              name: cartProduct.name
            },
            unit_amount: cartProduct.price*100
          },
          quantity: cartProduct.quantity
        }
      }),
      success_url: `${process.env.SERVER_URL}/cart`,
      cancel_url: `${process.env.SERVER_URL}/cart`
    });

    return res.json({ url: session.url })

  } catch (e) {
    if (!res.headersSent)
    res.status(500).json({ error: e.message })
  }
})


module.exports = router