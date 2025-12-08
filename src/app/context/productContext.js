// productContext.js
import { createContext, useContext } from "react";

export const ProductsContext = createContext({
  products: [],
  loading: true,
  error: null,
});

export const useProducts = () => useContext(ProductsContext);
