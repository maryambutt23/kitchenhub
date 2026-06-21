import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {

  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        const res = await axios.get("https://kitchenhub--maryambutt23.replit.app/api/products");

        // ✅ CLEAN NORMALIZER
        const normalize = (text) =>
          text
            ?.toLowerCase()
            .trim()
            .replace(/[-_]/g, " ")
            .replace(/\s+/g, " ");

        const urlCat = normalize(category?.replace(/-/g, " "));

        const filtered = res.data.filter((p) => {

          if (!p.category) return false;

          const dbCat = normalize(p.category);

          // ✅ FLEXIBLE MATCH (SOLVES YOUR ISSUE)
          return dbCat.includes(urlCat) || urlCat.includes(dbCat);
        });

        setProducts(filtered);

      } catch (error) {
        console.log("Category fetch error:", error);
      } finally {
        setLoading(false);
      }

    };

    fetchProducts();

  }, [category]);

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#080808,#171717)",
        color: "#fff",
        px: { xs: 2, md: 8 },
        py: 8
      }}
    >

      {/* TITLE */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 800,
          textTransform: "capitalize",
          mb: 1
        }}
      >
        {category?.replaceAll("-", " ")}
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          color: "#aaa",
          mb: 5
        }}
      >
        Premium kitchen collection
      </Typography>

      {/* LOADING */}
      {loading && (
        <Typography sx={{ textAlign: "center", color: "#d4af37" }}>
          Loading products...
        </Typography>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <Typography sx={{ textAlign: "center", color: "#d4af37" }}>
          No products found in this category
        </Typography>
      )}

      {/* GRID */}
      {!loading && products.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)"
            },
            gap: 4
          }}
        >
          {products.map((p) => (
            <ProductCard key={p._id || p.id} product={p} />
          ))}
        </Box>
      )}

    </Box>
  );
}