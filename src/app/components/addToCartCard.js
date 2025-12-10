import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useCart } from '../context/cartContext';
import IconButton from '@mui/material/IconButton';
import { useWishList } from "../context/wishListContext";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
export default function addToCartCard({ product}) {
  const { addToCart} = useCart();
  const {addToWishList, removeFromWishList,wishListItems} = useWishList();
  const favorited = wishListItems.some(item => item.id === product.id);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  return (
    <Card sx={{ display:"flex", width: '100%', height:70}} variant="outlined">
      <CardActions sx={{width: '100%'}}>
        <Button variant="contained"   disableElevation disableRipple
        sx={{backgroundColor: "#313131ff", color:"white", flex:1 , "&:hover": {backgroundColor: "#4a4a4aff"}}}
         onClick={() => {
          addToCart(product)  
        }}
        >${product.price}</Button>
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
    </Card>
  );
}
