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
import ButtonGridSignedIn from "./components/buttonGridSignedIn";
import { useRouter, } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from "./context/AuthContext";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Home() {
  let { isSignedIn, user, signOut } = useAuth();
  let  router = useRouter();
  let [products, setProducts] = useState([]);
  let homepageProducts = products.filter(p => p.staffPick);
  let getAverage = (ratings) => {
  let entries = Object.entries(ratings || {});
  let totalVotes = entries.reduce((sum, [star, count]) => sum + count, 0);
  let weightedSum = entries.reduce((sum, [star, count]) => sum + Number(star) * count, 0);
    return totalVotes > 0 ? weightedSum / totalVotes : 0;
  };

 let getTopRatedProducts = (products, limit = 10) => {
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
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };  
  setTimeout(runFetch, 300);
}, []);
  return (
<div>
  <section className={styles.searchCategorySection}>       
    <div className ={styles.heroDiv}>
      <div className ={styles.heroOverlay}>
      </div>
       <ButtonGrid/>
      <SearchGrid products={products}/>
      <CategoryGrid/>
    </div>
  </section>
 { /* <CreatorGrid/>
  <section className = {styles.staffPicksSection}>
    
    <div className = {styles.staffPicks}>
    <Stack className = {styles.staffPicksTitle} sx={{margin:0}}>
        <Typography variant="h5"sx={{color:"black", fontWeight:"bold"}} >
        Trending products</Typography>
            <Typography variant="subtitle1"sx={{color:"black",}} >
        Trending products</Typography>
    </Stack>
      <div className = {styles.staffCardsGrid}>
        <ProductCards products={homepageProducts} limitEnd={4}/>  
      </div>
      <div className = {styles.viewPicksGrid}>
         <Button variant="contained" disableElevation 
         sx={{ backgroundColor:"#7DA0CA", "&:hover": {backgroundColor: "#8dadd4ff"} ,}}
         onClick={() => router.push('/categoryPages/marketplace?tag=staffPick')}
        >
            View All Staff Picks
         </Button>
      </div>
    </div>
  </section>*/}
    <Stack direction={"column"} sx={{gap:4,justifyContent:"center", marginBottom:2,}}>
      <CreatorGrid/>
      <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, justifyContent:"flex-start", alignItems:"flex-start"}}>
          <Typography variant="h5"sx={{color:"black", fontWeight:"bold"}} >
          Staff Picks</Typography>
          <Typography variant="caption text"sx={{color:"gray", fontSize:10}} >
          Check out the most popular CG content on FlippedNormals! Level up your art with brushes, textures, and 3D models, and learn with Blender, Maya, Photoshop, ZBrush, and more.
          </Typography>
      </Stack>
      <Stack direction={"row"} sx ={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}}>
          <ProductCards products={homepageProducts} limitEnd={4}/>  
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
   <BannerPanels />
 { /*<section className = {styles.trendingSection}>
    <div className = {styles.trendingPicks}>
      <Typography variant="h5"sx={{color:"black",marginLeft:5,marginTop:4, fontWeight:"bold"}} >Trending products</Typography>
      <div className = {styles.firstRowGrid}>
      <ProductCards products={trendingProducts} limitEnd={4}/> 
      </div>
      <div className = {styles.secondRowGrid}>
      <ProductCards products={trendingProducts} limitStart={4} limitEnd={8}/> 
      </div>
      <div className = {styles.viewAllTrendingGrid}>
        <Button variant="contained" disableElevation  sx={{ backgroundColor:"#7DA0CA", "&:hover": {backgroundColor: "#8dadd4ff"} ,}}
        onClick={() => router.push('/categoryPages/marketplace?tag=trending')}>
            View All Trending
         </Button>
      </div>
    </div>
  </section>*/}
     <Stack direction={"column"} sx={{gap:4,justifyContent:"center", marginBottom:2, marginTop:3}}>
      <Stack direction={"column"} sx={{display:"flex", marginLeft: 5, justifyContent:"flex-start", alignItems:"flex-start"}}>
          <Typography variant="h5"sx={{color:"black", fontWeight:"bold"}} >
          Trending products</Typography>
          <Typography variant="caption text"sx={{color:"gray", fontSize:10}} >
          Check out the most popular CG content on FlippedNormals! Level up your art with brushes, textures, and 3D models, and learn with Blender, Maya, Photoshop, ZBrush, and more.
          </Typography>
      </Stack>
      <Stack direction={"row"} sx ={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}}>
          <ProductCards products={trendingProducts} limitEnd={4}/>  
      </Stack>
      <Stack direction={"row"} sx ={{display:"flex", justifyContent:"center", alignItems:"center", gap:5}}>
          <ProductCards products={trendingProducts} limitStart={4} limitEnd={8}/>  
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


 