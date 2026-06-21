import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: ""
  });

  const [editId, setEditId] = useState(null);

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://kitchenhub--maryambutt23.replit.app/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= IMAGE UPLOAD =================
  const uploadImage = async () => {
    if (!imageFile) return null;

    const data = new FormData();
    data.append("image", imageFile);

    const res = await axios.post(
      "https://kitchenhub--maryambutt23.replit.app/api/products/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res.data.imageUrl;
  };

  // ================= SUBMIT (ADD / UPDATE) =================
  const handleSubmit = async () => {
    try {

      let imageUrl = form.image; // old image

      const uploaded = await uploadImage();
      if (uploaded) imageUrl = uploaded; // new image override

      const productData = {
        ...form,
        image: imageUrl
      };

      if (editId) {
        await axios.put(
          `https://kitchenhub--maryambutt23.replit.app/api/products/${editId}`,
          productData
        );
      } else {
        await axios.post(
          "https://kitchenhub--maryambutt23.replit.app/api/products",
          productData
        );
      }

      resetForm();
      fetchProducts();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT PRODUCT =================
  const editProduct = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      image: product.image || "",
      category: product.category || ""
    });

    setEditId(product._id);
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      image: "",
      category: ""
    });

    setImageFile(null);
    setEditId(null);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://kitchenhub--maryambutt23.replit.app/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER =================
  const filteredProducts = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🛍 Admin Products</h1>
        <p style={styles.subtitle}>Manage your kitchen store inventory</p>
      </div>

      {/* FORM */}
      <div style={styles.formCard}>

        <h2 style={styles.sectionTitle}>
          {editId ? "✏️ Update Product" : "➕ Add Product"}
        </h2>

        <div style={styles.formGrid}>

          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={styles.input}
          />

        </div>

        <button style={styles.primaryBtn} onClick={handleSubmit}>
          {editId ? "Update Product" : "Add Product"}
        </button>

      </div>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* PRODUCTS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.grid}>

          {filteredProducts.map((product) => (

            <div key={product._id} style={styles.card}>

              <img
                src={
                  product.image?.startsWith("http")
                    ? product.image
                    : product.image?.startsWith("/uploads")
                      ? `https://kitchenhub--maryambutt23.replit.app${product.image}`
                      : product.image?.startsWith("/images")
                        ? product.image
                          : `https://kitchenhub--maryambutt23.replit.app${product.image}`
                }
                alt={product.name}
                style={styles.image}
              />

              <div style={styles.cardBody}>

                <h3>{product.name}</h3>
                <p style={styles.price}>Rs {product.price}</p>
                <span style={styles.badge}>{product.category}</span>

                <div style={styles.actions}>

                  <button
                    style={styles.editBtn}
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

// ================= STYLES =================
const styles = {

  page: {
    padding: "30px",
    background: "#0f0f0f",
    minHeight: "100vh",
    color: "#fff"
  },

  header: {
    marginBottom: "25px"
  },

  title: {
    fontSize: "32px",
    color: "#d4af37",
    margin: 0
  },

  subtitle: {
    color: "#aaa"
  },

  formCard: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px"
  },

  sectionTitle: {
    marginBottom: "15px"
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#111",
    color: "#fff"
  },

  primaryBtn: {
    marginTop: "15px",
    padding: "12px 20px",
    background: "#d4af37",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    background: "#111",
    color: "#fff",
    border: "1px solid #333"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#1a1a1a",
    borderRadius: "15px",
    overflow: "hidden"
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover"
  },

  cardBody: {
    padding: "15px"
  },

  price: {
    color: "#d4af37",
    fontWeight: "bold"
  },

  badge: {
    display: "inline-block",
    padding: "5px 10px",
    background: "#333",
    borderRadius: "20px",
    fontSize: "12px",
    marginTop: "5px"
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },

  editBtn: {
    padding: "8px 12px",
    background: "#2196f3",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer"
  },

  deleteBtn: {
    padding: "8px 12px",
    background: "#f44336",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer"
  }
};