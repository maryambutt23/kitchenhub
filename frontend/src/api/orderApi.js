import axios from "axios";

const API = "https://kitchenhub--maryambutt23.replit.app/api/orders";

// =====================
// PLACE ORDER (PUBLIC)
// =====================
export const placeOrder = async (orderData) => {
  return await axios.post(API, orderData);
};

// =====================
// GET ALL ORDERS (ADMIN)
// =====================
export const getAllOrders = async () => {
  const token = localStorage.getItem("adminToken");

  return await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// =====================
// UPDATE ORDER STATUS (ADMIN)
// =====================
export const updateOrderStatus = async (id, status) => {
  const token = localStorage.getItem("adminToken");

  return await axios.put(
    `${API}/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// =====================
// DELETE ORDER (ADMIN)
// =====================
export const deleteOrder = async (id) => {
  const token = localStorage.getItem("adminToken");

  return await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};