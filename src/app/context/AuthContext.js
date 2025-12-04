
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

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
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setNewUser(false);
    setIsSignedIn(true)
  };

  const signUp = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData);
    setNewUser(true);
    setIsSignedIn(false)
  }

  const signOut = () => {
  /*   if (user?.email) {
    localStorage.removeItem(`savedPaymentInfo_${user.email}`);
  }*/
    localStorage.removeItem("user");
    setUser(null);
    setNewUser(false);
    setIsSignedIn(false)
  };

  return (
    <AuthContext.Provider value={{ user, isSignedIn, user, newUser, signUp, signIn, signOut }}>
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