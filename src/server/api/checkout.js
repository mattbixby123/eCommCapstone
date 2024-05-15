require('dotenv').config();
const router = require("express").Router();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'))

const stripe = require('stripe')(process.env.TEST_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "First Product" }],
  [2, { priceInCents: 20000, name: "Second Product" }],
])

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
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