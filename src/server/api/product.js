const router = require("express").Router();
const { prisma } =  require("../db");

// Middleware is on POST, PUT, and DELETE, only allowed for admins

// GET /product - Retrieve a list of all products.
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; //  default to page1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // default to 10 items/per if not provided

    const allProducts = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalProducts = await prisma.product.count(); // get total count of products

    const totalPages = Math.ceil(totalProducts / pageSize);
    
    res.send({ allProducts, totalProducts, totalPages, page, pageSize });
  } catch (error) {
    next(error);
  }
});

// GET /product/comics - Retrieve paginated list of comics.
router.get("/comics", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10; 

    const comics = await prisma.product.findMany({
      where: {
        categoryId: 1,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalComics = await prisma.product.count({ where: { categoryId: 1 } }); // Get total count of comics

    const totalPages = Math.ceil(totalComics / pageSize);

    res.json({ comics, totalComics, totalPages, page, pageSize });
  } catch (error) {
    next(error);
  }
});

// GET /product/books - Retrieve paginated list of books.
router.get("/books", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10; 

    const books = await prisma.product.findMany({
      where: {
        categoryId: 2,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalBooks = await prisma.product.count({ where: { categoryId: 2 } }); // Get total count of books

    const totalPages = Math.ceil(totalBooks / pageSize);

    res.json({ books, totalBooks, totalPages, page, pageSize });
  } catch (error) {
    next(error);
  }
});

// GET /product/magazines - Retrieve paginated list of magazines.
router.get("/magazines", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided

    const magazines = await prisma.product.findMany({
      where: {
        categoryId: 3,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalMagazines = await prisma.product.count({ where: { categoryId: 3 } }); // Get total count of magazines

    const totalPages = Math.ceil(totalMagazines / pageSize);

    res.json({ magazines, totalMagazines, totalPages, page, pageSize });
  } catch (error) {
    next(error);
  }
});

// GET /product/:id - Retrieve a specific product by ID.
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
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

// POST /product - Create a new product.
// This route will allow an admin to create a new product.
  //***ADMIN STORY TIER 3***//
  
router.post("/", async (req, res, next) => {
  try {

    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { name, desc, imageUrl, SKU, inventory, price, categoryId } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        desc,
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
  //***ADMIN STORY TIER 3***//

router.put("/:id", async (req, res, next) => {
 try {
    
    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.params;
    const { name, desc, imageUrl, inventory, price, categoryId } = req.body;

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
        imageUrl: imageUrl !== undefined ? imageUrl : existingProduct.imageUrl,
        inventory: inventory !== undefined ? inventory : existingProduct.inventory,
        price: price !== undefined ? price : existingProduct.price,
        categoryId: categoryId !== undefined ? parseInt(categoryId) : existingProduct.categoryId,
        // name, ~~~ the above allows us to send any/no updates while retaining the original attribute if no update is passed
        // desc,
        // imageUrl,
        // inventory,
        // price,
        // categoryId: categoryId ? parseInt(categoryId) : undefined,
      },
    });

    res.json(updatedProduct);
 } catch (error) {
    next(error);
 }
});


// DELETE /product/:id - Delete a specific product by ID.
// This route will allow an admin to delete an existing product.
  //***ADMIN STORY TIER 3***//

router.delete("/:id", async (req, res, next) => {
 try {

    
    if (!req.customer || !req.customer.isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

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