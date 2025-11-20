import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './productCards.module.css'; 
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';



export default function ProductCards({ products = [], creators = null, filterMode = null, limitStart, limitEnd }) {
    let  router = useRouter();
    let filtered = products .filter(product => !filterMode || product.category.toLowerCase() === filterMode.toLowerCase());
    let sliced = limitEnd ? filtered.slice(limitStart,limitEnd) : filtered.slice(0,filtered.length);
    return (
    sliced.map((product,index) =>( 
    <Card  key={product.id}className = {styles.cardInfo} sx={{ maxWidth: 325, height: 435,margin:0,padding:2,borderRadius:3, '&:hover': {
    boxShadow: 4,
    transform: 'scale(1.01)',
    transition: 'all 0.2s ease-in-out',},}} 
     onClick={() => router.push(`/productPage/${product.id}`)}>

    <div className={styles.productCardWrapper}> 
        <div className = {styles.previewWrapper}>
            <Box sx={{display:'flex',width:90,height:30,backgroundColor:"pink",zIndex:2,position:"absolute"
                ,top: 0, right: 10, top:10, width: 60, borderRadius:1, height: 20, color:"white"
                ,alignItems:"center",justifyContent:"center"}}>
                50%</Box>
            <CardMedia
                sx={{ width: "100%", height: "100%"}}
                image={product.images[0]}
            />
        </div>     
        <CardContent sx={{ padding: 0,maxHeight:300}}>
            <Stack direction={"row"} sx={{display:'flex',}}>
                <VerifiedRoundedIcon sx={{marginRight:1,marginLeft:"auto"}}/>
                <WhatshotRoundedIcon/>
            </Stack>
            <Stack direction={"row"} sx={{display:'flex',minHeight:24,marginTop:1}} >
                <Typography  gutterBottom variant="subtitle2"  sx={{   fontWeight: "bold",
                    whiteSpace: "nowrap",       
                    textOverflow: "ellipsis",  
                    overflow:"hidden",   
                    maxWidth: "100%",}}>     
                    {product.name}
                </Typography>  
            </Stack>
            <Stack direction={"row"} sx={{display:'flex',minHeight:24,marginTop:.5,marginBottom:1,alignItems:"center"}}>
                 <Typography className = {styles.cardPrice} variant="body2" sx={{color:'text.secondary',}} component="div">
                    by {product.sellerId}
                </Typography>
                <Typography className = {styles.cardPrice} variant="h6" sx={{color:'text.secondary', marginLeft:"auto",fontWeight:"bold"}}>
                    {product.price}
                </Typography>
            </Stack>
        </CardContent>
    </div>
    </Card>)
  )
);
}