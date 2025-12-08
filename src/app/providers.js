"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../app/theme"; // 👈 make sure this exports your Open Sans theme

import MSWProvider from "./MSWProvider";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/productsProvider";
import AuthorProvider from "./context/authorProvider";
import { CartProvider } from "./context/cartContext";
import { WishListProvider } from "./context/wishListContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}