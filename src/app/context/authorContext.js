
import { createContext, useContext } from 'react';

export const SellerContext = createContext([]);
export const useSellers = () => useContext(SellerContext);