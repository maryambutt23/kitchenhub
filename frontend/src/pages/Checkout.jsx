import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cart, total, tax, shipping, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= PLACE ORDER =================
  const handleOrder = async () => {
    try {
      if (!form.name || !form.phone || !form.address) {
        alert("Please fill all required fields");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      setLoading(true);

      // 🔥 BACKEND FORMAT FIX
      const orderData = {
        customerName: form.name,
        phone: form.phone,
        address: form.address,

        cartItems: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.qty || item.quantity || 1,
        })),

        totalPrice: total,
      };

      await axios.post("http://localhost:5000/api/orders", orderData);

      alert("🎉 Order placed successfully!");

      // clear cart
      cart.forEach((item) => removeFromCart(item._id));

      navigate("/order-success");

    } catch (err) {
      console.log(err);
      alert("❌ Order failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0b0b0b,#1a1a1a)",
        color: "#fff",
        pt: { xs: 10, md: 12 },
        px: { xs: 2, md: 8 },
        pb: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 4,
        }}
      >
        {/* FORM */}
        <Box
          sx={{
            background: "#141414",
            p: 3,
            borderRadius: "15px",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
        >
          <Typography sx={{ fontSize: "2rem", fontWeight: 700, mb: 3 }}>
            🧾 Checkout Details
          </Typography>

          {["name", "phone", "address", "city"].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field.toUpperCase()}
              name={field}
              onChange={handleChange}
              sx={{
                mb: 2,
                input: { color: "#fff" },
                "& label": { color: "#d4af37" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(212,175,55,0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d4af37",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#d4af37",
                  },
                },
              }}
            />
          ))}
        </Box>

        {/* SUMMARY */}
        <Box
          sx={{
            background: "#141414",
            p: 3,
            borderRadius: "15px",
            border: "1px solid rgba(212,175,55,0.2)",
            height: "fit-content",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, mb: 2 }}>
            Order Summary
          </Typography>

          {cart.map((item) => (
            <Typography key={item._id} sx={{ fontSize: "0.9rem", mb: 0.5 }}>
              {item.name} × {item.qty || item.quantity || 1}
            </Typography>
          ))}

          <hr style={{ borderColor: "#333", margin: "10px 0" }} />

          <Typography>Subtotal: Rs. {total - tax - shipping}</Typography>
          <Typography>Tax: Rs. {tax}</Typography>
          <Typography>Shipping: Rs. {shipping}</Typography>

          <Typography sx={{ fontSize: "1.3rem", fontWeight: 700, mt: 2 }}>
            Total: Rs. {total}
          </Typography>

          <Button
            fullWidth
            disabled={loading}
            onClick={handleOrder}
            sx={{
              mt: 3,
              background: "#d4af37",
              color: "#000",
              fontWeight: 700,
              borderRadius: "30px",
              "&:hover": { opacity: 0.9 },
            }}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}