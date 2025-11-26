
"use client";
import MSWProvider from "./MSWProvider";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/productsProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
        <div id="overlay-root"></div>
        <MSWProvider />
      </ProductsProvider>
    </AuthProvider>
  );
}