import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function checkForSale(product){

  if (product.onSale) {
    product.salePrice = Math.round(product.price * (1 - product.salePercentage / 100));
    return (
      <Stack direction="row" spacing={1}  sx={{alignItems:"center"}}>
        <Typography variant="body.2" sx={{ textDecoration: "line-through", color: "gray" }}>
          ${product.price}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "red",  }}>
          ${product.salePrice}
        </Typography>
      </Stack>
    );
  }
  else{
    return(
      <Typography variant='h6' sx={{marginBottom:1, fontWeight:"bold"}}>${product.price}</Typography>
    )
  }
}

export default function InCartProducts({product,onRemove}) {
  return (
    <div>
    <Card sx={{height:115, width:"100%",borderRadius:0,backgroundColor:  "rgba(238, 241, 244, 1)" }}>   
     <CardContent sx={{display:'flex',height:"100%", width:"100%",padding:0,}}> 
        <Stack direction="row" sx={{justifyContent:"center", flex:1,alignItems:"center" ,height:115,padding:.5}}>
          <CardMedia component="img"
            image = {product.images[0]}
            sx={{ 
            width:120,
            height:"80%",
            objectFit: 'cover',       
            overflow: 'hidden', 
            borderRadius:2,
            }}/>
            <Typography variant='h6' className="libraryProductName" sx={{marginLeft:3,fontWeight:"bold"}}>
              {product.name}</Typography>
          <Stack sx={{marginLeft:"auto",height:"100%",width:100}} direction="column">
            <Button 
            onClick={() => onRemove(product.id)}
            variant='text' size="small" sx={{width:.1,height:.3,marginLeft:"auto",marginBottom:.5}}>
              <CloseIcon sx={{color:"gray", fontSize: 20}}/>
            </Button>
              <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: 6 }}>
                {checkForSale(product)}
              </Box>
            </Stack>
        </Stack>     
     </CardContent>
    </Card>
    </div>
  );
}
