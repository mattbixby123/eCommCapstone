const router = require("express").Router();
const { prisma } =  require("../db");

// GET /cartItem - Retrieve a list of all cartItems (items in carts)

router.get("/", async (req, res, next) => {
  try {
     const cartItems = await prisma.cartItem.findMany({
      include: {
        session: true,
        product: true
      }
     });
     res.json(cartItems);
  } catch (error) {
     next (error);
  }
 });
 

// GET /cartItem/:id - Retrieve a specific cartItem by ID

router.get("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const cartItem = await prisma.cartItem.findUnique({
       where: { id: parseInt(id) },
     });
     if (!cartItem) {
       return res.status(404).json({ error: "Cart item not found" });
     }
     res.json(cartItem);
  } catch (error) {
     next (error);
  }
 });
 

// POST /cartItem - Create a new cartItem.
router.post("/", async (req, res, next) => {
  try {
     const { sessionId, productId, quantity } = req.body;
 
     if (!sessionId || !productId || !quantity) {
       return res.status(400).json({ message: "Missing required fields" });
     }

     const newCartItem = await prisma.cartItem.create({
       data: {
         sessionId: parseInt(sessionId),
         productId: parseInt(productId),
         quantity: parseInt(quantity),
       },
     });
 
     res.status(201).json(newCartItem);
  } catch (error) {
     console.error("Error handling cart item addition:", error);
     res.status(500).json({ message: error.message || "Internal Server Error" });
  }
  console.log(req.body)
});
 

// PUT /cartItem/:id - Update a specific cartItem by ID.

router.put("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const { sessionId, productId, quantity } = req.body;
 
     const updatedCartItem = await prisma.cartItem.update({
       where: { id: parseInt(id) },
       data: {
         sessionId: sessionId ? parseInt(sessionId) : undefined,
         productId: productId ? parseInt(productId) : undefined,
         quantity: quantity ? parseInt(quantity) : undefined,
       },
     });
 
     res.json(updatedCartItem);
  } catch (error) {
     next (error);
  }
 });
 

// DELETE /cartItem/:id - Delete a specific cartItem by Id.

router.delete("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const deletedCartItem = await prisma.cartItem.delete({
       where: { id: parseInt(id) },
     });
     res.json(deletedCartItem);
  } catch (error) {
     next (error);
  }
 });
 

module.exports = router;