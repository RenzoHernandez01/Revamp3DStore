"use client";
import styles from "./page.module.css";
import ButtonGrid from "./components/buttonGrid.js";
import CategoryGrid from "./components/categoryGrid.js";
import CreatorGrid from "./components/creatorGrid.js";
import SearchGrid from "./components/searchGrid.js";
import ProductCards from "./components/productCards.js";
import BannerPanels from "./components/bannerPanels.js";
import FooterPanel from "./components/footerPanel";
import Button from '@mui/material/Button';
import { useRouter, } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from "./context/AuthContext";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ProductsContext } from "@/app/context/productContext";

export default function Home({ searchParams }) {
  let { isSignedIn, user, signOut } = useAuth();
  let  router = useRouter();
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let homepageProducts = products.filter(p => p.staffPick);
  let specialProduct = products.find (p => p.id === "5");
  let getAverage = (ratings) => {
  let entries = Object.entries(ratings || {});
  let totalVotes = entries.reduce((sum, [star, count]) => sum + count, 0);
  let weightedSum = entries.reduce((sum, [star, count]) => sum + Number(star) * count, 0);
    return totalVotes > 0 ? weightedSum / totalVotes : 0;
  };

 let getTopRatedProducts = (products, limit = 15) => {
  return [...products]
    .sort((a, b) => getAverage(b.ratingsBreakdown) - getAverage(a.ratingsBreakdown))
    .slice(0, limit);
  };

  let trendingProducts = getTopRatedProducts(products, 10);


useEffect(() => {
  const runFetch = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      setProducts(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000); 

    } catch (err) {
      console.error('Failed to fetch products:', err);
      setLoading(false);
    }
  };
  setTimeout(runFetch, 1000);
}, []);


  return (
<div>
  <section className={styles.searchCategorySection}>       
    <div className ={styles.heroDiv}>
      <div className ={styles.heroOverlay}>
      </div>
      <ProductsContext.Provider value={products}>
        <ButtonGrid/>
      </ProductsContext.Provider>
   
       <SearchGrid products={products} searchParams={searchParams} />

      <CategoryGrid/>
    </div>
  </section>
    <Stack direction={"column"} sx={{gap:4,justifyContent:"center", marginBottom:2,}}>
       <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, marginTop:5, marginBottom:0,justifyContent:"flex-start", alignItems:"flex-start"}}>
          <Typography variant="h5"sx={{color:"black", fontWeight:"bold", margin:0}} >
         Featured Artists</Typography>
         <Typography variant="caption text"sx={{color:"gray", fontSize:13}} >
          View our top content creators store page
          </Typography>
       </Stack>
      
      <CreatorGrid/>
      <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, justifyContent:"flex-start", alignItems:"flex-start"}}>
          <Typography variant="h5"sx={{color:"black", fontWeight:"bold"}} >
          Staff Picks</Typography>
          <Typography variant="caption text"sx={{color:"gray", fontSize:13}} >
          3D models from our curated marketplace, including assets created for VFX, gaming, and 3D printing. 
          </Typography>
      </Stack>
      <Stack direction={"row"} sx ={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}}>
          <ProductCards products={homepageProducts} limitEnd={4} loading={loading}/>  
      </Stack>
      <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, justifyContent:"center", alignItems:"center"}}>
        <Button variant="outlined" disableElevation 
          sx={{ borderColor:"black", borderWidth:1.5, color:"black",width: 180,height: 40, whiteSpace:"nowrap",  textTransform: "none",
            "&:hover": {backgroundColor: "#313131ff", color:"white"}}}
          onClick={() => router.push('/categoryPages/marketplace?tag=staffPick')}
          >
              View All Staff Picks
          </Button>
      </Stack>
    </Stack>
  
      <BannerPanels product={specialProduct} />


     <Stack direction={"column"} sx={{gap:4,justifyContent:"center", marginBottom:2, marginTop:3}}>
      <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, justifyContent:"flex-start", alignItems:"flex-start"}}>
          <Typography variant="h5"sx={{color:"black", fontWeight:"bold"}} >
          Trending products</Typography>
          <Typography variant="caption text"sx={{color:"gray", fontSize:13}} >
          Check out the most popular CG content on Revamp! 
          </Typography>
      </Stack>
      <Stack direction={"row"} sx ={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}}>
          <ProductCards products={trendingProducts} limitEnd={4} loading={loading}/>  
      </Stack>
      <Stack direction={"row"} sx ={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}}>
          <ProductCards products={trendingProducts} limitStart={4} limitEnd={8} loading={loading}/>  
      </Stack>
      <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, justifyContent:"center", alignItems:"center"}}>
        <Button variant="outlined" disableElevation 
          sx={{ borderColor:"black", borderWidth:1.5, color:"black",width: 180,height: 40, whiteSpace:"nowrap",  textTransform: "none",
            "&:hover": {backgroundColor: "#313131ff", color:"white"}}}
          onClick={() => router.push('/categoryPages/marketplace?tag=trending')}   >
               View All Trending
          </Button>
      </Stack>
    </Stack>
  <section className = {styles.aboutSection}>
    <FooterPanel/>
  </section>
</div>
  );
}


 