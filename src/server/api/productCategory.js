const { prisma } =  require("../db");
const router = require("express").Router();

// GET /productCategory - Retrieve a list of all productCategories.
  // This route will fetch all product categories from the database.

router.get("/", async (req, res) => {
  try {
     const productCategories = await prisma.productCategory.findMany();
     res.json(productCategories);
  } catch (error) {
     res.status(500).json({ error: "An error occurred" });
  }
 });
 

// GET /productCategory/:id - Retrieve a specific productCategory by ID.
// This route will fetch a specific product category by its ID.
  // to encorperate with the category comonents/buttons on the front page.

router.get("/:id", async (req, res) => {
  try {
     const { id } = req.params;
     const productCategory = await prisma.productCategory.findUnique({
       where: { id: parseInt(id) },
     });
     if (!productCategory) {
       return res.status(404).json({ error: "Product category not found" });
     }
     res.json(productCategory);
  } catch (error) {
     res.status(500).json({ error: "An error occurred" });
  }
 });
 
 // Middleware statement to be used in the POST/PUT/DELETE statements
 router.use((req, res, next) => {
  if (!req.customer) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});

// POST /productCategory - Create a new productCategory.
 // in theory we may not need this specific route, unless we want to add extra feature for admin to add category.
router.post("/", async (req, res) => {
 try {

    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { name } = req.body;
    const newProductCategory = await prisma.productCategory.create({
      data: { name },
    });
    res.status(201).json(newProductCategory);
 } catch (error) {
    res.status(500).json({ error: "An error occurred" });
 }
});


// PUT /productCategory/:id - Update a specific productCategory by ID.
  // in theory we may not need this specific route, unless we want to allow the admin to modify categories.

router.put("/:id", async (req, res) => {
  try {

     if (!req.customer || !req.customer.isAdmin) {
       return res.status(403).json({ error: "Forbidden" });
     }

     const { id } = req.params;
     const { name } = req.body;
     const updatedProductCategory = await prisma.productCategory.update({
       where: { id: parseInt(id) },
       data: { name },
     });
     res.json(updatedProductCategory);
  } catch (error) {
     res.status(500).json({ error: "An error occurred" });
  }
 });
 

// DELETE /productCategory/:id - Delete a specific productCategory by ID.
  // in theory we may not need this specific route, unless we want to allow the admin to delete categories.

router.delete("/:id", async (req, res) => {
  try {
    
     if (!req.customer || !req.customer.isAdmin) {
       return res.status(403).json({ error: "Forbidden" });
     }

     const { id } = req.params;
     const deletedProductCategory = await prisma.productCategory.delete({
       where: { id: parseInt(id) },
     });
     res.json(deletedProductCategory);
  } catch (error) {
     res.status(500).json({ error: "An error occurred" });
  }
 });
 

module.exports = router;
