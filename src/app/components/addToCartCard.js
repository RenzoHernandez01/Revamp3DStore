import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useCart } from '../context/cartContext';
import IconButton from '@mui/material/IconButton';
import { useWishList } from "../context/wishListContext";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useAuth} from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CartOverLay from './cartOverlay';
import style from "../components/cartOverlay.module.css";
import React from 'react';
export default function addToCartCard({ product}) {
  const { addToCart,cartItems,showCart,openCart,closeCart} = useCart();
  const {addToWishList, removeFromWishList,wishListItems} = useWishList();
  const inCart = cartItems.some(item => item.id === product.id);
  const {user} = useAuth();
  const inLibrary = user?.library?.some(item => item.id === product.id);
  const favorited = wishListItems.some(item => item.id === product.id);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  console.log(inLibrary);
  return (
    <Card sx={{ display:"flex", width: '100%', height:70}} variant="outlined">
      <CardActions sx={{width: '100%'}}>
        <Button variant="contained"   disableElevation disableRipple
        sx={{backgroundColor: "#313131ff", color:"white", flex:1 , textTransform:"none", "&:hover": {backgroundColor: "#4a4a4aff"}}}
        onClick={() => {
          if(inLibrary){
            router.push('/customerProfile');
          } 
           else if (inCart) {
              openCart()
            } else {
              addToCart(product); 
            }
          }}

        > { inLibrary ? "View in Library" : inCart ? "View Cart" : `$${product.price} - Add to Cart` }</Button>
      <IconButton  disableRipple  
            onClick={(e) => {
                e.stopPropagation(); 
                if (isSignedIn) {
                  if (favorited) {
                    removeFromWishList(product.id);
                  } else {
                    addToWishList(product);
                  }
                } else {
                  router.push('/authPage/signin');
                }
              }}
              className="wishlistIcon"
                    sx={{
                      width: 52,
                      height: 52,
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {favorited ? (
                      <FavoriteRoundedIcon sx={{ color: "#313131ff" }} />
                    ) : (
                      <>
                        <FavoriteBorderRoundedIcon  sx={{ color: "#313131ff" }} />
                      </>
                    )}
      </IconButton>
      </CardActions>
      {showCart && (
        <>
          <div className={style.cartBackdrop} onClick={closeCart} />
          <CartOverLay onClose={closeCart} />
        </>
      )}

    </Card>
  );
}
