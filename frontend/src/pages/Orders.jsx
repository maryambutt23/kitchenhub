import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data.reverse());
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0b0b0b,#1a1a1a)",
        color: "#fff",
        pt: { xs: 10, md: 12 },
        px: 3,
        pb: 6,
        display: "flex",
        justifyContent: "center"
      }}
    >

      <Box sx={{ width: "100%", maxWidth: "900px" }}>

        <Typography sx={{ fontSize: "2rem", fontWeight: 700, mb: 3 }}>
          📦 My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography sx={{ color: "#d4af37" }}>
            No orders found
          </Typography>
        ) : (
          orders.map((order, index) => (
            <Box
              key={index}
              sx={{
                background: "#141414",
                p: 3,
                mb: 2,
                borderRadius: "12px",
                border: "1px solid rgba(212,175,55,0.2)"
              }}
            >

              <Typography sx={{ color: "#d4af37", mb: 1 }}>
                Order ID: {order.orderId}
              </Typography>

              <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
                Date: {new Date(order.date).toLocaleString()}
              </Typography>

              {order.items.map((item) => (
                <Typography key={item._id} sx={{ fontSize: "0.9rem" }}>
                  {item.name} × {item.qty}
                </Typography>
              ))}

              <Typography sx={{ mt: 1, fontWeight: 700 }}>
                Total: Rs. {order.total}
              </Typography>

            </Box>
          ))
        )}

      </Box>

    </Box>
  );
}