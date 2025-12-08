import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext"; 

const wishListContext = createContext();

export function WishListProvider({ children }) {
  const [wishListItems, setWishListItems] = useState([]);
  const { user } = useAuth(); 
  const storageKey = user?.email ? `wishList_${user.email}` : "wishList"; 

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
    setWishListItems(stored);
  }, [storageKey]); 

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
      localStorage.setItem(storageKey, JSON.stringify(updated)); 
      return updated;
    });
  };

  const removeFromWishList = (id) => {
    setWishListItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const clearWishList = () => {
    setWishListItems([]);
    localStorage.removeItem(storageKey); 
  };

  return (
    <wishListContext.Provider value={{ wishListItems, addToWishList, removeFromWishList, clearWishList }}>
      {children}
    </wishListContext.Provider>
  );
}

export const useWishList = () => useContext(wishListContext);