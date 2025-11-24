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
import EmptyCart from './emptyCart';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "next/navigation";
function getTotalDiscount(cartItems) {
  let totalDiscount = 0;
  cartItems.forEach(product => {
    if (product.onSale) {
      let discount = Math.round(product.price * (product.salePercentage / 100));
      totalDiscount += discount;
    }
  });
  return totalDiscount;
}



export default function CartOverlay({ onClose }) {
   const router = useRouter();
  let [mounted, setMounted] = useState(false);
  let [overlayRoot, setOverlayRoot] = useState(null);
  let [cartItems, setCartItems] = useState([]);
  let { isSignedIn, user, signOut } = useAuth();
  let subtotalPrice = 0;
  let totalDiscount = getTotalDiscount(cartItems);
  useEffect(() => {
    setMounted(true);
    let sortedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(sortedCart);
    setOverlayRoot(document.getElementById('overlay-root'));
  }, []);
  if (!mounted || !overlayRoot) return null;
  let handleRemoveFromCart = (id) => {  
  let updatedCart = cartItems.filter((item) => item.id !== id);
  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  cartItems.forEach(productInCart =>{
    subtotalPrice = productInCart.price + subtotalPrice;
  })

  return createPortal(
    <div className={`${style.cartContainer}`}>
      <Stack sx={{width:"100%", height:50,}}>
        <Button variant='text' sx={{width:20,height:"100%",marginLeft:"auto"}}>
          <CloseIcon sx={{color:"gray", fontSize: 40 }}/>
        </Button>
      </Stack>
      {cartItems.length === 0 ? (<EmptyCart/>)  :
      (<>
      <div className={`${style.productSlot}`}>
        {cartItems.map((item) => (
          <InCartProducts   key={item.id}   product = {item}  onRemove={handleRemoveFromCart}/>
        ))}
      </div>
      <div className={`${style.totalAmmountArea}`}>
        <Typography variant='h5'color="black">Total ({cartItems.length} items) </Typography>
        <Stack sx={{flexDirection:"column",height:"auto", width:250,marginLeft:"auto",justifyContent:'flex-start'}}>
          <Stack sx={{flexDirection:"column",height:60, width:"100%",marginLeft:"auto",marginBottom:2,}}>
            <Stack sx={{flexDirection:"row",height:"auto", width:"100%",marginLeft:"auto",marginBottom:1}}>
              <Typography color="black" sx={{marginLeft:10,marginRight:1}}>Subtotal</Typography>
              <Typography color="black" sx={{marginLeft:"auto",marginRight:1}}>${subtotalPrice}</Typography>
            </Stack>
            <Stack sx={{flexDirection:"row",height:"auto", width:"100%",marginLeft:"auto",}}>
              <Typography color="black" sx={{marginLeft:"auto",marginRight:1}}>Sale Discount</Typography>
              <Typography  sx={{ marginLeft: "auto", marginRight: 1, color: "red" }}>
               -${totalDiscount}
              </Typography>

            </Stack>
          </Stack>
          <Typography variant='h4'color="black" sx={{marginLeft:"auto",marginRight:1}}>${subtotalPrice-totalDiscount}</Typography>
        </Stack>
      </div>
      <div className={`${style.checkOutArea}`}>
        <div >
           <fieldset className = {`${style.fieldStyle}`}>
          <legend>Add discount code</legend>
          <Button
       
          variant='contained' sx={{width:"100%", height:50,}}>
            Checkout</Button>
        </fieldset>
        </div>
        <div className={`${style.checkOutButtonWrapper}`}>
           <fieldset className = {`${style.fieldStyle}`}>
          <legend>Continue to checkout</legend>
          <Button 
              onClick={() => {
              console.log("Checkout button clicked, isSignedIn:", isSignedIn);
              if (isSignedIn) {
                router.push("/checkOut");
              } else {
                router.push("/authPage/signin");
              }
            }}
          
          variant='contained' sx={{width:"100%", height:50,}}>Checkout</Button>
        </fieldset>
        </div>
      </div>
      </>   )}
       <div className={`${style.moreProductsArea}`}>
         <Typography variant='h5'color="black">Products you may like</Typography>
         <div className={`${style.moreCartProductsWrapper}`}>
            <CartMoreProductCards />
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