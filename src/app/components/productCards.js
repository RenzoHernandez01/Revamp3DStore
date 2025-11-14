import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './productCards.module.css'; 
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { ForkLeft } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
export default function ProductCards() {
  return (
    <Card className = {styles.cardInfo} sx={{ maxWidth: 325, height: 435,margin:0,padding:2,borderRadius:3}}>
    <div className={styles.productCardWrapper}> 
        <div className = {styles.previewWrapper}>
            <Box sx={{display:'flex',width:90,height:30,backgroundColor:"pink",zIndex:2,position:"absolute"
                ,top: 0, right: 10, top:10, width: 60, borderRadius:1, height: 20, color:"white"
                ,alignItems:"center",justifyContent:"center"}}>
                50%</Box>
            <CardMedia
                sx={{ width: "100%", height: "100%"}}
                image="https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761636528/Thumbnail_xahizu.jpg"
                title="green iguana"
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
                    Long Name Long Name Long Name Long Name Long Name Long Name Long Name 
                </Typography>  
            </Stack>
            <Stack direction={"row"} sx={{display:'flex',minHeight:24,marginTop:.5,marginBottom:1,alignItems:"center"}}>
                 <Typography className = {styles.cardPrice} variant="body2" sx={{color:'text.secondary',}} component="div">
                    by AuthorName
                </Typography>
                <Typography className = {styles.cardPrice} variant="h6" sx={{color:'text.secondary', marginLeft:"auto",fontWeight:"bold"}}>
                    100
                </Typography>
            </Stack>
        </CardContent>
    </div>
    </Card>
  );
}