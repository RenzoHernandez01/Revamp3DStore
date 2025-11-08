import Image from "next/image";
import styles from "./page.module.css";
import ButtonGrid from "./components/buttonGrid.js";
import CategoryGrid from "./components/categoryGrid.js";
import Link from 'next/link';
import CreatorGrid from "./components/creatorGrid.js";
import SearchGrid from "./components/searchGrid.js";
import ProductCards from "./components/productCards.js";
import BannerPanels from "./components/bannerPanels";
import Button from '@mui/material/Button';
export default function Home() {
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
        <ProductCards/>
        <ProductCards/>
        <ProductCards/>
        <ProductCards/>
        
      </div>
      <div className = {styles.viewPicksGrid}>
         <Button variant="contained" disableElevation>
            Disable elevation
         </Button>
      </div>
    </div>
  </section>
   <BannerPanels/>
  <section className = {styles.trendingSection}>
    <div className = {styles.trendingPicks}>
      <div className = {styles.firstRowGrid}>
        <ProductCards/><ProductCards/><ProductCards/><ProductCards/>
      </div>
      <div className = {styles.secondRowGrid}>
        <ProductCards/><ProductCards/><ProductCards/><ProductCards/>
      </div>
      <div className = {styles.viewAllTrendingGrid}>
        <Button variant="contained" disableElevation>
            Disable elevation
         </Button>
      </div>
    </div>
  </section>
  
</div>
  );
}


 