"use client";
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';



export default function EmptyCart() {
  return (
    <Stack sx={{display:"flex",width:"100%", height:"57.5%",alignItems:"center",margin:0,justifyContent:"center"}}>
        <ShoppingCartOutlinedIcon sx={{color:"black", fontSize: 100, marginBottom:2, }}/>
        <Typography variant='h6' sx={{color:"black"}}>Your cart is empty!</Typography>
        
    </Stack>
  );
}