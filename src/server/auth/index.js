const router = require("express").Router();
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// Registter a new customer account

// Login to an existing customer account

// Get the currently logging in user
router.get("/me", async (req, res, next) => {
  try {
    let customer;
    

    // Check if customer is authenticated
    if (req.user) {
      customer = await prisma.customer.findUnique({
        where: {
          id: req.customer.id,
        },
      });
      console.log('customer - ', customer)

      res.send(customer);
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;