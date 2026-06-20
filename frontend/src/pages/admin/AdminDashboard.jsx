import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (acc, order) => acc + (order.totalPrice || 0),
    0
  );

  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Admin Dashboard</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Sales</h3>
          <p>Rs {totalSales}</p>
        </div>

        <div style={styles.card}>
          <h3>Pending Orders</h3>
          <p>{pendingOrders}</p>
        </div>

        <div style={styles.card}>
          <h3>Delivered Orders</h3>
          <p>{deliveredOrders}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    color: "#fff",
  },

  title: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
};