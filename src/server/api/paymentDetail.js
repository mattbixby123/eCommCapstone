const router = require("express").Router();
const { prisma } = require("../db");

// GET /paymentDetail - Retrieve a list of all paymentDetails from the db. 

router.get("/", async (req, res, next) => {
  try {
     const paymentDetails = await prisma.paymentDetail.findMany();
     res.json(paymentDetails);
  } catch (error) {
     next (error);
  }
 });
 
// GET /paymentDetail/:id - Retrieve a specific paymentDetail by ID

router.get("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const paymentDetail = await prisma.paymentDetail.findUnique({
       where: { id: parseInt(id) },
     });
     if (!paymentDetail) {
       return res.status(404).json({ error: "Payment detail not found" });
     }
     res.json(paymentDetail);
  } catch (error) {
     next (error);
  }
 });
 
// POST /paymentDetail - Create a new paymentDetail.

router.post("/", async (req, res, next) => {
  try {
     const { orderId, amount, provider, status } = req.body;
     const newPaymentDetail = await prisma.paymentDetail.create({
       data: {
         orderId: parseInt(orderId),
         amount: parseFloat(amount),
         provider: provider,
         status: status,
       },
     });
     res.status(201).json(newPaymentDetail);
  } catch (error) {
     next (error);
  }
 });
 

// PUT /paymentDetail/:id - Update a specific paymentDetail by ID.

router.put("/paymentDetail/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const { orderId, amount, provider, status } = req.body;
     const updatedPaymentDetail = await prisma.paymentDetail.update({
       where: { id: parseInt(id) },
       data: {
         orderId: orderId ? parseInt(orderId) : undefined,
         amount: amount ? parseFloat(amount) : undefined,
         provider: provider ? provider : undefined,
         status: status ? status : undefined,
       },
     });
     res.json(updatedPaymentDetail);
  } catch (error) {
     next (error);
  }
 });
 
// DELETE /paymentDetail/:id - Delete a specific paymentDetail by Id.

router.delete("/paymentDetail/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const deletedPaymentDetail = await prisma.paymentDetail.delete({
       where: { id: parseInt(id) },
     });
     res.json(deletedPaymentDetail);
  } catch (error) {
     next (error);
  }
 });
 
module.exports = router;