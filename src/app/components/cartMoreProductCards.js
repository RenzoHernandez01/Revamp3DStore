import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { CheckForSaleCart } from '@/utils/checkForSaleCart';
import { useProducts } from "../context/productContext"; 
import { useCart } from '../context/cartContext';
import products from "../../../data/Products.json"
import { useAuth } from '../context/AuthContext';
export default function CartMoreProductCards({ limitEnd }) {
  const { addToCart, cartItems,closeCart } = useCart();

  const router = useRouter();
  const sliced = products.slice(0, limitEnd);
  const { user } = useAuth();

  return (
    sliced.map((product, index) => {

      const inLibrary = user?.library?.some(item => item.id === product.id);

      return (
        <Card
          key={index}
          sx={{
            width: 200,
            height: 250,
            '&:hover': {
              boxShadow: 4,
              transform: 'scale(1.01)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
          onClick={() => {
              closeCart();
              router.push(`/productPage/${product.id}`);
           
          }}
        >
          <CardMedia
            height={125}
            component="img"
            image={product.images[0]}
          />
          <CardContent sx={{ height: "100%", width: "100%", padding: .1 }}>
            <Stack sx={{ alignItems: "center", justifyContent: "flex-start", height: "100%", width: "100%", padding: 1, gap: 1 }}>
              <Stack sx={{ width: "100%" }}>
                <Typography variant="body2">{product.name}</Typography>
              </Stack>
              <Stack sx={{ width: "100%", flexDirection: "row" }}>
                <Typography variant="body2">5</Typography>
                <StarIcon />
                <Typography variant="body2">(23)</Typography>
                <CheckForSaleCart product={product} />
              </Stack>
              <Button
                disableElevation
                disableRipple
                sx={{
                  backgroundColor: "#313131ff",
                  color: "white",
                  width: "100%",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#424242ff" }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                     if (inLibrary) {
                      closeCart();
                     router.push('/customerProfile');}
                      else{
                          addToCart(product);
                      }
                     
                }}
                variant='contained'
              >
                {inLibrary ? "View in Library" : "Add To cart"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      );
    })
  );
}