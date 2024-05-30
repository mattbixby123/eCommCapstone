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
 

// GET /cartItem/:id - Retrieve cartItems by  session ID

router.get("/:sessionId", async (req, res, next) => {
  try {
     const { sessionId } = req.params;
     const cartItems = await prisma.cartItem.findMany({
       where: { sessionId: parseInt(sessionId) },
       include: { product: true },
     });
     if (!cartItems || cartItems.length === 0) {
       return res.status(404).json({ error: "Cart item not found" });
     }
     res.json(cartItems);
  } catch (error) {
     next (error);
  }
 });
 
 router.get("/customer/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: parseInt(id) },
    });

    if (!shoppingSession) {
      return res.status(404).json({ error: "Shopping session not found" })
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId: shoppingSession.id },
    });

    const cartProducts = await Promise.all(
      cartItems.map(async (cartItem) => {
        return await prisma.product.findUnique({
          where: {id: cartItem.productId },
          include: {cartItem: true},
        });
      })
    );

    const validCartProducts = cartProducts.filter((product) => product !== null);

    res.json(validCartProducts);

  } catch(error) {
    next (error);
  }
 });

// POST /cartItem - Create a new cartItem.
router.post("/:sessionId", async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { productId, quantity } = req.body;
    if (!sessionId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Parse integers from input
    const parsedSessionId = parseInt(sessionId);
    const parsedProductId = parseInt(productId);
    const parsedQuantity = parseInt(quantity);
    // Validate parsed values
    if (isNaN(parsedSessionId) || isNaN(parsedProductId) || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid input values" });
    }
    // Retrieve the product details
    const product = await prisma.product.findUnique({
      where: { id: parsedProductId },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Check if the inventory is sufficient
    if (product.inventory < parsedQuantity) {
      return res.status(400).json({ message: "Insufficient inventory" });
    }
    // Calculate the total price for the quantity
    const totalPrice = product.price * parsedQuantity;
    // Retrieve the session
    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: parsedSessionId },
    });
    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }
    // Update the session's total price
    await prisma.shoppingSession.update({
      where: { id: parsedSessionId },
      data: { total: shoppingSession.total + totalPrice },
    });
    // Deduct the quantity from the product's inventory
    await prisma.product.update({
      where: { id: parsedProductId },
      data: { inventory: product.inventory - parsedQuantity },
    });
    // Add the cart item
    const newCartItem = await prisma.cartItem.create({
      data: {
        sessionId: parsedSessionId,
        productId: parsedProductId,
        quantity: parsedQuantity,
      },
    });
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error("Error handling cart item addition:", error);
    next(error);
  }
});
module.exports = router;


