
"use client";
import MSWProvider from "./MSWProvider";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/productsProvider";
import AuthorProvider from "./context/authorProvider";
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <AuthorProvider>
        {children}
        <div id="overlay-root"></div>
        </AuthorProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
