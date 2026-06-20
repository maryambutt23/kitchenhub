import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      return [];
    }
  });

  const [shipping] = useState(200);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // AUTO CALCULATION (SUBTOTAL + TAX + TOTAL)
  useEffect(() => {
    const subTotal = cart.reduce((sum, item) => {
      return sum + item.price * (item.qty || 1);
    }, 0);

    const taxAmount = subTotal * 0.05; // 5% tax
    const finalTotal = subTotal + taxAmount + shipping;

    setTax(taxAmount);
    setTotal(finalTotal);

  }, [cart, shipping]);

  // ADD TO CART
  const addToCart = (product) => {

    if (!product || !product._id) return;

    setCart((prev) => {

      const existing = prev.find((item) => item._id === product._id);

      if (existing) {

        toast.info("Quantity updated 🔄");

        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }

      toast.success("Added to cart 🛒");

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    toast.error("Removed from cart ❌");
  };

  // INCREASE QTY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: (item.qty || 1) + 1 }
          : item
      )
    );
  };

  // DECREASE QTY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: (item.qty || 1) - 1 }
            : item
        )
        .filter((item) => (item.qty || 1) > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        tax,
        shipping,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);