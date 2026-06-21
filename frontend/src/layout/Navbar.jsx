import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { cart } = useCart();

  // admin token (optional use later)
  const token = localStorage.getItem("adminToken");

  // FIX: safe qty handling
  const totalItems = cart.reduce(
    (sum, item) => sum + (item.qty || item.quantity || 1),
    0
  );

  return (
    <AppBar position="fixed" sx={{ background: "#0b0b0b" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onMenuClick} sx={{ color: "#d4af37" }}>
            <MenuIcon />
          </IconButton>

          <Typography sx={{ color: "#fff", fontWeight: 700 }}>
            Kitchen <span style={{ color: "#d4af37" }}>Hub</span>
          </Typography>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>

          <Typography
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer", color: "#fff", fontWeight: 500 }}
          >
            Home
          </Typography>

          <Typography
            onClick={() => navigate("/products")}
            sx={{ cursor: "pointer", color: "#fff", fontWeight: 500 }}
          >
            Products
          </Typography>

          <Typography
            onClick={() => navigate("/about")}
            sx={{ cursor: "pointer", color: "#fff", fontWeight: 500 }}
          >
            About
          </Typography>

          {/* ADMIN BUTTON (FIXED FOR NETLIFY) */}
          <Typography
            onClick={() => navigate("/admin")}
            sx={{
              cursor: "pointer",
              color: "#d4af37",
              fontWeight: "bold"
            }}
          >
            Admin
          </Typography>

          {/* CART */}
          <IconButton
            onClick={() => navigate("/cart")}
            sx={{ color: "#d4af37" }}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
}