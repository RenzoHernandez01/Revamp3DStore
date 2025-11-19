import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';

export default function SellerProfileCard({id,name,rating,profileImage}) {
  return (
    <Card sx={{ justifyContent:"center", alignItems:"center",width: '100%',  padding:1}} variant="outlined">
      <CardContent sx={{ display: 'flex', justifyContent:"center", alignItems:"center"}}>
        <Stack direction={"row"} sx={{justifyContent:"center",alignItems:"center"}}>
        <Avatar src={profileImage} sx={{ height: 55, width: 55,}}/>
        <Stack direction={"column"} sx={{marginLeft:1}}>
        <Typography gutterBottom variant="h6" sx={{marginBottom:0}}>
          {name}
        </Typography>
        <Rating name="half-rating" defaultValue={rating} precision={0.5} />
        </Stack>
        </Stack>
      </CardContent>
      <Button variant='outlined' sx={{width: '100%'}}><SendIcon sx={{marginRight:1}}/>Contact</Button>
    </Card>
  );
}
