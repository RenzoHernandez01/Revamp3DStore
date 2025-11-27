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
export default function CartMoreProductCards({limitEnd}) {
  let router = useRouter();
  let products = useProducts();
  let sliced = products.slice(0, limitEnd) 
  return (
     sliced.map((product, index) => {
      return(
  <Card  key={index} sx={{ width: 200, height:250,    '&:hover': {
                            boxShadow: 4,
                            transform: 'scale(1.01)',
                            transition: 'all 0.2s ease-in-out',
                        }}}  onClick={() => router.push(`/productPage/${product.id}`)    }>
          <CardMedia
            height={125}
            component="img"
            image={product.images[0]}
          />
          <CardContent sx={{ height:"100%", width:"100%", padding:.1,}}>
              <Stack sx={{alignItems:"center",justifyContent:"flex-start", height:"100%", width:"100%",padding:1,gap:1}}>
                  <Stack sx={{width:"100%",}}>
                      <Typography variant="body.2" >{product.name}</Typography>
                  </Stack>
                  <Stack sx={{width:"100%",flexDirection:"row"}}>
                      <Typography variant="body.2" >5</Typography>
                      <StarIcon/>
                      <Typography variant="body.2" >(23)</Typography>
                      {/*<Typography variant="body.2" sx={{marginLeft:"auto"}} >${product.price}</Typography>*/}
                      <CheckForSaleCart product={product}/>
                  </Stack>
                  <Button      onClick={(e) => {
                    e.stopPropagation(); 
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          let existing = cart.find(item => item.id === product.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        }} variant='contained' sx={{width:"100%"} }>Add To CART</Button>
              </Stack>
          </CardContent>
      </Card>)
  })
    
  );
}
