
"use client";
import { useEffect, useState } from "react";
import { SellerContext } from "./authorContext";

export default function AuthorProvider({ children }) {
 const [seller, setSeller] = useState([]);
useEffect(() => {
  const timer = setTimeout(() => {
    fetch("/api/seller")
      .then(res => res.json())
      .then(setSeller)
      .catch(err => console.error("Failed to fetch seller:", err));
  }, 200); // wait 200ms

  return () => clearTimeout(timer);
}, []);


  return (
    <SellerContext.Provider value={seller}>
      {children}
    </SellerContext.Provider>
  );
}