const router = require("express").Router();
const { prisma } = require('../db')
// GET /orderDetail - Retrieve a list of all orderDetails. 

router.get("/", async (req, res, next) => {
  try {
     const orderDetails = await prisma.orderDetail.findMany();
     res.json(orderDetails);
  } catch (error) {
     next (error);
  }
 });
 
// GET /orderDetail/:id - Retrieve a specific orderDetail by Customer ID.

router.get('/:customerId', async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const parsedCustomerId = parseInt(customerId, 10);
    
    console.log(`Received customerId: ${customerId}`);
    console.log(`Parsed customer ID: ${parsedCustomerId}`);

    if (isNaN(parsedCustomerId) || parsedCustomerId < 1) {
      return res.status(400).json({ error: 'Invalid Customer ID' });
    }
    const orderDetails = await prisma.orderDetail.findMany({
      where: { customerId: parsedCustomerId },
    });
    console.log(`Order Details Found:`, orderDetails);

    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({ error: 'No orders found for this customer' });
    }

    res.json(orderDetails);
  } catch (error) {
    next(error);
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