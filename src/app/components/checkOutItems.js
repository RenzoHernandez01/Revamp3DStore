"use client";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
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
        <Typography variant="h6" color = "black">
            {product.price}
        </Typography>
    )
  }
}


export  default function CheckOutItems({product}){
  return (
<div>
       <Card  sx={{ width:"100%",backgroundColor:"#f1f1f1",marginTop:.1, borderRadius:0}}>
            <CardContent>
                 <Stack  direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
                    <CardMedia component="img"       
                        image = {product.images[0]}
                        sx={{ 
                        width:120,
                        height:"80%",
                        objectFit: 'cover',       
                        overflow: 'hidden', 
                        borderRadius:2, }}/>
                        <Typography variant="h6" color = "black">
                                    {product.name}
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}/>
                          {checkForSale(product)}
                </Stack>
            </CardContent>
       </Card>   
       
</div>
     

  );
}