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
export default function Home() {
  let { isSignedIn, user, signOut } = useAuth();
  let  router = useRouter();
  let [products, setProducts] = useState([]);
  let handleClick = () => {
  router.push('/categoryPages/marketplace?staffPickOnly=true');
  };
  let homepageProducts = products.filter(p => p.staffPick);
  let handleViewStaffPicks = () => {
    navigate('/category/all', { state: { staffPickOnly: true } });
  };
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
  setTimeout(runFetch, 100);
}, []);
  return (
<div>
  <section className={styles.searchCategorySection}>       
    <div className ={styles.heroDiv}>
      <div className ={styles.heroOverlay}>
      </div>
      {isSignedIn ? <ButtonGridSignedIn/> : <ButtonGrid/>}
      <SearchGrid products={products}/>
      <CategoryGrid/>
    </div>
  </section>
   <CreatorGrid/>
  <section className = {styles.staffPicksSection}>
    <div className = {styles.staffPicks}>
      <div className = {styles.staffCardsGrid}>
        <ProductCards products={homepageProducts} limitEnd={4}/>  
      </div>
      <div className = {styles.viewPicksGrid}>
         <Button variant="contained" disableElevation 
         onClick={() => router.push('/categoryPages/marketplace?tag=staffPick')}
        >
            View All Staff Picks
         </Button>
      </div>
    </div>
  </section>
   <BannerPanels/>
  <section className = {styles.trendingSection}>
    <div className = {styles.trendingPicks}>
      <div className = {styles.firstRowGrid}>
      <ProductCards products={trendingProducts} limitEnd={4}/> 
      </div>
      <div className = {styles.secondRowGrid}>
      <ProductCards products={trendingProducts} limitStart={4} limitEnd={8}/> 
      </div>
      <div className = {styles.viewAllTrendingGrid}>
        <Button variant="contained" disableElevation 
        onClick={() => router.push('/categoryPages/marketplace?sortMode=trending')}>
            View All Trending
         </Button>
      </div>
    </div>
  </section>
  <section className = {styles.aboutSection}>
    <FooterPanel/>
  </section>
</div>
  );
}


 