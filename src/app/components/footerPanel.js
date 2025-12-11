import Image from "next/image";
import styles from './footerPanel.module.css'; 
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
export default function FooterPanel() {
  return (
<div>
    <section className={`${styles.aboutSection}`}>
      <Stack sx={{width:"100%",height: 209,backgroundColor:"#7DA0CA",display:"flex", justifyContent:"flex-start",alignItems:"center", flexDirection:"row", gap:5, padding:2}}>
         <List sx={{ color: "white" }}>
            <ListItem disablePadding>
                <Typography variant="h6" sx={{ textTransform: "none" }}>
                Company
                </Typography>
            </ListItem>
            <ListItem disablePadding>
                <Button
                disableRipple
                variant="text"
                sx={{ width: 30, height: 30, color: "white",textTransform:"none" }}
                >
                Contact
                </Button>
            </ListItem>
        </List>
       <List
            sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems:"flex-start",
                justifyContent:"flex-start"

            }}
        >
  <Typography variant="h6" sx={{ textTransform: "none" }}>
    Community
  </Typography>
  <Button disableRipple variant="text" sx={{ color: "white", textTransform: "none" }}>
    Youtube
  </Button>
  <Button disableRipple variant="text" sx={{ color: "white", textTransform: "none" }}>
    Instagram
  </Button>
  <Button disableRipple variant="text" sx={{ color: "white", textTransform: "none" }}>
    X
  </Button>
  <Button disableRipple variant="text" sx={{ color: "white", textTransform: "none" }}>
    Facebook
  </Button>
       </List>
       <List
            sx={{
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems:"flex-start",
                justifyContent:"flex-start"

            }}
        >
  <Typography variant="h6" sx={{ textTransform: "none" }}>
    Legal
  </Typography>
  <Button disableRipple variant="text" sx={{ color: "white", textTransform: "none" }}>
    Youtube
  </Button>
  <Button disableRipple variant="text" sx={{ color: "white", textTransform: "none" }}>
    Instagram
  </Button>
  
       </List>
      </Stack>
    </section>
</div>
  );
}


   {/*<div className={`${styles.aboutDiv}`}>
            <ul className={`${styles.listClass}`}>
                <li>Company</li>
                <li>Help Center</li>
            </ul>
            <ul className={`${styles.listClass}`}>
                <li>Community</li>
                <li><Link href = "https://www.youtube.com/" target=" ">Youtube</Link></li>
                <li><Link href = "https://x.com/" target=" ">Twitter</Link></li>
                <li><Link href = "https://www.instagram.com/" target=" ">Instagram</Link></li>
                <li><Link href = "https://www.facebook.com/" target=" ">Facebook</Link></li>
            </ul>
            <ul className={`${styles.listClass}`}>
                <li>Legal</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
            </ul>
            <ul className={`${styles.listClass}`}>
                <li>Selling</li>
                <li>Open a Store</li>
                <li>Affiliats</li>
            </ul>
        </div>*/}