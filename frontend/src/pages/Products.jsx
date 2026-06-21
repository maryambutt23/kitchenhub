import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "../styles/products.css";

const categories = [
  { id: 1, name: "Dinner Sets", image: "/images/dinnersets/dinnerset1.png" },
  { id: 2, name: "Tea Sets", image: "/images/teaset/teaset3.jpg" },
  { id: 3, name: "Water Sets", image: "/images/waterset/waterset1.png" },
  { id: 4, name: "Soup Sets", image: "/images/soupsets/soupset3.png" },
  { id: 5, name: "Kitchen Appliances", image: "/images/appliances/appliance.png" },
  { id: 6, name: "Kitchen Accessories", image: "/images/kitchenaccess/accessory.png" },
];

export default function Products() {
  const navigate = useNavigate();

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads")) return `https://kitchenhub--maryambutt23.replit.app${img}`;
    return img;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#080808,#171717)",
          color: "#fff",
          py: 8,
          px: { xs: 2, md: 8 },
        }}
      >

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>

            <Typography
              sx={{
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                fontWeight: 800,
                letterSpacing: "3px",
              }}
            >
              Kitchen{" "}
              <Box component="span" sx={{ color: "#d4af37" }}>
                Hub
              </Box>
            </Typography>

            <motion.div
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Typography
                sx={{
                  mt: 2,
                  color: "rgba(255,255,255,.65)",
                  fontSize: "1.1rem",
                }}
              >
                Premium crockery, appliances and kitchen essentials
              </Typography>
            </motion.div>

          </Box>
        </motion.div>

        {/* ================= GRID ================= */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3,1fr)",
            },
            gap: 5,
          }}
        >

          {categories.map((item, index) => (
            <motion.div
              key={item.id}

              /* ✨ scroll reveal effect */
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}

              /* ✨ stagger delay */
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}

              /* ✨ hover depth */
              whileHover={{
                y: -12,
                scale: 1.03,
              }}
            >
              <Box
                onClick={() =>
                  navigate(
                    `/products/${item.name
                      .toLowerCase()
                      .replaceAll(" ", "-")}`
                  )
                }
                sx={{
                  height: 340,
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: "0 20px 50px rgba(0,0,0,.7)",
                  transformStyle: "preserve-3d",
                }}
              >

                {/* IMAGE */}
                <motion.img
                  src={getImageUrl(item.image)}
                  alt={item.name}

                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}

                  whileHover={{
                    scale: 1.15,
                  }}

                  transition={{ duration: 0.7 }}
                />

                {/* DARK OVERLAY */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top,rgba(0,0,0,.85),transparent)",
                  }}
                />

                {/* TEXT */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 25,
                      left: 25,
                    }}
                  >
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#d4af37",
                        mt: 1,
                        fontWeight: 600,
                      }}
                    >
                      Explore Collection →
                    </Typography>
                  </Box>
                </motion.div>

              </Box>
            </motion.div>
          ))}

        </Box>
      </Box>
    </motion.div>
  );
}