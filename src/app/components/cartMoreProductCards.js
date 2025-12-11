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

export default function CartMoreProductCards({ limitEnd }) {
  const { addToCart } = useCart();
  const router = useRouter();


 /* const { products, loading, error } = useProducts();
  if (loading) return <Typography>Loading products…</Typography>;
  if (error) return <Typography color="error">Failed to load products</Typography>;
  console.log("products type:", typeof products, Array.isArray(products), products);*/

 
  const sliced = products.slice(0, limitEnd) ;

  console.log("useProducts result:", products);

  return (
    sliced.map((product, index) => (
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
        onClick={() => router.push(`/productPage/${product.id}`)}
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
                "&:hover": { backgroundColor: "#424242ff" }
              }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              variant='contained'
            >
              Add To CART
            </Button>
          </Stack>
        </CardContent>
      </Card>
    ))
  );
}