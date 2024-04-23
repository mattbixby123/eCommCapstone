const router = require("express").Router();

// GET /shoppingSession - Retrieve a list of all shoppingSessions. 
  // This route fetches all shopping sessions from the database.

router.get("/", async (req, res, next) => {
 try {
    const shoppingSessions = await prisma.shoppingSession.findMany();
    res.json(shoppingSessions);
 } catch (error) {
    next (error);
 }
});

// GET /shoppingSession/:id - Retrieve a specific shoppingSession by ID.
  // This route fetches a specific shopping session by its ID.
router.get("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const shoppingSession = await prisma.shoppingSession.findUnique({
       where: { id: parseInt(id) },
     });
     if (!shoppingSession) {
       return res.status(404).json({ error: "Shopping session not found" });
     }
     res.json(shoppingSession);
  } catch (error) {
     next (error);
  }
 });
 
// POST /shoppingSession - Create a new shoppingSession.
 // This route allows creating a new shopping session.
router.post("/", async (req, res, next) => {
  try {
     const { customerId, total } = req.body;
     const newShoppingSession = await prisma.shoppingSession.create({
       data: {
         customerId: parseInt(customerId),
         total: parseFloat(total),
       },
     });
     res.status(201).json(newShoppingSession);
  } catch (error) {
     next (error);
  }
 });
 
// PUT /shoppingSession/:id - Update a specific shoppingSession by ID.
 // This route updates an existing shopping session. 

 router.put("/:id", async (req, res, next) => {
 try {
    const { id } = req.params;
    const { customerId, total } = req.body;
    const updatedShoppingSession = await prisma.shoppingSession.update({
      where: { id: parseInt(id) },
      data: {
        customerId: customerId ? parseInt(customerId) : undefined,
        total: total ? parseFloat(total) : undefined,
      },
    });
    res.json(updatedShoppingSession);
 } catch (error) {
    next (error);
 }
});


// DELETE /shoppingSession/:id - Delete a specific shoppingSession by Id.
  // This route deletes a shopping session by its ID.
router.delete("/:id", async (req, res, next) => {
  try {
     const { id } = req.params;
     const deletedShoppingSession = await prisma.shoppingSession.delete({
       where: { id: parseInt(id) },
     });
     res.json(deletedShoppingSession);
  } catch (error) {
     next (error);
  }
 });
 
module.exports = router;