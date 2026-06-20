import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >

      {/* 🌌 BACKGROUND IMAGE (SAFE) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "zoomSlow 20s infinite alternate",
        }}
      />

      {/* 🌑 DARK + GOLD AI LAYER */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.4), rgba(0,0,0,0.92))",
        }}
      />

      {/* ✨ AI LIGHT BEAM EFFECT */}
      <Box
        sx={{
          position: "absolute",
          width: "70%",
          height: "70%",
          top: "15%",
          left: "15%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.18), transparent 60%)",
          filter: "blur(60px)",
          animation: "pulseGlow 6s infinite",
        }}
      />

      {/* ✨ FLOATING GOLD PARTICLES */}
      <span className="dot d1" />
      <span className="dot d2" />
      <span className="dot d3" />
      <span className="dot d4" />
      <span className="dot d5" />

      {/* CONTENT */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          maxWidth: "900px",
          px: 2,
          animation: "fadeUp 1.2s ease",
        }}
      >

        {/* TITLE */}
        <Typography
          sx={{
            fontSize: { xs: "2.8rem", md: "4.8rem" },
            fontWeight: 900,
            letterSpacing: "2px",
            animation: "textFloat 1.5s ease",
          }}
        >
          Kitchen{" "}
          <Box component="span" sx={{ color: "#d4af37" }}>
            Hub
          </Box>
        </Typography>

        {/* SUBTITLE */}
        <Typography
          sx={{
            mt: 2,
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "1px",
          }}
        >
          AI-Enhanced Kitchen Experience • Smart Cooking Tools • Luxury Home Essentials
        </Typography>

        {/* BUTTON */}
        <Button
          onClick={() => navigate("/products")}
          sx={{
            mt: 5,
            px: 5,
            py: 1.6,
            borderRadius: "50px",
            fontWeight: 800,
            color: "#d4af37",
            border: "1px solid rgba(212,175,55,0.6)",
            backdropFilter: "blur(10px)",
            transition: "0.4s",
            animation: "fadeUp 1.8s ease",
            "&:hover": {
              background: "#d4af37",
              color: "#000",
              transform: "translateY(-6px) scale(1.05)",
              boxShadow: "0 15px 40px rgba(212,175,55,0.3)",
            },
          }}
        >
          Explore Collection
        </Button>

      </Box>

      {/* 🎬 ANIMATIONS (SAFE INLINE) */}
      <style>
        {`
          @keyframes zoomSlow {
            from { transform: scale(1); }
            to { transform: scale(1.12); }
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes textFloat {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }

          @keyframes pulseGlow {
            0%,100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.15); opacity: 0.95; }
          }

          .dot {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #d4af37;
            border-radius: 50%;
            opacity: 0.7;
            animation: floatDot 6s infinite ease-in-out;
          }

          .d1 { top: 20%; left: 15%; }
          .d2 { top: 30%; right: 20%; animation-delay: 1s; }
          .d3 { bottom: 25%; left: 40%; animation-delay: 2s; }
          .d4 { top: 60%; right: 30%; animation-delay: 3s; }
          .d5 { top: 50%; left: 70%; animation-delay: 4s; }

          @keyframes floatDot {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-25px); }
          }
        `}
      </style>

    </Box>
  );
}