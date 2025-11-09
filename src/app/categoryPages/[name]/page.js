import Image from "next/image";
import styles from "./category.module.css";
import ButtonGrid from "../../components/buttonGrid.js";
import CategoryGrid from "../../components/categoryGrid.js";
import Link from 'next/link';
import ProductCards from "../../components/productCards.js";
import BannerPanels from "../../components/bannerPanels.js";
import FooterPanel from "../../components/footerPanel";
import Button from '@mui/material/Button';
import OtherButtonGrid from "../../components/otherButtonGrid"
export default function Home() {
  return (
<div>
   <OtherButtonGrid/>
   <BannerPanels/>
   <CategoryGrid/>
  <section className = {styles.aboutSection}>
    <FooterPanel/>
  </section>
</div>
  );
}








 