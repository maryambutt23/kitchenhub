const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const upload = require("../middleware/upload");


// =====================
// TEST ROUTE
// =====================
router.get("/test", (req, res) => {
  res.send("Product route working");
});


// =====================
// SEED DATA
// =====================
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany();

    await Product.insertMany([
      {
        name: "Royal White Dinner Set",
        price: 18500,
        image: "/images/dinnersets/dinnerset1.png",
        category: "dinner set",
      },
      {
        name: "Golden Ceramic Dinner Set",
        price: 27500,
        image: "/images/dinnersets/dinnerset2.png",
        category: "dinner set",
      },
    ]);

    res.send("Seed done successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// GET ALL PRODUCTS
// =====================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// GET SINGLE PRODUCT
// =====================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// UPLOAD IMAGE
// =====================
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file received" });
    }

    const imageUrl =
      `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({ imageUrl });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// CREATE PRODUCT
// =====================
router.post("/", async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      category,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// UPDATE PRODUCT
// =====================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =====================
// DELETE PRODUCT
// =====================
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;