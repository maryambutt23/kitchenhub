const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Add category
router.post("/add", async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

module.exports = router;