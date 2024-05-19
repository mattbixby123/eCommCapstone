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

    // Create a new shopping session for the customer
    await prisma.shoppingSession.create({
      data: {
        customerId: customer.id,
        total: 0.00, // Initial total for a new shopping session
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
    let shoppingSession;
    

    // Check if customer is authenticated
    if (req.customer) {
      customer = await prisma.customer.findUnique({
        where: {
          id: req.customer.id,
        },
        include: {
          shoppingSessions: true,
        }
      });
      console.log('customer - ', customer)

      res.send(customer);
    }
    if (req.shoppingSession) {
      shoppingSession = await prisma.shoppingSession.findUnique({
        where: {
          customerId: req.customer.id,
        },
      });
      console.log('session - ', shoppingSession);

      res.send(shoppingSession);
    }


  } catch (error) {
    next(error);
  }
});

  // Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.customer = decoded; // Set the decoded customer object in the request for further use
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

// Middleware to check if the customer is an admin
function isAdmin(req, res, next) {
  if (!req.customer.isAdmin) {
    return res.status(403).send("Access denied. Not an admin.");
  }
  next();
}

// Protected route to check if the customer is an admin
router.get("/auth/admin", verifyToken, isAdmin, async (req, res, next) => {
  try {
    // If the middleware isAdmin passed, that means the customer is an admin
    res.send("You are an admin.");
  } catch (error) {
    next(error);
  }
});

module.exports = router;