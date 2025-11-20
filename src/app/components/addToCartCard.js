import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function addToCartCard({ product }) {
  return (
    <Card sx={{ width: '100%',}} variant="outlined">
      <CardActions>
        <Button variant="contained" fullWidth
         onClick={() => {
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          let existing = cart.find(item => item.id === product.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        }}
        >${product.price}</Button>
      </CardActions>
    </Card>
  );
}
