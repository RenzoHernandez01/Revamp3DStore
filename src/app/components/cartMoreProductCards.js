import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Stack from '@mui/material/Stack';

export default function CartMoreProductCards() {
  return (
    <Card sx={{ width: 200, height:250,}}>
      
        <CardMedia
          height={125}
          component="img"
          image="https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/1_msjwan.jpg"
        />
        <CardContent sx={{ height:"100%", width:"100%", padding:.1,}}>
            <Stack sx={{alignItems:"center",justifyContent:"flex-start", height:"100%", width:"100%",padding:1,gap:1}}>
                <Stack sx={{width:"100%",}}>
                    <Typography variant="body.2" >Product Name</Typography>
                </Stack>
                <Stack sx={{width:"100%",flexDirection:"row"}}>
                    <Typography variant="body.2" >5</Typography>
                    <StarIcon/>
                    <Typography variant="body.2" >(23)</Typography>
                    <Typography variant="body.2" sx={{marginLeft:"auto"}} >$35.00</Typography>
                </Stack>
                <Button variant='contained' sx={{width:"100%"}}>Add To CART</Button>
            </Stack>
        </CardContent>
    </Card>
  );
}
