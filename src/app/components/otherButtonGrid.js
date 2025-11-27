"use client";
import * as React from 'react';
import styles from './button.module.css'; 
import CartOverLay from './cartOverlay.js';
import style from "../components/cartOverlay.module.css";
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/navigation';
import SearchBarComponent from './searchBarComponent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';


export default function ResponsiveAppBar({products}) {
  const router = useRouter();
  const [showCart, setShowCart] = React.useState(false);
  const handleOpenCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);

   const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });


  return (
    <AppBar position='fixed' sx={{backgroundColor:"white"}}  elevation={trigger ? 6 : 0}>
       <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>

    <div className={styles.buttonGrid}>
          <div className={styles.leftGroup}>
            <button className={styles.logoHome}>LOGO</button>
            <SearchBarComponent/>
          </div>

          <div className={styles.rightGroup}>
            <button
              className={styles.cartBtnHomeMain}
              onClick={handleOpenCart}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: "black" }} />
            </button>

            {showCart && (
              <>
                <div className={style.cartBackdrop} onClick={handleCloseCart} />
                <CartOverLay onClose={handleCloseCart} />
              </>
            )}

            <Button variant="text" onClick={() => router.push('/authPage/signin')}>
              Sign In
            </Button>

            <div className={styles.signUpWrapperHome}>
              <Button variant="text" onClick={() => router.push('/authPage/signup')}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        </Toolbar>
    </AppBar>
    
  );
}