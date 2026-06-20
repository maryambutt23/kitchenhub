import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ CART IMPORT
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {

  const navigate = useNavigate();

  // ✅ CART FUNCTION
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <Box
      sx={{
        background: "linear-gradient(145deg,#141414,#0b0b0b)",
        borderRadius: "22px",
        overflow: "hidden",
        border: "1px solid rgba(212,175,55,.15)",
        transition: "0.4s",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 40px rgba(0,0,0,.6)",
        },

        "&:hover img": {
          transform: "scale(1.08)",
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          height: 260,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "0.6s",
          }}
        />

        {/* CATEGORY BADGE */}
        <Box
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            background: "#d4af37",
            color: "#000",
            px: 2,
            py: 0.5,
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          {product.category}
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "1.15rem",
            fontWeight: 700,
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: "#d4af37",
            fontSize: "1.3rem",
            fontWeight: 800,
          }}
        >
          Rs. {product.price}
        </Typography>

        {/* BUTTONS */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            mt: 3,
          }}
        >
          {/* VIEW BUTTON */}
          <Button
            onClick={() => navigate(`/product/${product._id}`)}
            sx={{
              flex: 1,
              borderRadius: "30px",
              border: "1px solid #d4af37",
              color: "#d4af37",
              fontWeight: 700,
              "&:hover": {
                background: "#d4af37",
                color: "#000",
              },
            }}
          >
            View
          </Button>

          {/* CART BUTTON (FIXED) */}
          <Button
            onClick={() => addToCart(product)}
            sx={{
              flex: 1,
              borderRadius: "30px",
              background: "#d4af37",
              color: "#000",
              fontWeight: 700,
              "&:hover": {
                opacity: 0.85,
              },
            }}
          >
            Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}