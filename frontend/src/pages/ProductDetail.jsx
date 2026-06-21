import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Chip } from "@mui/material";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); // ✅ CART HOOK

  useEffect(() => {

    const fetchProduct = async () => {

      try {
        setLoading(true);

        const res = await axios.get(
     `https://kitchenhub--maryambutt23.replit.app/api/products/${id}`
      );

        setProduct(res.data);

      } catch (err) {
        console.log(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }

    };

    fetchProduct();

  }, [id]);

  // LOADING STATE
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0b0b0b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
          fontSize: "1.2rem"
        }}
      >
        Loading product...
      </Box>
    );
  }

  // NOT FOUND STATE
  if (!product) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0b0b0b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
          fontSize: "1.2rem"
        }}
      >
        Product not found
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#080808,#171717)",
        color: "#fff",
        px: { xs: 2, md: 8 },
        py: 6
      }}
    >

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 6,
          alignItems: "center"
        }}
      >

        {/* IMAGE */}
        <Box
          sx={{
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,0.3)"
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "550px",
              objectFit: "cover"
            }}
          />
        </Box>

        {/* DETAILS */}
        <Box>

          <Chip
            label={product.category}
            sx={{
              background: "#d4af37",
              color: "#000",
              fontWeight: 700,
              mb: 3
            }}
          />

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800
            }}
          >
            {product.name}
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: "1.6rem",
              color: "#d4af37",
              fontWeight: 700
            }}
          >
            Rs. {product.price}
          </Typography>

          <Typography
            sx={{
              mt: 3,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8
            }}
          >
            Premium kitchen product designed for modern homes.
            High quality material, durable finish and elegant design.
          </Typography>

          {/* BUTTONS */}
          <Box sx={{ mt: 5, display: "flex", gap: 2, flexWrap: "wrap" }}>

            {/* ADD TO CART */}
            <Button
              onClick={() => addToCart(product)}
              sx={{
                borderRadius: "30px",
                border: "1px solid #d4af37",
                color: "#d4af37",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  background: "#d4af37",
                  color: "#000"
                }
              }}
            >
              Add To Cart
            </Button>

            {/* BUY NOW */}
            <Button
              onClick={() => addToCart(product)}
              sx={{
                borderRadius: "30px",
                background: "#d4af37",
                color: "#000",
                px: 4,
                py: 1.5,
                fontWeight: 700,
                "&:hover": {
                  opacity: 0.85
                }
              }}
            >
              Buy Now
            </Button>

          </Box>

        </Box>

      </Box>

    </Box>
  );
}