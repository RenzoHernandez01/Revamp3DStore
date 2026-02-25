"use client";
import styles from "./category.module.css";
import CategoryGrid from "../../components/categoryGrid.js";
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
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams} from 'next/navigation';
import { useAuth } from "@/app/context/AuthContext";
import {ProductsContext} from "../../context/productContext";
import AuthorBannerPanels from "@/app/components/authorBannerPanel";
import { useSellers } from "@/app/context/authorContext";
import Toolbar from '@mui/material/Toolbar';
import { useNotFound } from "../../context/notFoundContext";


export default function CategoryPage() {
let router = useRouter();
const { itemNotFound,setItemNotFound } = useNotFound();
let searchParams = useSearchParams();
let [loading, setLoading] = useState(true);
let { name } = useParams(); 
let normalized = name?.toLowerCase(); 
let tag = searchParams.get('tag'); 
let priceFrom = Number(searchParams.get('price-from')) || 0;
let priceTo = Number(searchParams.get('price-to')) || 1000;
let [tempPriceTo, setTempPriceTo] = useState(priceTo);
let [hasInteracted, setHasInteracted] = useState(false);
let [selectedCategory, setSelectedCategory] = useState(null);
let sellers = useSellers()
let priceFilterActive = searchParams.has('price-to');
let sortMode = ['trending', 'bestSelling', 'latest'].includes(tag) ? tag : null;
let staffPickOnly = tag === 'staffPick';
let onSaleOnly = tag === 'onSale';
let [products, setProducts] = useState([]);
let sellerFilterActive = sellers.some(s => s.id.toLowerCase().trim() === name.toLowerCase().trim());
const currentSeller = sellers.find(  s => s.id?.toLowerCase().trim() === name?.toLowerCase().trim());
let marketPlace = normalized === "marketplace";
const filteredProducts = products.filter(p =>
  itemNotFound ? p.name.toLowerCase().includes(itemNotFound.toLowerCase()) : true
);
const isEmptySearch = itemNotFound && filteredProducts.length === 0;
let specialProduct = products.find (p => p.id === "5");
let handleSliderChange = (e, newValue) => {
  setTempPriceTo(newValue);
  setHasInteracted(true);
  setItemNotFound(null);


  router.push(`/categoryPages/marketplace?${params.toString()}`);

};

let handleTextChange = (e) => {
  const newValue = Number(e.target.value);
  if (!isNaN(newValue)) {
    setTempPriceTo(newValue);
    setHasInteracted(true);
  }
};

useEffect(() => {
  //console.log('Fetching products...');
  setLoading(true);
  const timer = setTimeout(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        //console.log("Fetched data:", data);
        setProducts(Array.isArray(data) ? data : data.products);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 500); 

  return () => clearTimeout(timer);
}, []);


  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(
        `/categoryPages/${name}?tag=${tag || ''}&price-to=${tempPriceTo}`,
        undefined,
        { scroll: false }
      );
    }, 300);

    return () => clearTimeout(timeout);
  }, [tempPriceTo, hasInteracted]);

let filtered = products.filter(product => {
let matchesCategory =
    sellerFilterActive ? true :
    normalized === "marketplace" || normalized === "all"
      ? true
      : product.category.toLowerCase() === normalized;
  let matchesOnSale = onSaleOnly ? !!product.onSale : true;
  let matchesStaffPick = staffPickOnly ? !!product.staffPick : true;
  let matchesPrice = product.price >= priceFrom && product.price <= priceTo;
  let matchesSeller = !sellerFilterActive? true : product.sellerId?.toLowerCase().trim() === name?.toLowerCase().trim();
  return matchesCategory && matchesOnSale && matchesStaffPick && matchesPrice && matchesSeller;
});

let sortedFiltered = [...filtered];
//console.log(sortedFiltered.length);
if (sortMode === "bestSelling") {
  sortedFiltered.sort((a, b) => {
    let totalA = Object.values(a.ratingsBreakdown || {}).reduce((sum, count) => sum + count, 0);
    let totalB = Object.values(b.ratingsBreakdown || {}).reduce((sum, count) => sum + count, 0);
    return totalB - totalA;
  });
}

if(sortMode === "trending") {
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
    let dateA = new Date(a.releaseDate);
    let dateB = new Date(b.releaseDate);
    return dateB - dateA;
  });
}
let category = name?.charAt(0).toUpperCase() + name?.slice(1);
let isFiltered = tag !== null || priceFilterActive;


 return (
<div> 
  <ProductsContext.Provider value={products}>
   <OtherButtonGrid/>
  </ProductsContext.Provider>
  <Toolbar />

  <CategoryGrid/>
   {sellerFilterActive ? (
    <AuthorBannerPanels seller={currentSeller} />
  ) : (
    <BannerPanels product={specialProduct}/>
  )}

   
   <section className={styles.popularCategory}>
    <Stack direction="row" spacing={2} sx={{marginLeft:1}}>
    {isFiltered && (<Button  disableElevation disableRipple
  onClick={() => {
    let newParams = new URLSearchParams(searchParams);
    newParams.delete('price-to');
    newParams.delete('tag');
    router.push(`/categoryPages/${name}?${newParams.toString()}`, undefined, { scroll: false });
    setTempPriceTo(1000);
    setHasInteracted(false);
    setSelectedCategory(null);
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
        { (marketPlace || sellerFilterActive) && (<Accordion  sx={{backgroundColor:"transparent",boxShadow:0}}>
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
          </Accordion>)}
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
                <TextField  type= "number" size= "small"   value={String(tempPriceTo)}  
                  onChange={handleTextChange}

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
                <Slider value={tempPriceTo}  onChange={handleSliderChange} min={200} max={1000} step={1}/>

              </Box>
            </AccordionDetails>
          </Accordion>
        </div>  
        <div className={`${styles.catalogCardsArea}`}>
        <div className={`${styles.catalogCards}`}>
      {isEmptySearch ? (
  <Stack
    sx={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      gap: 2,
      height: 400,
    }}
  >
      <Typography variant="h5" sx={{ color:"black" }}>
      No results found for "{itemNotFound}"
    </Typography>

    <Typography sx={{ color: "black" }}>
      Try searching again or explore our top picks.
    </Typography>
    <Button
      variant="outlined"
      disableElevation
      sx={{
        borderColor: "black",
        borderWidth: 1.5,
        color: "black",
        width: 180,
        height: 40,
        whiteSpace: "nowrap",
        textTransform: "none",
        "&:hover": { backgroundColor: "#313131ff", color: "white" },
      }}
      onClick={() =>{
        setItemNotFound(null);
        router.push("/categoryPages/marketplace?tag=staffPick")
      }}
    >
      View All Staff Picks
    </Button>
  </Stack>
) : (
   <ProductCards
            products={sortedFiltered}
            filterMode={sellerFilterActive ? "seller" : normalized === "marketplace" ? selectedCategory : category}
            sellerName={sellerFilterActive ? normalized : null}
            categoryFilter={selectedCategory} 
            loading={loading}
          />
)}
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





 