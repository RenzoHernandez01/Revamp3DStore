import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function CheckForSale({product}){

  if (product.onSale) {
    product.salePrice = Math.round(product.price * (1 - product.salePercentage / 100));
    return (
      <Stack direction="row" spacing={1}  sx={{alignItems:"center", marginLeft:"auto"}}>
        <Typography variant="body.2" sx={{ textDecoration: "line-through", color: "gray" }}>
          ${product.price}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "red",  }}>
          ${product.salePrice}
        </Typography>
      </Stack>
    );
  }
  else{
    return(
      <Typography variant='h5' sx={{marginBottom:1, fontWeight:"bold", marginLeft:"auto"}}>${product.price}</Typography>
    )
  }
}