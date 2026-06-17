const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🔐 ADMIN AUTH MIDDLEWARE
const verifyAdmin = require("../middleware/auth");


// =====================
// PLACE ORDER (PUBLIC)
// =====================
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, address, cartItems, totalPrice } = req.body;

    if (!customerName || !phone || !address) {
      return res.status(400).json({
        message: "Missing customer details",
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const newOrder = await Order.create({
      customerName,
      phone,
      address,
      products: cartItems,
      totalPrice,
      status: "Pending",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (err) {
    console.error("Order Error:", err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// =====================
// GET ALL ORDERS (ADMIN ONLY)
// =====================
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});


// =====================
// GET SINGLE ORDER (ADMIN)
// =====================
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching order",
    });
  }
});


// =====================
// UPDATE ORDER STATUS
// =====================
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order updated successfully",
      order: updated,
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to update order",
    });
  }
});


// =====================
// DELETE ORDER
// =====================
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to delete order",
    });
  }
});

module.exports = router;