"use client";
import { useEffect, useState } from 'react';
import CategoryGrid from "../../components/categoryGrid";
import FooterPanel from "../../components/footerPanel";
import OtherButtonGrid from "../../components/otherButtonGrid";
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { ProductsContext } from "../../context/productContext";
import Typography from '@mui/material/Typography';
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
      <Stack sx={{height:500, display:"flex", alignItems:"center",mt:25}}>
      
        {mode === 'termsofservices' && (<Stack>
        <Typography variant='h3'>This is a mock Terms of Service Page</Typography>
        <Typography variant='h5'>Welcome to Revamp. By using this demo site, you agree this is a mock Terms of Service. </Typography>
        </Stack>)} 

        {mode === 'privacy' && (<Stack>
        <Typography variant='h3'>This is a mock Privacy Policy Page</Typography>
        <Typography variant='h5'>Welcome to Revamp. By using this demo site, you agree this is a Privacy Policy Page. </Typography>
        </Stack>)}
        
      </Stack>
      <FooterPanel/>
    </div>
  );
}