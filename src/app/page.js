import Image from "next/image";
import styles from "./page.module.css";
import ButtonGrid from "./components/buttonGrid.js";
import CategoryGrid from "./components/categoryGrid.js";
import Link from 'next/link';
import CreatorGrid from "./components/creatorGrid.js";
import SearchGrid from "./components/searchGrid.js";
import ProductCards from "./components/productCards.js";
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
   <ProductCards/>
   <ProductCards/>
</div>
  );
}


 