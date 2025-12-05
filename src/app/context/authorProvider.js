
"use client";
import { useEffect, useState } from "react";
import { SellerContext } from "./authorContext";
import { useSafeFetch } from "../hooks/useSafeFetch";

export default function AuthorProvider({ children }) {
  const { data: seller, error } = useSafeFetch("/api/seller", []);

  // fallback to empty array if seller is null
  const safeSeller = Array.isArray(seller) ? seller : [];

  return (
    <SellerContext.Provider value={safeSeller}>
      {children}
    </SellerContext.Provider>
  );
}



{ /*const [seller, setSeller] = useState([]);
useEffect(() => {
  const timer = setTimeout(() => {
    fetch("/api/seller")
      .then(res => res.json())
      .then(setSeller)
      .catch(err => console.error("Failed to fetch seller:", err));
  }, 200); 

  return () => clearTimeout(timer);
}, []); */}