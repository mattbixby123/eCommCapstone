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
       include: { product: true }
     });
     if (!cartItems || cartItems.length === 0) {
       return res.status(404).json({ error: "Cart item not found" });
     }
     res.json(cartItems);
  } catch (error) {
     next (error);
  }
 });

 // GET /cartItem/customer/:id - Retrieve cart items for a specific customer by their session ID
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

    // Retrieve the product details
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the inventory is sufficient
    if (product.inventory < parseInt(quantity)) {
      return res.status(400).json({ message: "Insufficient inventory" });
    }

    // Calculate the total price for the quantity
    const totalPrice = product.price * parseInt(quantity);

    // Retrieve the session
    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: parseInt(sessionId) },
    });

    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    await prisma.shoppingSession.update({
      where: { id: parseInt(sessionId) },
      data: { total: shoppingSession.total + totalPrice },
    });

    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: { inventory: product.inventory - parseInt(quantity) },
    });

    // // Update the session's total price
    // const updatedSession = await prisma.shoppingSession.update({
    //   where: { id: parseInt(sessionId) },
    //   data: { total: shoppingSession.total + totalPrice },
    // });

    // // Deduct the quantity from the product's inventory
    // const updatedProduct = await prisma.product.update({
    //   where: { id: parseInt(productId) },
    //   data: { inventory: product.inventory - parseInt(quantity) },
    // });

    // Add the cart item
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

// DELETE /cartItem/:id - Delete a specific cartItem by Id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Retrieve the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Retrieve the product associated with the cart item
    const product = await prisma.product.findUnique({
      where: { id: cartItem.productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Calculate the total price to subtract
    const totalPriceToSubtract = product.price * cartItem.quantity;

    // Update the product's inventory
    await prisma.product.update({
      where: { id: cartItem.productId },
      data: { inventory: product.inventory + cartItem.quantity },
    });

    // Retrieve the session associated with the cart item
    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: cartItem.sessionId },
    });

    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update the session's total price
    await prisma.shoppingSession.update({
      where: { id: cartItem.sessionId },
      data: { total: shoppingSession.total - totalPriceToSubtract },
    });

    // Delete the cart item
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedCartItem);
  } catch (error) {
    console.error("Error handling cart item deletion:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

// DELETE route for clearing entire cart on cart page
router.delete("/shoppingSession/:sessionId", async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    // Retrieve all cart items for the session
    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId: parseInt(sessionId) },
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found for this session" });
    }

    // Initialize variables to track total price to subtract and inventory to add back
    let totalPriceToSubtract = 0;

    // Update inventory and calculate the total price to subtract
    for (const item of cartItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (product) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { inventory: product.inventory + item.quantity },
        });

        totalPriceToSubtract += product.price * item.quantity;
      }
    }

    // Retrieve the session
    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: parseInt(sessionId) },
    });

    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update the session's total price
    await prisma.shoppingSession.update({
      where: { id: parseInt(sessionId) },
      data: { total: shoppingSession.total - totalPriceToSubtract },
    });

    // Delete the cart items
    const deletedCartItems = await prisma.cartItem.deleteMany({
      where: { sessionId: parseInt(sessionId) },
    });

    res.json(deletedCartItems);
  } catch (error) {
    console.error("Error handling cart item deletion:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

module.exports = router;


