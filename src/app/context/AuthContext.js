
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);


export const enrichUserWithLibrary = (userData, products) => {
  if (userData?.purchases) {
    userData.library = userData.purchases.map(p => {
      const product = products?.find(prod => prod.id === p.productId);
      return product
        ? { ...product, purchaseDate: p.purchaseDate, priceAtPurchase: p.priceAtPurchase }
        : { id: p.productId, name: "Unknown Product", purchaseDate: p.purchaseDate, priceAtPurchase: p.priceAtPurchase };
    });
  }
  return userData;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [newUser, setNewUser] = useState(null);
 const [isSignedIn, setIsSignedIn] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    setIsSignedIn(true);   
  } else {
    setIsSignedIn(false); 
  }
}, []);


  const signIn = (userData) => {
    const enrichedUser = enrichUserWithLibrary(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setNewUser(false);
    setIsSignedIn(true)
  };

  const signUp = (userData) => {
    //localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData);
    setNewUser(true);
    setIsSignedIn(false)
  }

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setNewUser(false);
    setIsSignedIn(false)
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isSignedIn, user, newUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};