"use client";
import CategoryGrid from "../components/categoryGrid";
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OtherButtonGrid from "../components/otherButtonGrid"
import styles from "./productPage.module.css";
import { renderCarousel } from '../../utils/renderCarousel.js';
export  default function productPage(){

    let mockImages ={
        "images": ["https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/1_msjwan.jpg", 
            "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/2_wxsre2.jpg", 
            "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/4_guzlyz.jpg", 
            "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633435/3_iufuz1.jpg"]
    }
    useEffect(() => {renderCarousel(mockImages);}, []);
    return(
    <div>
        <OtherButtonGrid/>
        <CategoryGrid/>
        <div className={`${styles.productWrapper}`}>
            <div className={`${styles.productBannerDiv}`}>  
            </div>
            <div className={`${styles.productArea}`}>
                <div className={`${styles.productNamePlace}`}>
                     <Typography variant='h3' color="black">Product name</Typography>
                </div>
                <div className={`mainProductImage ${styles.mainProductImage}`}>
                    <div className="heroImages" id="threeDViewContainer">
                    </div>
                </div>
                 <div className={`${styles.productActionWrapper}`}>
                 
                </div>
                <div className={`imageCarousel ${styles.imageCarousel}`}>
                     <div className= {`${styles.productImages}`}></div>
                </div>   
                <div className={`${styles.productDescriptionArea}`}>

                </div>
            </div>
        </div>  
    </div>
    );
}