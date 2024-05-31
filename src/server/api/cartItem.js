const router = require("express").Router();
const { prisma } = require("../db");

// GET /cartItem - Retrieve a list of all cartItems (items in carts)
router.get("/", async (req, res, next) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      include: {
        session: true,
        product: true,
      },
    });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// GET /cartItem/:sessionId - Retrieve cartItems by session ID
router.get("/:sessionId", async (req, res, next) => {
  try {
     const { sessionId } = req.params;
     const cartItems = await prisma.cartItem.findMany({
       where: { sessionId: parseInt(sessionId) },
       include: { product: true }
     });
     if (!cartItems) {
       return []
     }
     res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

// // GET /cartItem/customer/:id - Retrieve cart items by customer ID
// router.get("/customer/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const shoppingSession = await prisma.shoppingSession.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!shoppingSession) {
//       return res.status(404).json({ error: "Shopping session not found" });
//     }

//     const cartItems = await prisma.cartItem.findMany({
//       where: { sessionId: shoppingSession.id },
//     });

//     const cartProducts = await Promise.all(
//       cartItems.map(async (cartItem) => {
//         return await prisma.product.findUnique({
//           where: { id: cartItem.productId },
//           include: { cartItem: true },
//         });
//       })
//     );

//     const validCartProducts = cartProducts.filter((product) => product !== null);

//     res.json(validCartProducts);
//   } catch (error) {
//     next(error);
//   }
// });

// POST /cartItem/:sessionId - Create a new cartItem
router.post("/:sessionId", async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { productId, quantity } = req.body;

    if (!sessionId || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const parsedSessionId = parseInt(sessionId);
    const parsedProductId = parseInt(productId);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedSessionId) || isNaN(parsedProductId) || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid input values" });
    }

    const product = await prisma.product.findUnique({
      where: { id: parsedProductId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.inventory < parsedQuantity) {
      return res.status(400).json({ message: "Insufficient inventory" });
    }

    const totalPrice = parseInt(product.price * parsedQuantity);

    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: parsedSessionId },
    });

    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    await prisma.shoppingSession.update({
      where: { id: parsedSessionId },
      data: { total: parseInt(shoppingSession.total) + totalPrice },
    });

    await prisma.product.update({
      where: { id: parsedProductId },
      data: { inventory: product.inventory - parsedQuantity },
    });

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
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

// PUT /cartItem/:id - Update a specific cartItem by ID
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
    next(error);
  }
});

// DELETE /cartItem/:id - Delete a specific cartItem by Id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const product = await prisma.product.findUnique({
      where: { id: cartItem.productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const totalPriceToSubtract = product.price * cartItem.quantity;

    await prisma.product.update({
      where: { id: cartItem.productId },
      data: { inventory: product.inventory + cartItem.quantity },
    });

    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: cartItem.sessionId },
    });

    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    await prisma.shoppingSession.update({
      where: { id: cartItem.sessionId },
      data: { total: shoppingSession.total - totalPriceToSubtract },
    });

    const deletedCartItem = await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedCartItem);
  } catch (error) {
    console.error("Error handling cart item deletion:", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

// DELETE /shoppingSession/:sessionId - Clear entire cart for a session
router.delete("/shoppingSession/:sessionId", async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId: parseInt(sessionId) },
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found for this session" });
    }

    let totalPriceToSubtract = 0;

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

    const shoppingSession = await prisma.shoppingSession.findUnique({
      where: { id: parseInt(sessionId) },
    });

    if (!shoppingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    await prisma.shoppingSession.update({
      where: { id: parseInt(sessionId) },
      data: { total: shoppingSession.total - totalPriceToSubtract },
    });

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
