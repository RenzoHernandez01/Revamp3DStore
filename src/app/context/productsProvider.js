// productsProvider.js
"use client";
import { useEffect, useState } from "react";
import { ProductsContext } from "./productContext";

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

{/*export default function ProductsProvider({ children }) {
  const { data: products, error } = useSafeFetch("/api/products", []);
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <ProductsContext.Provider value={{ products: safeProducts, error }}>
      {children}
    </ProductsContext.Provider>
  );
}*/}
