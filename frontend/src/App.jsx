import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./layout/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import About from "./pages/About";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // SAFE: handles /admin, /admin/* routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container">

      {/* USER NAVBAR ONLY */}
      {!isAdminRoute && (
        <>
          <Navbar onMenuClick={() => setOpen(true)} />
          <Sidebar open={open} onClose={() => setOpen(false)} />
        </>
      )}

      <div className="main-content">

        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />

          {/* ================= ADMIN LOGIN ================= */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* ================= ADMIN DASHBOARD ================= */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN ORDERS ================= */}
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* ================= ADMIN PRODUCTS ================= */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

      {/* TOAST NOTIFICATIONS */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
      />

    </div>
  );
}

export default App;