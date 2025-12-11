import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import SendIcon from '@mui/icons-material/Send';
import { useNotFound } from '../context/notFoundContext';
import { useRouter} from 'next/navigation';
export default function SellerProfileCard({id,name,rating,profileImage}) {
  let router = useRouter();
  const { setItemNotFound } = useNotFound();
  return (
    <Card sx={{ justifyContent:"center", alignItems:"center",width: '100%',  padding:1}} variant="outlined">
      <CardContent sx={{ display: 'flex', justifyContent:"center", alignItems:"center"}}>
        <Stack direction={"row"} sx={{justifyContent:"center",alignItems:"center"}}>
        <Avatar 
        component="button"
          onClick={() =>{ setItemNotFound(null); router.push(`/categoryPages/${id}`);}}
         sx={{
            width: 64,
            height: 64,
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",      
            padding: 0,           
            outline: "none",      
            "&:focus": { outline: "none" }
          }}
          src={profileImage}>
        </Avatar>
        <Stack direction={"column"} sx={{marginLeft:1, justifyContent:"center"}}>
        <Button
        onClick={() =>{ setItemNotFound(null); router.push(`/categoryPages/${id}`);}}
        disableRipple
        disableElevation
        variant='text'
        sx={{color:"black", fontSize:20, cursor:"pointer", backgroundColor:"none",textTransform:"none", 
          "&:hover":{backgroundColor:"transparent"}}}
        >
          {name}
         </Button>
        <Rating name="half-rating" defaultValue={rating} precision={0.5}  readOnly/>
        </Stack>
        </Stack>
      </CardContent>
      <Button variant='outlined' sx={{width: '100%', borderColor: "black", color:"black"}} href='https://www.linkedin.com/in/renzo-hernandez-b3568a20a/' target='_blank'><SendIcon  sx={{marginRight:1,color:'black'}}/>Contact</Button>
    </Card>
  );
}
