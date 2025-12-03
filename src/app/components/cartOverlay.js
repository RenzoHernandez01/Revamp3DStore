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
import { useCart } from '../context/cartContext';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

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
  const { cartItems, removeFromCart } = useCart();
  let { isSignedIn, user, signOut } = useAuth();
  let subtotalPrice = 0;
  let totalDiscount = getTotalDiscount(cartItems);
  useEffect(() => {
    setMounted(true);
    setOverlayRoot(document.getElementById('overlay-root'));
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

  };


  }, []);

  if (!mounted || !overlayRoot) return null;

  cartItems.forEach(productInCart =>{
    subtotalPrice = productInCart.price + subtotalPrice;
  })

  return createPortal(
    <div className={`${style.cartContainer}`}>
      <Stack sx={{width:"100%", height:50,}}>
        <Button variant='text' onClick={onClose}   sx={{width:20,height:"100%",marginLeft:"auto" , "&:hover":{backgroundColor:"transparent"}}} disableElevation disableRipple>
          <CloseIcon sx={{color:"gray", fontSize: 40 }}/>
        </Button>
      </Stack>
      {cartItems.length === 0 ? (<EmptyCart/>)  :
      (<>
      <div className={`${style.productSlot}`}>
        {cartItems.map((item) => (
          <InCartProducts   key={item.id}   product = {item} />
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

    { isSignedIn ? 
    <Stack >
        <div className={`${style.checkOutArea}`}>
            <div >
            <fieldset className = {`${style.fieldStyle}`}>
              <legend>Add discount code</legend>  
              <Stack sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"row", gap:2,
                "& .MuiOutlinedInput-root": {
                  height: "100%", 
                  "& fieldset": { border: "1px solid black" },
                  "& legend": { display: "none" },
                },
              }}>
                <InputBase
                sx={{
                  width: 230,
                  height: 50,                
                  border: "1px solid black", 
                  borderRadius: 1,
                  px: 1.5,                   
                }}
              />

                <Button
                disableElevation disableRipple
                variant ='contained'  sx={{flexGrow:1, height:50, backgroundColor: "#313131ff", color:"white",
                  "&:hover":{backgroundColor:"#424242ff"}
                }}>
                  Checkout</Button>
               </Stack>
          </fieldset>
          </div>
            <fieldset className = {`${style.fieldStyle}`} style={{ marginLeft:"auto" }}>
            <legend>Continue to checkout</legend>
            <Button  
                disableElevation disableRipple
                onClick={() => {
                console.log("Checkout button clicked, isSignedIn:", isSignedIn);
                if (isSignedIn) {
                  router.push("/checkOut");
                } else {
                  router.push("/authPage/signin");
                }
              }}
            variant='contained'  sx={{width:"100%", height:50, backgroundColor: "#313131ff", color:"white",
              "&:hover":{backgroundColor:"#424242ff"}
            }}>Checkout</Button>
          </fieldset>
        </div>
      </Stack>
 
      :
         <Stack>
        <div className={`${style.checkOutArea}`}>
          <Stack direction={"row"} sx={{gap:5}}>
              <Button variant='contained' disableElevation disableRipple
              sx ={{backgroundColor: "#313131ff", color:"white", width:200, height:40,
              "&:hover":{backgroundColor:"#424242ff"}}}
              onClick={() => {router.push("/authPage/signin");}} >
                Sign In
              </Button>
              <Button variant='contained' disableElevation disableRipple
              sx ={{backgroundColor: "#313131ff", color:"white", width:200, height:40,
              "&:hover":{backgroundColor:"#424242ff"}}}
              onClick={() => {router.push("/authPage/signup");}} >
                Sign Up 
              </Button>
          </Stack>
      
        </div>
      </Stack>}
      
   
      </>   )}
       <div className={`${style.moreProductsArea}`}>
         <Typography variant='h5'color="black">Products you may like</Typography>
         <div className={`${style.moreCartProductsWrapper}`}>
            <CartMoreProductCards limitEnd={4}/>

         </div>
      </div>
    
    </div>,
    overlayRoot
  );
}