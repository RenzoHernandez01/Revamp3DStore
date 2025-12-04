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
import { ProductsContext } from "@/app/context/productContext";
import { useState } from 'react';
import { useRouter, } from 'next/navigation';
import Box from '@mui/material/Box';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

export  default function productPage({params}){
    let { id } = use(params);
    let  router = useRouter();
    let product = products.find(p => p.id === id);
    let { isSignedIn, user, signOut } = useAuth();
    let [expanded, setExpanded] = useState(false)
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
        
        <ProductsContext.Provider value={products}>
        <OtherButtonGrid/>
        </ProductsContext.Provider>
        <CategoryGrid/>
        <div className={`${styles.productWrapper}`}>
            <div className={`${styles.productBannerDiv}`}>  
            </div>
            <div className={`${styles.productArea}`}>
                <div className={`${styles.productNamePlace}`}>
                    <Stack direction={"row"} sx={{height:50, display:"flex", alignItems:"center", width: 710}} >
                     <Typography variant='h4' color="black">{product.name}</Typography> 
                    { product.staffPick && (<Box sx={{height:40, width:120, backgroundColor:"#7DA0CA", marginLeft: "auto", borderRadius:2, display:"flex", alignItems:"center", gap:1, justifyContent:"center"}}>
                        <VerifiedOutlinedIcon/>
                        <Typography>Staff Pick</Typography>
                     </Box>)}
                    </Stack>
                     
                </div>
                <div className={`mainProductImage ${styles.mainProductImage}`}>
                    <div className = {`threeDViewer ${styles.threeDViewer}`} id="threeDViewContainer"></div>  
                </div>
                 <div className={`${styles.productActionWrapper}`}>
                    <AddToCartCard product={product}/>
                    <SellerProfileCard id={author.id} name={author.name} rating={author.rating} profileImage={author.prof} />
                    <ProductRatingCard totalRatingsBreakdown={totalRate} rating={averageRating} ratingsBreakdown={product.ratingsBreakdown}/>
                    <DimensionCard dimensions={product.dimensions}/>
                </div>
                <div className={`imageCarousel ${styles.imageCarousel}`}>
                </div>   
                <div className={`${styles.productDescriptionArea} ${expanded ? styles.expanded : ""}`}>
                    <ProductDescription
                        productName={product.name}
                        sellerName={author.name}
                        rating={averageRating}
                        totalRatingsBreakdown={totalRate}
                    />
                 </div>
                 <Button variant="text" onClick={() => setExpanded(!expanded)}  className={`${styles.showMore}`}  disableRipple 
                 sx={{color:"black", textDecoration:"underline", textTransform: "none", "&:hover": {backgroundColor: "transparent",}}}> 
                    {expanded ? "Show Less" : "Show More"}
                </Button>
            </div>
        </div>  
        <div className ={`${styles.moreProductsWrapper}`}>
            <Stack direction="row" sx={{display:"flex", width:"100%",alignItems:"center"}}>
                <Typography variant="h6" color="black" sx={{display:"flex",fontWeight:"bold",alignItems:"center"}}>More from {author.name}</Typography>
                <Button disableRipple  variant="outlined"   onClick={() => router.push(`/categoryPages/${author.id}`)}
                sx={{width:160,height:30,marginLeft:"auto", borderColor:"black",  color:"black","&:hover": {backgroundColor: "#313131ff", color:"white"}}}>More Product</Button>
            </Stack>
            <div className = {styles.moreFromAuthor}>
                <RenderMoreCarousel>
                  <ProductCards products={authorProducts} limitEnd={authorProducts.length}/> 
                </RenderMoreCarousel>
            </div>
             <Stack direction="row" sx={{display:"flex", width:"100%",alignItems:"center"}}>
                <Typography variant="h6" color="black" sx={{display:"flex",fontWeight:"bold",alignItems:"center"}}>Trending Products</Typography>
                <Button disableRipple  variant="outlined"  onClick={() => router.push('/categoryPages/marketplace?tag=trending')}
                sx={{width:160,height:30,marginLeft:"auto", borderColor:"black",  color:"black","&:hover": {backgroundColor: "#313131ff", color:"white"}}}>More Product</Button>
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