
"use client";
import MSWProvider from "./MSWProvider";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/productsProvider";
import AuthorProvider from "./context/authorProvider";
import { CartProvider } from "./context/cartContext";
import { WishListProvider } from "./context/wishListContext";
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <AuthorProvider>
          <CartProvider>
            <WishListProvider>
            {children}
            <div id="overlay-root"></div>
            </WishListProvider>
          </CartProvider>
        </AuthorProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
