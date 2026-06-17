const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const verifyAdmin = require("../middleware/auth");


// =====================
// PLACE ORDER (PUBLIC)
// =====================
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, cartItems, totalPrice } = req.body;

    // validation
    if (!customerName || !phone || !address) {
      return res.status(400).json({ message: "Missing customer details" });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // =====================
    // FORMAT PRODUCTS PROPERLY
    // =====================
    const products = cartItems.map((item) => ({
      name: item.name || "Product",

      image: item.image
        ? item.image.startsWith("http")
          ? item.image
          : item.image.startsWith("/uploads")
          ? `http://localhost:5000${item.image}`
          : item.image
        : "",

      price: item.price || 0,
      quantity: item.quantity || item.qty || 1,
    }));

    // =====================
    // SAVE ORDER
    // =====================
    const newOrder = await Order.create({
      customerName,
      phone,
      address,
      products,
      totalPrice: totalPrice || 0,
      status: "Pending",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    return res.status(500).json({ message: "Server Error" });
  }
});


// =====================
// GET ALL ORDERS (ADMIN)
// =====================
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});


// =====================
// GET SINGLE ORDER
// =====================
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json(order);

  } catch (err) {
    console.error("GET ERROR:", err);
    return res.status(500).json({ message: "Error fetching order" });
  }
});


// =====================
// UPDATE STATUS
// =====================
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    return res.json({
      message: "Order updated successfully",
      order: updated,
    });

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return res.status(500).json({ message: "Failed to update order" });
  }
});


// =====================
// DELETE ORDER
// =====================
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    return res.json({
      message: "Order deleted successfully",
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;