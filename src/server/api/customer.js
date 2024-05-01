const router = require("express").Router();
const { prisma } = require("../db");

// ** TODO - add the conditional if statements to the routes, i believe we need them in conjunction with this router.use below
// Deny access if customer is not logged in -- this is needed on all routes where auth/login is required
router.use((req, res, next) => {
  if (!req.customer) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// GET /customer - Retrieve a list of all customers 
  //***ADMIN STORY TIER 3***//
    // - View list of all customers
    // - List of relevant info for each customer (billing, addr, phone, etc.)

router.get("/", async (req, res, next) => {
 try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
 } catch (error) {
    next (error);
 }
});

// GET /customer/:id - Retrieve a specific customer by ID
  //***ADMIN STORY TIER 3***//

  router.get("/:id", async (req, res, next) => {
 try {
    const { id } = req.params;
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
 } catch (error) {
    next (error);
 }
});

// POST /customer - Create a new customer
  //***ADMIN STORY TIER 3***//

router.post("/", async (req, res, next) => {
 try {
    const { email, username, password, firstName, lastName, addressLine1, addressLine2, city, state, postalCode, country } = req.body;

    const newCustomer = await prisma.customer.create({
      data: {
        email: email,
        username: username,
        password: password, // password is hashed via .$extends in /db/index
        firstName: firstName,
        lastName: lastName,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        isAdmin: true || false, // New customers can be admins or not, since this route requires admin access to impliment
      },
    });

    res.status(201).json(newCustomer);
 } catch (error) {
    next (error);
 }
});

// PUT /customer/:id - Update a specific customer by ID.
  //***ADMIN STORY TIER 3***// 
    // - ability to promote to admin
    // - modify customer accounts ... i took out all keys except isAdmin because ...
    // ... the rest seem like only items the customer should change:
    // { email, username, password, firstName, lastName, addressLine1, addressLine2, city, state, postalCode, country }

router.put("/:id", async (req, res, next) => {
 try {
    const { id } = req.params;
    const { isAdmin } = req.body;

    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        isAdmin: isAdmin,
      },
    });

    res.json(updatedCustomer);
 } catch (error) {
    next (error); 
 }
});

// DELETE /customer/:id - Delete a specific customer by Id.
  //***ADMIN STORY TIER 3***//
    // - delete customer accounts

router.delete("/:id", async (req, res) => {
 try {
    const { id } = req.params;
    const deletedCustomer = await prisma.customer.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedCustomer);
 } catch (error) {
    next (error);
 }
});

module.exports = router;