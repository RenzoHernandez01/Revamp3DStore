
"use client";
import MSWProvider from "./MSWProvider";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/productsProvider";
import AuthorProvider from "./context/authorProvider";
import { CartProvider } from "./context/cartContext";
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <AuthorProvider>
          <CartProvider>
            {children}
            <div id="overlay-root"></div>
          </CartProvider>
        </AuthorProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
