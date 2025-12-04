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
export default function wishListPage() {
  let [products, setProducts] = useState([]);
  const {wishListItems, setWishListItems} = useWishList();
  console.log(wishListItems,"asdfasdfsadfsadf");
  return (
<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}> 
  <ProductsContext.Provider value={products}>
   <OtherButtonGrid/>
  </ProductsContext.Provider>
  <Toolbar />
  <CategoryGrid/>
  <Stack sx={{width:"100%",flex:1, display:"flex", flexDirection:"row", flexWrap:"wrap", gap:5, padding:5}}>
      <ProductCards
          products={wishListItems}
          limitEnd={wishListItems.length}
          limitStart={0}
        />

  </Stack>
  <FooterPanel/>
</div>
  );
}







 