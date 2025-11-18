"use client";
import Image from "next/image";
import styles from "./page.module.css";
import ButtonGrid from "./components/buttonGrid.js";
import CategoryGrid from "./components/categoryGrid.js";
import Link from 'next/link';
import products from '../../data/Products.json'
import CreatorGrid from "./components/creatorGrid.js";
import SearchGrid from "./components/searchGrid.js";
import ProductCards from "./components/productCards.js";
import BannerPanels from "./components/bannerPanels.js";
import FooterPanel from "./components/footerPanel";
import Button from '@mui/material/Button';
<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link>
import { useRouter } from 'next/navigation';


export default function Home() {
  let  router = useRouter();
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

  return (
<div>
  <section className={styles.searchCategorySection}>       
    <div className ={styles.heroDiv}>
      <div className ={styles.heroOverlay}>
      </div>
      <ButtonGrid/>
      <SearchGrid/>
      <CategoryGrid/>
    </div>
  </section>
   <CreatorGrid/>
  <section className = {styles.staffPicksSection}>
    <div className = {styles.staffPicks}>
      <div className = {styles.staffCardsGrid}>
        <ProductCards products={homepageProducts} limitEnd={5}/>  
      </div>
      <div className = {styles.viewPicksGrid}>
         <Button variant="contained" disableElevation 
         onClick={() => router.push('/categoryPages/marketplace?staffPickOnly=true')}
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
      <ProductCards products={trendingProducts} limitEnd={5}/> 
      </div>
      <div className = {styles.secondRowGrid}>
      <ProductCards products={trendingProducts} limitStart={5} limitEnd={10}/> 
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


 