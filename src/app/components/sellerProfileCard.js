import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';

export default function SellerProfileCard() {
  return (
    <Card sx={{ justifyContent:"center", alignItems:"center",width: '100%',  padding:1}} variant="outlined">
      <CardContent sx={{ display: 'flex', justifyContent:"center", alignItems:"center"}}>
        <Stack direction={"row"} sx={{justifyContent:"center",alignItems:"center"}}>
        <Avatar src="https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/1_msjwan.jpg" sx={{ height: 55, width: 55,}}/>
        {/*<CardMedia
        sx={{ height: 55, width: 55, borderRadius: 50, marginRight: 1 }}
        image="https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761633434/1_msjwan.jpg"
        title="green iguana"
         />*/}
        <Stack direction={"column"}>
        <Typography gutterBottom variant="h6" sx={{marginBottom:0}}>
          Seller Name
        </Typography>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        </Stack>
        </Stack>
      </CardContent>
      <Button variant='outlined' sx={{width: '100%'}}><SendIcon sx={{marginRight:1}}/>Contact</Button>
    </Card>
  );
}
