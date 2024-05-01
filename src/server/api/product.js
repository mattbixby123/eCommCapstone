const router = require("express").Router();
const { prisma } =  require("../db");

// Middleware is on POST, PUT, and DELETE, only allowed for admins

// GET /product - Retrieve a list of all products.
router.get("/", async (req, res, next) => {
  try {
    const allProducts = await prisma.product.findMany();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

// GET /product/comics - Retrieve all comics.
router.get("/comics", async (req, res, next) => {
  try {
    const comics = await prisma.product.findMany({
      where: {
        categoryId: 1,
      },
    });
    res.send(comics);
  } catch (error) {
    next(error);
  }
});

// GET /product/books - Retrieve all comics.
router.get("/books", async (req, res, next) => {
  try {
    const books = await prisma.product.findMany({
      where: {
        categoryId: 2,
      },
    });
    res.send(books);
  } catch (error) {
    next(error);
  }
});

// GET /product/comics - Retrieve all comics.
router.get("/magazines", async (req, res, next) => {
  try {
    const magazines = await prisma.product.findMany({
      where: {
        categoryId: 3,
      },
    });
    res.send(magazines);
  } catch (error) {
    next(error);
  }
});

// GET /product/:id - Retrieve a specific product by ID.
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.send(product);
  } catch (error) {
    next(error);
  }
});




// Middleware statement to be used in the POST/PUT/DELETE statements
router.use((req, res, next) => {
  if (!req.customer) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
});
// POST /product - Create a new product.
// This route will allow an admin to create a new product.
  //***ADMIN STORY TIER 3***//
  
router.post("/", async (req, res, next) => {
  try {

    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { name, desc, imageUrl, SKU, inventory, price, categoryId } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        desc,
        imageUrl,
        SKU,
        inventory,
        price,
        categoryId: parseInt(categoryId),
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// PUT /product/:id - Update a specific product by ID.
// This route will allow an admin to update an existing product.
  //***ADMIN STORY TIER 3***//

router.put("/:id", async (req, res, next) => {
 try {
    
    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.params;
    const { name, desc, imageUrl, inventory, price, categoryId } = req.body;

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        desc,
        imageUrl,
        inventory,
        price,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
      },
    });

    res.json(updatedProduct);
 } catch (error) {
    next(error);
 }
});


// DELETE /product/:id - Delete a specific product by ID.
// This route will allow an admin to delete an existing product.
  //***ADMIN STORY TIER 3***//

router.delete("/:id", async (req, res, next) => {
 try {

    
    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.params;

    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(deletedProduct);
 } catch (error) {
    next(error);
 }
});


module.exports = router;