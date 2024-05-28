const router = require("express").Router();
const { prisma } =  require("../db");

// Middleware is on POST, PUT, and DELETE, only allowed for admins

// GET /api/product - Retrieve a list of all products.
router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        cartItem: true,
        orderItems: true
      }
    });

    res.send({ products });
  } catch (error) {
    next(error);
  }
});




// GET /product/:id - Retrieve a specific product by ID.
router.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
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

// Deny access if customer is not an Admin -- blanket statement for all routes below instead of applying route by route
// router.use((req, res, next) => {
//   if (!req.customer || !req.customer.isAdmin) {
//     return res.status(401).send("You must be an Admin to do that.");
//   }
//   next();
// });


// POST /product - Create a new product.
// This route will allow an admin to create a new products
  
router.post("/", async (req, res, next) => {
  try {
    const { name, desc, author, imageUrl, SKU, inventory, price, categoryId } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        desc,
        author,
        imageUrl,
        SKU,
        inventory: parseInt(inventory),
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

router.put("/:id", async (req, res, next) => {
 try {
    
    const { id } = req.params;
    const { name, desc, author, imageUrl, inventory, price, categoryId } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name !== undefined ? name : existingProduct.name,
        desc: desc !== undefined ? desc : existingProduct.desc,
        author: author !== undefined ? author : existingProduct.author,
        imageUrl: imageUrl !== undefined ? imageUrl : existingProduct.imageUrl,
        inventory: inventory !== undefined ? inventory : existingProduct.inventory,
        price: price !== undefined ? price : existingProduct.price,
        categoryId: categoryId !== undefined ? parseInt(categoryId) : existingProduct.categoryId,
      },
    });

    res.json(updatedProduct);
 } catch (error) {
    next(error);
 }
});


// DELETE /product/:id - Delete a specific product by ID.
// This route will allow an admin to delete an existing product.


router.delete("/:id", async (req, res, next) => {
 try {

    const { id } = req.params;

    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ 
      message: "Product deleted successfully",
      deletedProduct: deletedProduct 
    });
 } catch (error) {
    next(error);
 }
});


module.exports = router;