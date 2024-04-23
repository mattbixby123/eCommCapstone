const router = require("express").Router();

// GET /orderDetail - Retrieve a list of all orderDetails. 

router.get("/", async (req, res, next) => {
  try {
     const orderDetails = await prisma.orderDetail.findMany();
     res.json(orderDetails);
  } catch (error) {
     next (error);
  }
 });
 
// GET /orderDetail/:id - Retrieve a specific orderDetail by ID.

router.get("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const orderDetail = await prisma.orderDetail.findUnique({
       where: { id: parseInt(id) },
     });
     if (!orderDetail) {
       return res.status(404).json({ error: "Order detail not found" });
     }
     res.json(orderDetail);
  } catch (error) {
     next (error);
  }
 });
 

// POST /orderDetail - Create a new orderDetail.

router.post("/", async (req, res, next) => {
  try {
     const { customerId, total, paymentDetailsId } = req.body;
     const newOrderDetail = await prisma.orderDetail.create({
       data: {
         customerId: parseInt(customerId),
         total: parseFloat(total),
         paymentDetailsId: parseInt(paymentDetailsId),
       },
     });
     res.status(201).json(newOrderDetail);
  } catch (error) {
     next (error);
  }
 });
 

// PUT /orderDetail/:id - Update a specific orderDetail by ID.

router.put("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const { customerId, total, paymentDetailsId } = req.body;
     const updatedOrderDetail = await prisma.orderDetail.update({
       where: { id: parseInt(id) },
       data: {
         customerId: customerId ? parseInt(customerId) : undefined,
         total: total ? parseFloat(total) : undefined,
         paymentDetailsId: paymentDetailsId ? parseInt(paymentDetailsId) : undefined,
       },
     });
     res.json(updatedOrderDetail);
  } catch (error) {
     next (error);
  }
 });
 

// DELETE /orderDetail/:id - Delete a specific orderDetail by Id.

router.delete("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const deletedOrderDetail = await prisma.orderDetail.delete({
       where: { id: parseInt(id) },
     });
     res.json(deletedOrderDetail);
  } catch (error) {
     next (error);
  }
 });
 

module.exports = router;