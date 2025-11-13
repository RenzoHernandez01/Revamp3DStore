"use client";
import CategoryGrid from "../components/categoryGrid";
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OtherButtonGrid from "../components/otherButtonGrid"
import styles from "./productPage.module.css";
import { renderCarousel } from '../../utils/renderCarousel.js';
import { modelViewer } from '../../utils/3dViewer';
import AddToCartCard from "../components/addToCartCard";
import SellerProfileCard from "../components/sellerProfileCard";
import ProductRatingCard from "../components/productRatingCard";
import DimensionCard from "../components/dimensionCard";
import FooterPanel from "../components/footerPanel";
import ProductDescription from "../components/productDescription";
import RenderMoreCarousel from "../../utils/carouselMore";
import ProductCards from "../components/productCards";
import Stack from '@mui/material/Stack';

export  default function productPage(){

    let mockImages ={
        "images": ["https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/1_msjwan.jpg", 
            "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/2_wxsre2.jpg", 
            "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/4_guzlyz.jpg", 
            "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633435/3_iufuz1.jpg"]
    }
    useEffect(() => {renderCarousel(mockImages);}, []);
    useEffect(() => {modelViewer();}, []);
    return(
    <div>
        <OtherButtonGrid/>
        <CategoryGrid/>
        <div className={`${styles.productWrapper}`}>
            <div className={`${styles.productBannerDiv}`}>  
            </div>
            <div className={`${styles.productArea}`}>
                <div className={`${styles.productNamePlace}`}>
                     <Typography variant='h4' color="black">Product name</Typography>
                </div>
                <div className={`mainProductImage ${styles.mainProductImage}`}>
                    <div className = {`heroImages ${styles.heroImages}`} id="threeDViewContainer"></div>
                </div>
                 <div className={`${styles.productActionWrapper}`}>
                    <AddToCartCard/>
                    <SellerProfileCard/>
                    <ProductRatingCard/>
                    <DimensionCard/>
                </div>
                <div className={`imageCarousel ${styles.imageCarousel}`}>
                     <div className= {`${styles.productImages}`}></div>
                </div>   
                <div className={`${styles.productDescriptionArea}`}>
                    <ProductDescription/>
                </div>
            </div>
        </div>  
        <div className ={`${styles.moreProductsWrapper}`}>
            <Stack direction="row" sx={{display:"flex", width:"100%",alignItems:"center"}}>
                <Typography variant="h6" color="black" sx={{display:"flex",fontWeight:"bold",alignItems:"center"}}>More from Author</Typography>
                <Button variant="outlined" sx={{width:160,height:30,marginLeft:"auto"}}>More Product</Button>
            </Stack>
            <div className = {`moreFromAuthor`}>
                <RenderMoreCarousel>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                </RenderMoreCarousel>
            </div>
             <Stack direction="row" sx={{display:"flex", width:"100%",alignItems:"center"}}>
                 <Typography variant="h6" color="black" sx={{display:"flex",fontWeight:"bold",alignItems:"center"}}>Trending Products</Typography>
                <Button variant="outlined" sx={{width:160,height:30,marginLeft:"auto"}}>More Product</Button>
            </Stack>
            <div className = {`moreFromTrending`}>
                <RenderMoreCarousel>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                   <ProductCards/>
                </RenderMoreCarousel>
            </div>
            
        </div>
        <FooterPanel/>
    </div>
    );
}