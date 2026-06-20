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

  const token = localStorage.getItem("adminToken");

  // total cart items
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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

          {/* HOME */}
          <Typography
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              color: "#fff",
              fontWeight: 500,
              "&:hover": { color: "#d4af37" }
            }}
          >
            Home
          </Typography>

          {/* PRODUCTS */}
          <Typography
            onClick={() => navigate("/products")}
            sx={{
              cursor: "pointer",
              color: "#fff",
              fontWeight: 500,
              "&:hover": { color: "#d4af37" }
            }}
          >
            Products
          </Typography>

          {/* ABOUT */}
          <Typography
            onClick={() => navigate("/about")}
            sx={{
              cursor: "pointer",
              color: "#fff",
              fontWeight: 500,
              "&:hover": { color: "#d4af37" }
            }}
          >
            About
          </Typography>

          {/* ADMIN (ONLY IF LOGGED IN) */}
          {token && (
            <Typography
              onClick={() => navigate("/admin/dashboard")}
              sx={{
                cursor: "pointer",
                color: "#d4af37",
                fontWeight: "bold",
                "&:hover": { opacity: 0.8 }
              }}
            >
              Admin
            </Typography>
          )}

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