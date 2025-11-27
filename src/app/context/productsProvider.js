// src/app/context/ProductsProvider.jsx
"use client";
import { useEffect, useState } from "react";
import { ProductsContext } from "./productContext";

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}