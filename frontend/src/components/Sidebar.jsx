import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const categories = [
    "Kitchen Appliances",
    "Dinner Sets",
    "Water Sets",
    "Soup Sets",
    "Tea sets",
    "Accessories",
  ];

  const handleClick = (category) => {
    const slug = category.toLowerCase().replaceAll(" ", "-");
    navigate(`/products/${slug}`);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          background: "#0b0b0b",
          color: "#fff",
          borderRight: "1px solid rgba(212, 175, 55, 0.2)",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            letterSpacing: "2px",
          }}
        >
          Categories
        </Typography>

        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.6)",
            mt: 1,
          }}
        >
          Explore premium kitchen collection
        </Typography>
      </Box>

      {/* LIST */}
      <List sx={{ mt: 1 }}>
        {categories.map((cat, index) => (
          <ListItem
            key={index}
            onClick={() => handleClick(cat)}
            sx={{
              cursor: "pointer",
              px: 3,
              py: 1.5,
              transition: "0.3s",
              borderLeft: "3px solid transparent",
              "&:hover": {
                background: "rgba(212, 175, 55, 0.08)",
                borderLeft: "3px solid #d4af37",
                pl: 4,
              },
            }}
          >
            <ListItemText
              primary={cat}
              primaryTypographyProps={{
                sx: {
                  fontWeight: 500,
                  letterSpacing: "0.5px",
                  color: "rgba(255,255,255,0.85)",
                  transition: "0.3s",
                  "&:hover": {
                    color: "#d4af37",
                  },
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}