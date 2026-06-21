import axios from "axios";

const BASE_URL = "https://kitchenhub--maryambutt23.replit.app/api/products";

// =====================
// GET ALL PRODUCTS
// =====================
export const getProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// =====================
// CREATE PRODUCT
// =====================
export const createProduct = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

// =====================
// UPDATE PRODUCT
// =====================
export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

// =====================
// DELETE PRODUCT
// =====================
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};