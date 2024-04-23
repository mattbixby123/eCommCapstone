const router = require("express").Router();

// GET /orderItem - Retrieve a list of all orderItems. 

router.get("/", async (req, res, next) => {
  try {
     const orderItems = await prisma.orderItem.findMany();
     res.json(orderItems);
  } catch (error) {
     next (error);
  }
 });

// GET /orderItem/:id - Retrieve a specific orderItem by ID

router.get("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const orderItem = await prisma.orderItem.findUnique({
       where: { id: parseInt(id) },
     });
     if (!orderItem) {
       return res.status(404).json({ error: "Order item not found" });
     }
     res.json(orderItem);
  } catch (error) {
     next (error);
  }
 });
 

// POST /orderItem - Create a new orderItem

router.post("/", async (req, res, next) => {
  try {
     const { orderId, productId, quantity } = req.body;
     const newOrderItem = await prisma.orderItem.create({
       data: {
         orderId: parseInt(orderId),
         productId: parseInt(productId),
         quantity: parseInt(quantity),
       },
     });
     res.status(201).json(newOrderItem);
  } catch (error) {
     next (error);
  }
 });
 

// PUT /orderItem/:id - Update a specific orderItem by ID.

router.put("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const { orderId, productId, quantity } = req.body;
     const updatedOrderItem = await prisma.orderItem.update({
       where: { id: parseInt(id) },
       data: {
         orderId: orderId ? parseInt(orderId) : undefined,
         productId: productId ? parseInt(productId) : undefined,
         quantity: quantity ? parseInt(quantity) : undefined,
       },
     });
     res.json(updatedOrderItem);
  } catch (error) {
     next (error);
  }
 });
 

// DELETE /orderItem/:id - Delete a specific orderItem by Id.

router.delete("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const deletedOrderItem = await prisma.orderItem.delete({
       where: { id: parseInt(id) },
     });
     res.json(deletedOrderItem);
  } catch (error) {
     next (error);
  }
 });
 

module.exports = router;