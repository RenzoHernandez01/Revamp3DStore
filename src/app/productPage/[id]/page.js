"use client";
import CategoryGrid from "../../components/categoryGrid";
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OtherButtonGrid from "../../components/otherButtonGrid"
import styles from "./productPage.module.css";
import { renderCarousel } from '../../../utils/renderCarousel.js';
import { modelViewer } from '../../../utils/3dViewer';
import AddToCartCard from "../../components/addToCartCard";
import SellerProfileCard from "../../components/sellerProfileCard";
import ProductRatingCard from "../../components/productRatingCard";
import DimensionCard from "../../components/dimensionCard";
import FooterPanel from "../../components/footerPanel";
import ProductDescription from "../../components/productDescription";
import RenderMoreCarousel from "../../../utils/carouselMore";
import ProductCards from "../../components/productCards";
import Stack from '@mui/material/Stack';
import { use } from 'react';
import products from '../../../../data/Products.json';
import seller from '../../../../data/sellerProfiles.json';
import { useAuth } from "@/app/context/AuthContext";
import OtherButtonGridSignedIn from "../../components/otherButtonGridSignedIn";

export  default function productPage({params}){
    let { id } = use(params);
    let product = products.find(p => p.id === id);
    let { isSignedIn, user, signOut } = useAuth();
    let author = seller.find(s => s.id === product.sellerId);
    let authorProducts = products.filter(p => author.id === p.sellerId);
    console.log(authorProducts.length);
    let totalRate =  Object.values(product.ratingsBreakdown).reduce((sum, count) => sum + count,0);
    let weightedSum = Object.entries(product.ratingsBreakdown).reduce( (sum, [score, count]) => sum + Number(score) * count,  0);
    let averageRating = totalRate === 0 ? 0 : (weightedSum / totalRate).toFixed(1);
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

      

    useEffect(() => {renderCarousel(product.images);}, []);
    useEffect(() => {
        if (product?.modelPath) {
            modelViewer({ modelLink: product.modelPath });
        }
        }, [product?.modelPath]);

    return(
    <div>
        {isSignedIn?  <OtherButtonGridSignedIn/>: <OtherButtonGrid/>}
        
        <CategoryGrid/>
        <div className={`${styles.productWrapper}`}>
            <div className={`${styles.productBannerDiv}`}>  
            </div>
            <div className={`${styles.productArea}`}>
                <div className={`${styles.productNamePlace}`}>
                     <Typography variant='h4' color="black">{product.name}</Typography>
                </div>
                <div className={`mainProductImage ${styles.mainProductImage}`}>
                    <div className = {`heroImages ${styles.heroImages}`} id="threeDViewContainer"></div>
                </div>
                 <div className={`${styles.productActionWrapper}`}>
                    <AddToCartCard product={product}/>
                    <SellerProfileCard id={author.id} name={author.name} rating={author.rating} profileImage={author.prof} />
                    <ProductRatingCard totalRatingsBreakdown={totalRate} rating={averageRating} ratingsBreakdown={product.ratingsBreakdown}/>
                    <DimensionCard dimensions={product.dimensions}/>
                </div>
                <div className={`imageCarousel ${styles.imageCarousel}`}>
                     <div className= {`${styles.productImages}`}></div>
                </div>   
                <div className={`${styles.productDescriptionArea}`}>
                    <ProductDescription />
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
                  <ProductCards products={authorProducts} limitEnd={authorProducts.length}/> 
                </RenderMoreCarousel>
            </div>
             <Stack direction="row" sx={{display:"flex", width:"100%",alignItems:"center"}}>
                 <Typography variant="h6" color="black" sx={{display:"flex",fontWeight:"bold",alignItems:"center"}}>Trending Products</Typography>
                <Button variant="outlined" sx={{width:160,height:30,marginLeft:"auto"}}>More Product</Button>
            </Stack>
            <div className = {`moreFromTrending`}>
                <RenderMoreCarousel>
                   <ProductCards products={trendingProducts} limitEnd={5}/> 
                </RenderMoreCarousel>
            </div>
            
        </div>
        <FooterPanel/>
    </div>
    );
}