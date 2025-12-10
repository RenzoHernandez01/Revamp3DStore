
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useRouter, } from 'next/navigation';
import { useCart } from '../context/cartContext';

export default function BannerPanels({product}) {
  const router = useRouter();
  const { addToCart} = useCart();


  return (
    <Stack sx={{display:"flex", width:"100%", height:283, justifyContent:"flex-start", alignItems:"flex-start", flexDirection:"column",
      position:"relative",
      overflow: "hidden", 
      backgroundColor:"black", zIndex:0,
      "&::before":{
      content:'""',
      position:"absolute",
      width:"100%",
      height:"100%",
      backgroundImage: "url('https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761809067/pistolRenders_tyvetw.jpg')",
      backgroundRepeat:"no-repeat",
      backgroundSize:"60%",
      backgroundPositionX: 750,
      backgroundPositionY:-105,
      zIndex: 0,
      },
      "& > *": {
      position: "relative",
      zIndex: 1,
    },
    }}>
      <Stack sx={{marginLeft:20, marginTop:2, width:400}}>
        <Typography
          variant="h6"
          sx={{
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "90px",
              height: "3px",
              backgroundColor: "#8ff076ff",
              borderRadius: "4px", 
            },
          }}
        >
          Exclusive
        </Typography>
        <Typography variant="caption text"sx={{color:"white", fontSize:11,marginTop:1}} >
            3D asset's only available on websiteName.
        </Typography>
        <Typography variant="h3"sx={{color:"white",marginTop:1,}} >
            Agency Pistol 
        </Typography>
        <Typography variant="body1"sx={{color:"white",marginTop:1,whiteSpace:"normal",wordBreak:"break-word"}} >
            Unlock this awesome asset for 3d printing or for your next big game project 
        </Typography>
        <Stack direction={"row"} sx={{gap:2, marginTop:2,zIndex:0}}>
          <Button variant="contained" disableElevation  disableRipple
          onClick={() => { 
            addToCart(product) 
          }}
          sx={{ backgroundColor:"#8ff076ff", width: 150 ,height: 40, whiteSpace:"nowrap",  textTransform: "none", color:"black", fontSize:20, zIndex:0,
            "&:hover": {backgroundColor: "#6bb058ff"}}}
          >
              Add to cart
          </Button>
          <Button disableRipple  variant="outlined"
          onClick={() => router.push(`/productPage/5`)}
              sx={{width:150,height:40 , borderColor:"white", color:"white", whiteSpace:"nowrap",
              "&:hover": {backgroundColor: "white", color:"black",}}}>View Product
          </Button>
        </Stack>
      </Stack>
    </Stack>
    
  );
}