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
// STATIC UPLOADS
// =====================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


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

  res.send("KitchenHub Backend Running 🚀");

});


// =====================
// SERVER PORT
// =====================

const PORT = process.env.PORT || 8080;


// =====================
// START SERVER FIRST
// =====================

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `🚀 Server running on port ${PORT}`
  );

});


// =====================
// DATABASE CONNECTION
// =====================

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "✅ MongoDB Connected Successfully"
    );

  })

  .catch((err) => {

    console.log(
      "❌ MongoDB Error:",
      err.message
    );

  });