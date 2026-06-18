const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// STATIC FILES
// =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================
// ROUTES
// =====================
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// =====================
// HEALTH CHECK (IMPORTANT FOR RAILWAY)
// =====================
app.get("/", (req, res) => {
  res.status(200).send("🚀 KitchenHub API is running");
});

// =====================
// PORT (CRITICAL FIX)
// =====================
const PORT = process.env.PORT;

// =====================
// DATABASE + SERVER
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });