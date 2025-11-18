"use client";
import styles from "./category.module.css";
import CategoryGrid from "../../components/categoryGrid.js";
import products from '../../../../data/Products.json';
import ProductCards from "../../components/productCards.js";
import BannerPanels from "../../components/bannerPanels.js";
import FooterPanel from "../../components/footerPanel";
import OtherButtonGrid from "../../components/otherButtonGrid"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { useParams } from 'next/navigation';
import { useState } from "react";
import categoryGrid from "../../components/categoryGrid.js";
import { useRouter, useSearchParams} from 'next/navigation';


export default function CategoryPage() {
let router = useRouter();
let searchParams = useSearchParams();
let { name } = useParams(); // e.g. 'weapons'
let normalized = name?.toLowerCase(); // category
let tag = searchParams.get('tag'); // e.g. 'trending', 'onSale', etc.
const priceFrom = Number(searchParams.get('price-from')) || 0;
const priceTo = Number(searchParams.get('price-to')) || 1000;

let priceFilterActive = searchParams.has('maxPrice');

let sortMode = ['trending', 'bestSelling', 'latest'].includes(tag) ? tag : null;
let staffPickOnly = tag === 'staffPick';
let onSaleOnly = tag === 'onSale';

let filtered = products.filter(product => {
  let matchesCategory =
    normalized === "all" || normalized === "marketplace"
      ? true
      : product.category.toLowerCase() === normalized;

  let matchesOnSale = onSaleOnly ? !!product.onSale : true;
  let matchesStaffPick = staffPickOnly ? !!product.staffPick : true;
  let matchesPrice = priceFilterActive ? product.price <= sliderValue : true;

  return matchesCategory && matchesOnSale && matchesStaffPick && matchesPrice;
});





let sortedFiltered = [...filtered];

console.log(sortedFiltered.length);
if (sortMode === "bestSelling") {
  sortedFiltered.sort((a, b) => {
    let totalA = Object.values(a.ratingsBreakdown || {}).reduce((sum, count) => sum + count, 0);
    let totalB = Object.values(b.ratingsBreakdown || {}).reduce((sum, count) => sum + count, 0);
    return totalB - totalA;
  });
}

if (sortMode === "trending") {
  let getAverage = (ratings) => {
    let entries = Object.entries(ratings || {});
    let totalVotes = entries.reduce((sum, [star, count]) => sum + count, 0);
    let weightedSum = entries.reduce((sum, [star, count]) => sum + Number(star) * count, 0);
    return totalVotes > 0 ? weightedSum / totalVotes : 0;
  };

  sortedFiltered.sort((a, b) => {
    let avgA = getAverage(a.ratingsBreakdown);
    let avgB = getAverage(b.ratingsBreakdown);
    return avgB - avgA;
  });
}

if (sortMode === "latest") {
  sortedFiltered.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB - dateA;
  });
}

let category = name?.charAt(0).toUpperCase() + name?.slice(1);
let isFiltered = tag !== null || priceFilterActive;
let shouldRenderAll = normalized === 'marketplace' && !isFiltered;

  return (
<div>
   <OtherButtonGrid/>
   <BannerPanels/>
   <CategoryGrid/>
   <section className={styles.popularCategory}>
    <Stack direction="row" spacing={2} sx={{marginLeft:1}}>
    {isFiltered && (<Button  disableElevation disableRipple
    onClick={() => router.push(`/categoryPages/${name}`)}
      sx={{
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit', 
        },
        '&:hover':{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          color:"black"
        },
        color:"gray"
      }}
    >clear all filter</Button>)}
    <Button  disableElevation disableRipple
       onClick={() => router.push(`/categoryPages/${name}?tag=trending`)}

      sx={{
        textDecoration: sortMode === "trending" ? 'underline' : 'none',
        textDecorationThickness: sortMode === "trending" ? '2px' : '0px',
        color: sortMode === "trending" ? "black" :  "gray",
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit', 
        },
        '&:hover':{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          color:"black"
        },
      }}
    >Trending</Button>
    <Button  disableElevation disableRipple
      onClick={() => router.push(`/categoryPages/${name}?tag=bestSelling`)}
      sx={{
      textDecoration: sortMode === "bestSelling" ? 'underline' : 'none',
      textDecorationThickness: sortMode === "bestSelling" ? '2px' : '0px',
      color: sortMode === "bestSelling" ? "black" :  "gray",

        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit', 
        },
        '&:hover':{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          color:"black"
        },
      }}
    >BestSelling</Button>
     <Button  disableElevation disableRipple
     onClick={() => router.push(`/categoryPages/${name}?tag=latest`)}
        
      sx={{
        textDecoration: sortMode === "latest" ? 'underline' : 'none',
        textDecorationThickness: sortMode === "latest" ? '2px' : '0px',
        color: sortMode === "latest" ? "black" :  "gray",
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit', 
        },
        '&:hover':{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          color:"black"
        },
   
      }}
    >Latest</Button>
    <Button  disableElevation disableRipple
      onClick={() => router.push(`/categoryPages/${name}?tag=onSale`)}
      sx={{
        textDecoration: onSaleOnly ? 'underline' : 'none',
        textDecorationThickness: onSaleOnly  ? '2px' : '0px',
        color: onSaleOnly  ? "black" :  "gray",
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit', 
        },
        '&:hover':{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          color:"black"
        },
      }}
    >
    On Sale</Button>
    <Button  disableElevation disableRipple
      onClick={() => router.push(`/categoryPages/${name}?tag=staffPick`)}
      sx={{
        textDecoration: staffPickOnly ? 'underline' : 'none',
        textDecorationThickness: staffPickOnly  ? '2px' : '0px',
        color: staffPickOnly  ? "black" :  "gray",
        '&:focus': {
          outline: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit', 
        },
        '&:hover':{
          backgroundColor: 'inherit',
          boxShadow: 'none',
          color:"black"
        },
      }}
    >StaffPicks</Button>
    </Stack>
   </section>
   <section className="catalogMainArea">
      <div className={`${styles.catalogMainAreaContainer}`}>
        <div className={`${styles.collapseArea}`}>
          <Accordion  sx={{backgroundColor:"transparent",boxShadow:0}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{marginBottom:0,paddingBottom:0}}
            >
              <Typography component="span">Category</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{margin:0,padding:0}}>
              <Box sx={{ width: '100%', maxWidth: 360,marginTop:0, padding:0, }}>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => setSelectedCategory("character") }>
                          <ListItemText primary="Character" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => setSelectedCategory("terrain")}>
                          <ListItemText primary="Terrain" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => setSelectedCategory("vehicle")}>
                          <ListItemText primary="Vehicle"/>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => setSelectedCategory("weapon")}>
                          <ListItemText primary="Weapon"/>
                        </ListItemButton>
                      </ListItem>
                       <ListItem disablePadding>
                        <ListItemButton onClick={() => setSelectedCategory("props")}> 
                          <ListItemText primary="Props"/>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </nav>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{backgroundColor:"transparent",boxShadow:0}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center", width: 300,padding:0}}>
                <TextField  type= "number" size= "small"  value= {String(sliderValue)}  
                onChange={(e) => {
                let newValue = Number(e.target.value);
                    if (!isNaN(newValue)) {
                      setSliderValue(newValue);
                    }
                  }}
                  sx={{
                      width: 150,
                      backgroundColor:"white",
                      
                      '& input[type=number]': {
                        MozAppearance: 'textfield', 
                      },
                      '& input[type=number]::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                      '& input[type=number]::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                      },
                    }}
                  >
                </TextField>
                <Slider value={sliderValue} onChange={(e, newValue) => {setSliderValue(newValue); setPriceFilterActive(newValue !== 1000); }}  min={200} max={1000} step={1}/>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={`${styles.catalogCardsArea}`}>
          <div className={`${styles.catalogCards}`}>
             <ProductCards
                    products={shouldRenderAll ? products : sortedFiltered}
                    filterMode={shouldRenderAll ? null : category}
                  />


          </div>
        </div>
      </div>
   </section>
   <section className = {styles.aboutSection}>
    <FooterPanel/>
   </section>
</div>
  );
}








 