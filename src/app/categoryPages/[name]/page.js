import Image from "next/image";
import styles from "./category.module.css";
import CategoryGrid from "../../components/categoryGrid.js";
import Link from 'next/link';
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
export default function CategoryPage() {
  return (
<div>
   <OtherButtonGrid/>
   <BannerPanels/>
   <CategoryGrid/>
   <section className={styles.popularCategory}>
    <Stack direction="row" spacing={2} sx={{marginLeft:1}}>
      <Button>clear all filter</Button>
      <Button>Trending</Button>
      <Button>BestSelling</Button>
      <Button>On Sale</Button>
      <Button>Lates</Button>
      <Button>StaffPicks</Button>
    </Stack>
   </section>
   <section class="catalogMainArea">
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
                        <ListItemButton>
                          <ListItemText primary="Character" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Weapon" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Props" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Terrain"/>
                        </ListItemButton>
                      </ListItem>
                       <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Vehicles"/>
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
          <ProductCards/><ProductCards/><ProductCards/><ProductCards/><ProductCards/><ProductCards/><ProductCards/><ProductCards/>
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








 