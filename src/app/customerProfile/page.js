"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import styles from "./customerProfile.module.css";
import CategoryGrid from "../components/categoryGrid";
import OtherButtonGrid from "../components/otherButtonGrid";
import OrderHistory from "../components/orderHistory"
import FooterPanel from "../components/footerPanel";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LibraryCards from '../components/libraryCards';
import products from  '../../../data/Products.json';
import { useSearchParams } from "next/navigation";
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import { ProductsContext } from '../context/productContext';
export  default function CustomerProfile(){
    const searchParams = useSearchParams();
    const [libraryItems, setLibraryItems] = useState([]);
   const initialSection = searchParams.get("section") || "library";
const [activeSection, setActiveSection] = useState(initialSection);

    useEffect(() => {
    const section = searchParams.get("section") || "library";
    setActiveSection(section);
  }, [searchParams]);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedUserRaw = window.localStorage.getItem("user");
    if (storedUserRaw) {
      try {
        const storedUser = JSON.parse(storedUserRaw);
        if (storedUser?.purchases) {
          const merged = storedUser.purchases.map(p => {
            const product = products.find(prod => prod.id === p.productId);
            return product
              ? { ...product, purchaseDate: p.purchaseDate, priceAtPurchase: p.priceAtPurchase }
              : { id: p.productId, name: "Unknown Product", purchaseDate: p.purchaseDate, priceAtPurchase: p.priceAtPurchase };
          });
          setLibraryItems(merged);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }
}, []);


  
  return (
<div>
  <ProductsContext.Provider value={products}>
    <OtherButtonGrid/>
  </ProductsContext.Provider>
    <Toolbar/>
    <CategoryGrid/>
    <div className={`${styles.profileContainer}`}>
        <div className={`${styles.myAccountWrapper}`}>
            <Typography variant="h6" color="#777" sx={{marginBottom:3}}>My Account</Typography>
             <Box sx={{width:300, height:"1px",backgroundColor:"#777", marginBottom:2}}>
             </Box>
            <Button
                onClick={() => setActiveSection("library")}
                disableRipple
                variant="text"
                sx={{
                  width: 250,
                  justifyContent: "left",
                  marginLeft: 1,
                  marginBottom: 1,
                  color: activeSection === "library" ?  "#004598ff" :  "#777",
                  backgroundColor: activeSection === "library" ? "white" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e0e0e0ff",
                  },
                }}
              >
                My Library
            </Button>
            <Button  onClick={() => setActiveSection("orderHistory")} 
            variant="text" 
            sx={{
                  width: 250,
                  justifyContent: "left",
                  marginLeft: 1,
                  marginBottom: 1,
                  color: activeSection === "orderHistory" ?  "#004598ff" :  "#777",
                  backgroundColor: activeSection === "orderHistory" ? "white" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e0e0e0ff",
                  },
                }}
              >
              OrderHistory
            </Button>
        </div>
        {activeSection === "orderHistory" && 
       ( <div className={`${styles.orderHistoryWrapper}`}>
            <Typography variant="h4"  color="black" >Order History</Typography>
            {libraryItems.map((item, idx) => (
                <OrderHistory key={idx} product={item}/>
              ))}
        </div>) }
          {activeSection === "library" && 
          (<div className={`${styles.libraryWrapper}`}>
            <Typography variant="h4" color="black">My Library</Typography>
           {libraryItems.map((item, idx) => (
                <LibraryCards key={idx} product={item}/>
              ))}

        </div>) }
    </div>
   
    <FooterPanel/>
</div>
  );
}