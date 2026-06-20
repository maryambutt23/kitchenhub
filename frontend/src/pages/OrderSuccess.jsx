import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0b0b0b,#1a1a1a)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}
    >

      <Box
        sx={{
          textAlign: "center",
          background: "#141414",
          p: 5,
          borderRadius: "20px",
          border: "1px solid rgba(212,175,55,0.3)",
          maxWidth: "500px",
          width: "100%"
        }}
      >

        {/* SUCCESS ICON */}
        <Typography sx={{ fontSize: "4rem", mb: 2 }}>
          🎉
        </Typography>

        {/* TITLE */}
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
            mb: 1
          }}
        >
          Order Placed Successfully
        </Typography>

        {/* MESSAGE */}
        <Typography
          sx={{
            color: "#aaa",
            mb: 3
          }}
        >
          Thank you for your order. We will contact you soon for confirmation.
        </Typography>

        {/* ORDER ID NOTE (optional feel) */}
        <Typography
          sx={{
            color: "#d4af37",
            mb: 3,
            fontSize: "0.9rem"
          }}
        >
          Your order has been received 🎯
        </Typography>

        {/* BUTTON */}
        <Button
          onClick={() => navigate("/")}
          sx={{
            background: "#d4af37",
            color: "#000",
            fontWeight: 700,
            borderRadius: "30px",
            px: 4,
            py: 1.2,
            "&:hover": {
              opacity: 0.9
            }
          }}
        >
          Back to Home
        </Button>

      </Box>

    </Box>
  );
}