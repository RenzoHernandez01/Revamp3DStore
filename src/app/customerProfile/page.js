"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import styles from "./customerProfile.module.css";
import CategoryGrid from "../components/categoryGrid";
import OtherButtonGridSignedIn from "../components/otherButtonGridSignedIn";
import OrderHistory from "../components/orderHistory"
import FooterPanel from "../components/footerPanel";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LibraryCards from '../components/libraryCards';
import products from  '../../../data/Products.json';
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from 'react';
export  default function CustomerProfile(){
     const searchParams = useSearchParams();
    const [libraryItems, setLibraryItems] = useState([]);
    const initialSection = searchParams.get("section") || "library";
    let [activeSection, setActiveSection] = useState("initialSection");
    useEffect(() => {
    const section = searchParams.get("section") || "library";
    setActiveSection(section);
  }, [searchParams]);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.purchases) {
      const merged = storedUser.purchases.map(p => {
      const product = products.find(prod => prod.id === p.productId);
        return product
          ? { ...product, purchaseDate: p.purchaseDate, priceAtPurchase: p.priceAtPurchase}
          : { id: p.productId, name: "Unkno wn Product", purchaseDate: p.purchaseDate, priceAtPurchase: p.priceAtPurchase };
      });
      setLibraryItems(merged);
    }
  }, []);

  
  return (
<div>
    <OtherButtonGridSignedIn/>
    <CategoryGrid/>
    <div className={`${styles.profileContainer}`}>
        <div className={`${styles.myAccountWrapper}`}>
            <Typography variant="h6" color="#BEBEBE" sx={{marginBottom:3}}>My Account</Typography>
            <Button onClick={() => setActiveSection("library")} variant="text" sx={{width:250,justifyContent:'left',marginLeft:1}}>My Library</Button>
            <Button  onClick={() => setActiveSection("orderHistory")} variant="text" sx={{width:250,justifyContent:'left',marginLeft:1}}>OrderHistory</Button>
        </div>
        {activeSection === "orderHistory" && 
       ( <div className={`${styles.orderHistoryWrapper}`}>
            <Typography variant="h4"  color="#BEBEBE" >Order History</Typography>
            {libraryItems.map((item, idx) => (
                <OrderHistory key={idx} product={item}/>
              ))}
        </div>) }
          {activeSection === "library" && 
          (<div className={`${styles.libraryWrapper}`}>
            <Typography variant="h4" color="#BEBEBE">My Library</Typography>
           {libraryItems.map((item, idx) => (
                <LibraryCards key={idx} product={item}/>
              ))}

        </div>) }
    </div>
   
    <FooterPanel/>
</div>
  );
}