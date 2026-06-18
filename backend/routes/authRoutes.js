const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


// =========================
// ADMIN LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET || "secretKey123",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;