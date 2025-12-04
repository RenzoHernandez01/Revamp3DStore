
import { createContext, useContext, useEffect, useState } from "react";

const wishListContext = createContext();

export function WishListProvider({ children }) {
  const [wishListItems, setWishListItems] = useState([]);
  
 useEffect(() => {
   const stored = JSON.parse(localStorage.getItem("wishList")) || [];
    setWishListItems(stored)
  },[]);

  const addToWishList = (product) => {
    setWishListItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem("wishList", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishList = (id) => {
    setWishListItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem("wishList", JSON.stringify(updated));
      return updated;
    });
  };

    const clearWishList = () => {
    setWishListItems([]);
    localStorage.removeItem("wishList"); 
  };


  return (
    <wishListContext.Provider value={{ wishListItems, addToWishList, removeFromWishList, clearWishList }}>
      {children}
    </wishListContext.Provider>
  );
}

export const useWishList = () => useContext(wishListContext);