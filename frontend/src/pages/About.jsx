import { Typography, Container, Button, Paper } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";

export default function About() {

  const whatsappNumber = "923328402353";
  const message = "Hello! I want to know more about your kitchen products";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>

          {/* TEXT ANIMATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="h3" gutterBottom>
              About Our Store 🏪
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We are a premium Kitchen E-Commerce Store providing high-quality cookware,
              dinner sets, utensils, and modern kitchen accessories at affordable prices.
              <br /><br />
              Our mission is to make your kitchen beautiful, modern, and fully equipped
              with trusted products delivered all over Pakistan.
            </Typography>
          </motion.div>

        </Paper>
      </motion.div>

      {/* CONTACT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>

          <Typography variant="h5" gutterBottom>
            Contact Information 📞
          </Typography>

          <Typography>📍 Location: Gujrat, Punjab, Pakistan</Typography>
          <Typography>📧 Email: support@kitchenstore.com</Typography>
          <Typography>📱 Phone: +92 300 1234567</Typography>

          {/* BUTTON ANIMATION */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<WhatsAppIcon />}
              href={whatsappLink}
              target="_blank"
              sx={{ mt: 3 }}
            >
              Chat on WhatsApp
            </Button>
          </motion.div>

        </Paper>
      </motion.div>

    </Container>
  );
}