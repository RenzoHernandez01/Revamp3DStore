"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import styles from "./customerProfile.module.css";
import CategoryGrid from "../components/categoryGrid";
import OtherButtonGrid from "../components/otherButtonGrid"
import OrderHistory from "../components/orderHistory"
import FooterPanel from "../components/footerPanel";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export  default function CustomerProfile(){
  return (
<div>
    <OtherButtonGrid/>
    <CategoryGrid/>
    <div className={`${styles.profileContainer}`}>
        <div className={`${styles.myAccountWrapper}`}>
            <Typography variant="h6" color="#BEBEBE" sx={{marginBottom:3}}>My Account</Typography>
            <Button variant="text" sx={{width:250,justifyContent:'left',marginLeft:1}}>My Library</Button>
            <Button variant="text" sx={{width:250,justifyContent:'left',marginLeft:1}}>OrderHistory</Button>
        </div>
        <div className={`${styles.orderHistoryWrapper}`}>
            <Typography variant="h6" sx={{fontWeight:"bold"}} color="black">Order History</Typography>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
            <OrderHistory/>
        </div>  
       {/* <div className={`${styles.libraryWrapper}`}>
            <Typography variant="h4" color="#BEBEBE">My Library</Typography>
            <LibraryCards/>
            <LibraryCards/>
            <LibraryCards/>
            <LibraryCards/>
            <LibraryCards/>
            <LibraryCards/>
        </div>*/}
    </div>
    
    <FooterPanel/>
</div>
  );
}