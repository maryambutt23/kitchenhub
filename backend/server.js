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
// TEST ROUTE
// =====================
app.get("/", (req, res) => {
  res.send("🚀 KitchenHub Backend Running Successfully");
});


// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});


// =====================
// GLOBAL ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);

  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});


// =====================
// DATABASE + SERVER (FIXED FOR RAILWAY)
// =====================
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      console.log("❌ Server error:", err.message);
    });

  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });