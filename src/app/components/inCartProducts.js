import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function InCartProducts({product}) {
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
            <Button variant='text' size="small" sx={{width:.1,height:.3,marginLeft:"auto",marginBottom:.5}}>
              <CloseIcon sx={{color:"gray", fontSize: 20}}/>
            </Button>
            <Typography variant='h6' sx={{marginBottom:1, fontWeight:"bold"}}>${product.price}</Typography>
          </Stack>
        </Stack>     
     </CardContent>
    </Card>
    </div>
  );
}
