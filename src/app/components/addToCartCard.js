import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function addToCartCard({ id, price }) {
  return (
    <Card sx={{ width: '100%',}} variant="outlined">
      <CardActions>
        <Button variant="contained" fullWidth>${price}</Button>
      </CardActions>
    </Card>
  );
}
