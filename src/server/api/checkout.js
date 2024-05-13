// This is your test secret API key.
require('dotenv').config()
const router = require("express").Router();
const stripe = require("stripe")(process.env.TEST_KEY);

apiUrl = 'localhost:3000/api/checkout'


router.post('/create-checkout-session', async (req, res) => {
  const {products} = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        image: product.imageUrl
      },
      unit_amount:product.price*100
    },
    quantity:product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${apiUrl}?success=true`,
    cancel_url: `${apiUrl}?canceled=true`,
  });

  res.redirect(303, session.url);
});

// router.listen(3000, () => console.log('Running on port 3000'));
