
"use client";
import { useEffect, useState } from "react";
import { ProductsContext } from "./productContext";
import { useSafeFetch } from "../hooks/useSafeFetch";

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

{/*export default function ProductsProvider({ children }) {
  const { data: products, error } = useSafeFetch("/api/products", []);
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <ProductsContext.Provider value={{ products: safeProducts, error }}>
      {children}
    </ProductsContext.Provider>
  );
}*/}
