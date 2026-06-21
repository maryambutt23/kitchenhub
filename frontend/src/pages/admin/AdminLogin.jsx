import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://kitchenhub--maryambutt23.replit.app/api/auth/login",
        form
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ SAFE TOKEN EXTRACTION
      const token = res.data?.token;

      if (!token) {
        alert("Login failed: Token not received from server");
        return;
      }

      // ✅ store in both (safe approach)
      localStorage.setItem("adminToken", token);
      sessionStorage.setItem("adminToken", token);

      alert("Login successful");

      navigate("/admin/dashboard");

    } catch (err) {
      console.log(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b0b0b",
  },
  box: {
    width: "350px",
    padding: "30px",
    background: "#1a1a1a",
    borderRadius: "12px",
    textAlign: "center",
  },
  title: {
    color: "#d4af37",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#000",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#d4af37",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};