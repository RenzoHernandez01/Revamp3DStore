"use client";
import { useEffect, useState } from 'react';
import CategoryGrid from "../../components/categoryGrid";
import FooterPanel from "../../components/footerPanel";
import OtherButtonGrid from "../../components/otherButtonGrid";
import SignInForm from '@/app/components/signInForm';
import SignUpForm from '@/app/components/signUpForm';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Toolbar from '@mui/material/Toolbar';
import { ProductsContext } from "../../context/productContext";

export default function AuthPage() {
  let { isSignedIn, user, signOut } = useAuth();
  let { mode } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : data.products))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div>
      <ProductsContext.Provider value={products}>
        <OtherButtonGrid/>
      </ProductsContext.Provider>
      <Toolbar />
      <CategoryGrid/>
      {mode === 'signin' && <SignInForm/>}
      {mode === 'signup' && <SignUpForm/>}
      <FooterPanel/>
    </div>
  );
}