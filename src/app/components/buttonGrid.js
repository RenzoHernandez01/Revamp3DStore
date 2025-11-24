import styles from './buttonMain.module.css'; 
import Link from 'next/link';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from 'react';
import * as React from 'react';
import CartOverLay from './cartOverlay.js';
import { useRouter } from 'next/navigation';
import style from "../components/cartOverlay.module.css";

export default function ButtonGrid() {
    let  router = useRouter();
    let [showCart, setShowCart] = React.useState(false);
    let handleOpenCart = () => setShowCart(true);
    let handleCloseCart = () => setShowCart(false);
  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);
      
  return (
    <div className={`${styles.buttonGrid}`}>
      <button className={`${styles.logoHome}`}>LOGO</button>
      
      <button className={styles.cartBtnHomeMain}    onClick={() => {
        handleOpenCart();
      }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30,color:"white" }}/>
      </button>
     

      {showCart && ( <><div className= {style.cartBackdrop} onClick={handleCloseCart} />
        <CartOverLay onClose={handleCloseCart} /> 
      </>
      )}

     <Button variant='text'
      onClick={() => router.push('/authPage/signin')}
      >
        Sign In
      </Button>
      <div className={`${styles.signUpWrapperHome}`}>
          <Button variant='text'
            onClick={() => router.push('/authPage/signup')}
            >
            Sign Up
          </Button>
      </div>
      <Link href="/" className={`${styles.logOutBtnHome} ${styles.logOutBtn}`} style={{ display: 'none' }}>
        Log Out
      </Link>

    </div>
  );
}