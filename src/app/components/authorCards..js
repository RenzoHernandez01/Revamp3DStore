
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useSellers } from '../context/authorContext';
import { useRouter, useSearchParams} from 'next/navigation';

export default function AuthorCards({limitEnd}) {
  let router = useRouter();
  let sellers = useSellers();
  let sliced = sellers.slice(0, limitEnd) 
  return (
    sliced.map((seller, index) => {
      return(
   <Card  key={index} sx={{width:250, height:150, position:"relative", '&:hover': 
   { boxShadow: 4,  transform: 'scale(1.01)', transition: 'all 0.2s ease-in-out',},}}  
   onClick={() => router.push(`/categoryPages/${seller.id}`)} >
    <CardMedia
    sx={{ width: "100%", height: "100%", borderRadius:2 ,  filter: "blur(4px)"}} 
    image="https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761897485/madlogo_fy8js7.png"/>  

    <CardContent sx={{position:"absolute", top: 0,  left: 0,
      width: "100%", height: "100%", display:"flex",justifyContent:"center", flexDirection:"column",
      alignItems:"center",backgroundColor:"transparent",zIndex:0}}>
       <Avatar sx={{ bgcolor: "#7DA0CA",width: 64, height: 64 }}> {seller.name?.charAt(0).toUpperCase()}
</Avatar>
       <Typography variant="h5" sx={{color:"white"}}>{seller.name}</Typography>
    </CardContent>
   </Card>)
   })
  );
}