"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../app/theme"; 
import MSWProvider from "./MSWProvider";
import { AuthProvider } from "./context/AuthContext";
import ProductsProvider from "./context/productsProvider";
import AuthorProvider from "./context/authorProvider";
import { CartProvider } from "./context/cartContext";
import { WishListProvider } from "./context/wishListContext";
import { NotFoundProvider } from "./context/notFoundContext";
export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProductsProvider>
          <AuthorProvider>
            <CartProvider>
              <WishListProvider>
                <NotFoundProvider>
                {children}
                <div id="overlay-root"></div>
                </NotFoundProvider>
              </WishListProvider>
            </CartProvider>
          </AuthorProvider>
        </ProductsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}