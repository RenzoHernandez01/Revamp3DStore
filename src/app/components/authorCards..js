
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useSellers } from '../context/authorContext';
import { useRouter, useSearchParams} from 'next/navigation';
import { useNotFound } from '../context/notFoundContext';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';
export default function AuthorCards({ limitEnd, loading}) {
  let router = useRouter();
  let sellers = useSellers();
  let sliced = sellers.slice(0, limitEnd) ;
  const { setItemNotFound } = useNotFound();
   if (loading) {
    return Array.from({ length: limitEnd }).map((_, i) => (
      <Card key={i} sx={{ width: 250, height: 150, p: 2 ,position:"relative",}}>
      <CardContent sx={{position:"absolute", top: 0,  left: 0,
      width: "100%", height: "100%", display:"flex",justifyContent:"center", flexDirection:"column",
      alignItems:"center",backgroundColor:"transparent",zIndex:0}}>
        <Skeleton variant="circular" width={64} height={64} />
        <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    ));
  }

  return (

    
    sliced.map((seller, index) => {
      return(
   <Card  key={index} sx={{width:250, height:150, position:"relative", '&:hover': 
   { boxShadow: 4,  transform: 'scale(1.01)', transition: 'all 0.2s ease-in-out',},}}  
   onClick={() =>{ setItemNotFound(null); router.push(`/categoryPages/${seller.id}`);}} >
    <CardMedia
    sx={{ width: "100%", height: "100%", borderRadius:2 ,  filter: "blur(4px)"}} 
    image={seller.profileImage}/>  
    <CardContent sx={{position:"absolute", top: 0,  left: 0,
      width: "100%", height: "100%", display:"flex",justifyContent:"center", flexDirection:"column",
      alignItems:"center",backgroundColor:"transparent",zIndex:0}}>
       <Avatar sx={{ bgcolor: "#7DA0CA",width: 64, height: 64 }}  src={seller.profileImage}> 
       </Avatar>
       <Typography 
       variant="h5" 
       sx={{color:"white"}}>{seller.name}</Typography>
    </CardContent>
   </Card>)
   })
  );
}