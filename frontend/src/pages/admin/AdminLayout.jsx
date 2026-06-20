import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "#d4af37" }}>Admin Panel</h2>

        {/* HOME BUTTON ADDED */}
        <button
          onClick={() => navigate("/")}
          style={styles.homeBtn}
        >
          🏠 Home
        </button>

        <NavLink to="/admin/dashboard" style={styles.link}>
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/orders" style={styles.link}>
          📦 Orders
        </NavLink>

        <NavLink to="/admin/products" style={styles.link}>
          🛍 Products
        </NavLink>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        {children}
      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#0f0f0f",
    color: "#fff",
  },

  sidebar: {
    width: "240px",
    background: "#141414",
    padding: "20px",
    borderRight: "1px solid #333",
  },

  homeBtn: {
    marginTop: "15px",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  link: {
    display: "block",
    marginTop: "12px",
    padding: "10px",
    background: "#1a1a1a",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
  },

  logout: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    background: "red",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },

  main: {
    flex: 1,
    padding: "20px",
  },
};