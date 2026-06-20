import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    total,
    tax,
    shipping,
    removeFromCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      if (!form.customerName || !form.phone || !form.address) {
        alert("Please fill all details");
        return;
      }

      setLoading(true);

      const orderData = {
        customerName: form.customerName,
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

      setForm({
        customerName: "",
        phone: "",
        address: "",
      });

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
        px: { xs: 2, md: 8 },
        pt: { xs: 12, md: 14 },
        pb: 6,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
        gap: 4,
      }}
    >

      {/* ================= CART ITEMS ================= */}
      <Box
        sx={{
          background: "rgba(20,20,20,0.95)",
          p: 3,
          borderRadius: "18px",
          border: "1px solid rgba(212,175,55,0.25)",
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 800,
            mb: 3,
            color: "#d4af37",
          }}
        >
          🛒 Your Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography sx={{ color: "#aaa" }}>
            Your cart is empty
          </Typography>
        ) : (
          cart.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#111",
                p: 2,
                mb: 2,
                borderRadius: "12px",
              }}
            >

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "65px",
                  height: "65px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              {/* NAME */}
              <Box sx={{ flex: 1, ml: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ color: "#d4af37" }}>
                  Rs {item.price}
                </Typography>
              </Box>

              {/* QTY */}
              <Typography sx={{ px: 2 }}>
                × {item.qty || item.quantity || 1}
              </Typography>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Remove
              </button>
            </Box>
          ))
        )}
      </Box>

      {/* ================= CHECKOUT ================= */}
      <Box
        sx={{
          background: "rgba(20,20,20,0.95)",
          p: 3,
          borderRadius: "18px",
          border: "1px solid rgba(212,175,55,0.25)",
          height: "fit-content",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.6rem",
            fontWeight: 800,
            mb: 2,
            color: "#d4af37",
          }}
        >
          Order Summary
        </Typography>

        <Typography>Subtotal: Rs {total - tax - shipping}</Typography>
        <Typography>Tax: Rs {tax}</Typography>
        <Typography>Shipping: Rs {shipping}</Typography>

        <Typography
          sx={{
            fontSize: "1.3rem",
            fontWeight: 700,
            mt: 2,
          }}
        >
          Total: Rs {total}
        </Typography>

        {/* FORM */}
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>

          {["customerName", "phone", "address"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.toUpperCase()}
              value={form[field]}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(212,175,55,0.3)",
                background: "#0f0f0f",
                color: "#fff",
                outline: "none",
              }}
            />
          ))}

        </Box>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading || cart.length === 0}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "12px",
            borderRadius: "30px",
            background: "#d4af37",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </Box>

    </Box>
  );
}