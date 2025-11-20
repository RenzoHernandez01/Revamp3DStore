"use client";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from "../components/cartOverlay.module.css";
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import InCartProducts from './inCartProducts';
import CartMoreProductCards from './cartMoreProductCards';


export default function CartOverlay({ onClose }) {
  const [mounted, setMounted] = useState(false);
  const [overlayRoot, setOverlayRoot] = useState(null);
  let [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setMounted(true);
    let sortedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(sortedCart);
    setOverlayRoot(document.getElementById('overlay-root'));
  }, []);
  if (!mounted || !overlayRoot) return null;
  console.log(cartItems);
  return createPortal(
    <div className={`${style.cartContainer}`}>
      <Stack sx={{width:"100%", height:50,}}>
        <Button variant='text' sx={{width:20,height:"100%",marginLeft:"auto"}}>
          <CloseIcon sx={{color:"gray", fontSize: 40 }}/>
        </Button>
      </Stack>
      <div className={`${style.productSlot}`}>
        {cartItems.map((item) => (
          <InCartProducts product = {item}/>
        ))}
      </div>
      <div className={`${style.totalAmmountArea}`}>
        <Typography variant='h5'color="black">Total (1 Items)</Typography>
        <Stack sx={{flexDirection:"column",height:"auto", width:250,marginLeft:"auto",justifyContent:'flex-start'}}>
          <Stack sx={{flexDirection:"column",height:60, width:"100%",marginLeft:"auto",marginBottom:2,}}>
            <Stack sx={{flexDirection:"row",height:"auto", width:"100%",marginLeft:"auto",marginBottom:1}}>
              <Typography variant='body.2'color="black" sx={{marginLeft:10,marginRight:1}}>Subtotal</Typography>
              <Typography variant='body.2'color="black" sx={{marginLeft:"auto",marginRight:1}}>$200</Typography>
            </Stack>
            <Stack sx={{flexDirection:"row",height:"auto", width:"100%",marginLeft:"auto",}}>
              <Typography variant='body.2'color="black" sx={{marginLeft:"auto",marginRight:1}}>Sale Discount</Typography>
              <Typography variant='body.2'color="black" sx={{marginLeft:"auto",marginRight:1, color:"red"}}>$200</Typography>
            </Stack>
          </Stack>
          <Typography variant='h4'color="black" sx={{marginLeft:"auto",marginRight:1}}>$200</Typography>
        </Stack>
      </div>
      <div className={`${style.checkOutArea}`}>
        <div >
           <fieldset className = {`${style.fieldStyle}`}>
          <legend>Add discount code</legend>
          <Button variant='contained' sx={{width:"100%", height:50,}}>Checkout</Button>
        </fieldset>
        </div>
        <div className={`${style.checkOutButtonWrapper}`}>
           <fieldset className = {`${style.fieldStyle}`}>
          <legend>Continue to checkout</legend>
          <Button variant='contained' sx={{width:"100%", height:50,}}>Checkout</Button>
        </fieldset>
        </div>
      </div>
      <div className={`${style.moreProductsArea}`}>
         <Typography variant='h5'color="black">Products you may like</Typography>
         <div className={`${style.moreCartProductsWrapper}`}>
            <CartMoreProductCards/>
            <CartMoreProductCards/>
            <CartMoreProductCards/>
            <CartMoreProductCards/>
            <CartMoreProductCards/>
         </div>
      </div>
    </div>,
    overlayRoot
  );
}