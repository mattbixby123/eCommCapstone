const router = require("express").Router();
const { prisma } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


// Register a new customer account
router.post("/register", async (req, res, next) => {
  try {
    const customer = await prisma.customer.create({
      data: {
        email: req.body.email,
        username: req.body.username, 
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,  
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country,
        imageUrl: req.body.imageUrl,
        isAdmin: false,
      }
    });
    // Create a token with the customer id
    // const token = jwt.sign({ id: customer.id }, process.env.JWT);
    const token = jwt.sign({ id: customer.id, isAdmin: customer.isAdmin }, process.env.JWT);
    res.status(201).send ({ token })

  } catch (error) {
    next(error);
  }
});

// Login to an exisiting customer account
router.post("/login", async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (!customer) {
      return res.status(401).send("invalid login credentials")
    }
    const passwordMatch = await bcrypt.compare(req.body.password, customer.password);
    if (passwordMatch) {
      // const token = jwt.sign({ id: customer.id }, process.env.JWT);
      const token = jwt.sign({ id: customer.id, isAdmin: customer.isAdmin }, process.env.JWT);
      res.send({ token })
    }
    else {
      return res.status(401).send("plaintext password provided does NOT match the hashed password saved in db")
    }
  } catch (error) {
    next(error);
  }
})

// Get the currently loggin in user
router.get("/me", async (req, res, next) => {
  try {
    let customer;
    

    // Check if customer is authenticated
    if (req.customer) {
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