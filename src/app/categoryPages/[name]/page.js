"use client";
import Image from "next/image";
import styles from "./category.module.css";
import CategoryGrid from "../../components/categoryGrid.js";
import Link from 'next/link';
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
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import { useParams } from 'next/navigation';
import { useState } from "react";

export default function CategoryPage() {
  let [selectedCategory, setSelectedCategory] = useState(null);
  let [onSaleOnly, setOnSaleOnly] = useState(false);
  let [staffPickOnly, setStaffPickOnly] = useState(false);
  let [sortMode, setSortMode] = useState(null);
  let{ name } = useParams(); 
  let normalized = name?.toLowerCase();
 

  let filtered = products.filter(product => {
  let matchesCategory = selectedCategory
    ? product.category.toLowerCase() === selectedCategory.toLowerCase()
    : normalized === "all" || product.category.toLowerCase() === normalized;
  let matchesOnSale = onSaleOnly ? product.onSale === true : true;
  let matchesStaffPick = staffPickOnly ? product.staffPick === true : true;
  return matchesCategory && matchesOnSale && matchesStaffPick;
  });

let sortedFiltered = [...filtered];

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

  return (
<div>
   <OtherButtonGrid/>
   <BannerPanels/>
   <CategoryGrid/>
   <section className={styles.popularCategory}>
    <Stack direction="row" spacing={2} sx={{marginLeft:1}}>
    <Button  disableElevation disableRipple
      onClick={(e) => {
        e.currentTarget.blur();
        setSelectedCategory(null);
        setOnSaleOnly(false);
      }}
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
    >clear all filter</Button>
    <Button  disableElevation disableRipple
      onClick={(e) => {
        e.currentTarget.blur(); 
        setSortMode("trending");
  
      }}
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
    >Trending</Button>
    <Button  disableElevation disableRipple
      onClick={(e) => {
        e.currentTarget.blur(); 
        setSortMode("bestSelling");

      }}
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
    >BestSelling</Button>
    <Button  disableElevation disableRipple
      onClick={(e) => {
        e.currentTarget.blur();  
        setOnSaleOnly(true)
        setStaffPickOnly(false);
      }}
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
    >
    On Sale</Button>
    <Button  disableElevation disableRipple
      onClick={(e) => {
        e.currentTarget.blur(); 
        setSortMode("latest"); 
      }}
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
    >Latest</Button>
    <Button  disableElevation disableRipple
      onClick={(e) => {
        e.currentTarget.blur(); 
        setStaffPickOnly(true);
        setOnSaleOnly(false);
      }}
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
    >StaffPicks</Button>
    </Stack>
   </section>
   <section className="catalogMainArea">
      <div className={`${styles.catalogMainAreaContainer}`}>
        <div className={`${styles.collapseArea}`}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{marginBottom:0,paddingBottom:0}}
            >
              <Typography component="span">Category</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{margin:0,padding:0}}>
              <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginTop:0, padding:0}}>
                  <nav aria-label="secondary mailbox folders">
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => setSelectedCategory("character")}>
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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: 300 }}>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={`${styles.catalogCardsArea}`}>
          <div className={`${styles.catalogCards}`}>
          <ProductCards products={sortedFiltered} filterMode={selectedCategory || category} />  
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








 