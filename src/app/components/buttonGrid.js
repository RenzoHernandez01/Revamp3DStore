import styles from './buttonMain.module.css'; 
import Link from 'next/link';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from 'react';
import * as React from 'react';
import CartOverLay from './cartOverlay.js';
import { useRouter } from 'next/navigation';
import style from "../components/cartOverlay.module.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { withTheme } from '@emotion/react';

export default function ButtonGrid() {
    let  router = useRouter();
    let [showCart, setShowCart] = React.useState(false);
    let handleOpenCart = () => setShowCart(true);
    let handleCloseCart = () => setShowCart(false);
  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);

     const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
      
  return (
     <AppBar position='fixed' sx={{backgroundColor: trigger?"white":"transparent",zIndex:99999}}  elevation={trigger ? 6 : 0}>
     <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
    <div className={`${styles.buttonGrid}`}>
      <button className={`${styles.logoHome}`}>  <Button variant="text" onClick={() => router.push('/')}>
              HOME LOGO
            </Button></button>
      
      <button className={styles.cartBtnHomeMain}    onClick={() => {
        handleOpenCart();
      }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30,color:trigger?"black":"white"}}/>
      </button>
     

      {showCart && ( <><div className= {style.cartBackdrop} onClick={handleCloseCart} />
        <CartOverLay onClose={handleCloseCart} /> 
      </>
      )}

     <Button variant='text' sx={{color:trigger?"black":"white"}}
      onClick={() => router.push('/authPage/signin')}
      >
        Sign In
      </Button>
   
          <Button variant='outlined' sx={{color:trigger?"black":"white",borderStyle:"solid", borderWidth:2,borderColor: trigger ? "black" : "white",}}
            onClick={() => router.push('/authPage/signup')}
            >
            Sign Up
          </Button>

      <Link href="/" className={`${styles.logOutBtnHome} ${styles.logOutBtn}`} style={{ display: 'none' }}>
        Log Out
      </Link>

    </div>
    </Toolbar>
    </AppBar>
  );
}