"use client";

import CategoryGrid from "../components/categoryGrid";
import FooterPanel from "../components/footerPanel";
import OtherButtonGrid from "../components/otherButtonGrid"
import {ProductsContext} from "../context/productContext";
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useWishList } from "../context/wishListContext";
import ProductCards from "../components/productCards";
import Typography from '@mui/material/Typography';
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import Button from '@mui/material/Button';
import { useRouter, } from 'next/navigation';

export default function wishListPage() {
  let [products, setProducts] = useState([]);
  let  router = useRouter();
  const {wishListItems, setWishListItems} = useWishList();

  return (
<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}> 
  <ProductsContext.Provider value={products}>
   <OtherButtonGrid/>
  </ProductsContext.Provider>
  <Toolbar />
  <CategoryGrid/>
  <Stack sx={{width:"100%",flex:1, display:"flex", flexDirection:"row", flexWrap:"wrap", gap:5, justifyContent:"center", padding:5}}>
      {
        wishListItems.length === 0  ?
        <Stack sx={{justifyContent:"center", alignItems:"center", display:"flex", gap:2}}>
          <InboxRoundedIcon sx={{color:"#313131ff", fontSize: 150}}/>
          <Typography variant="h5"  sx={{color:"black"}}>Your Wishlist is empty
          </Typography>
           <Typography  sx={{color:"black"}}>
           When you save a product, it will appear here.
           </Typography>
            <Button variant="outlined" disableElevation 
          sx={{ borderColor:"black", borderWidth:1.5, color:"black",width: 180,height: 40, whiteSpace:"nowrap",  textTransform: "none",
            "&:hover": {backgroundColor: "#313131ff", color:"white"}}}
          onClick={() => router.push('/categoryPages/marketplace?tag=staffPick')}
          >
              View All Staff Picks
          </Button>
        </Stack>
      :
      <ProductCards
          products={wishListItems}
          limitEnd={wishListItems.length}
          limitStart={0}
        />}

  </Stack>
  <FooterPanel/>
</div>
  );
}







 