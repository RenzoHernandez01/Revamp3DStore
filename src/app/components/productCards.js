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
export default function ProductCards() {
  return (
    <Card className = {styles.cardInfo} sx={{ maxWidth: 325, height: 435,margin:0}}>
    <div className={styles.productCardWrapper}>
     <div className = {styles.previewWrapper}>
        <CardMedia
            sx={{ width: "100%", height: "100%"}}
            image="https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761636528/Thumbnail_xahizu.jpg"
            title="green iguana"
        />
        </div>     
        <CardContent sx={{ padding: 0 }}>

            <Typography  className = {styles.cardNameAndInfo} gutterBottom variant="h5" component="div">
            <div className = {styles.productName}>
                Lizard
            </div>
            <VerifiedRoundedIcon sx={{marginRight:1}}/>
            <WhatshotRoundedIcon/>
            </Typography>
            <Typography className = {styles.cardPrice} variant="body2" sx={{ color: 'text.secondary' }} component="div">
                100
            </Typography>
        </CardContent>
        {/*<CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
        </CardActions>*/}
     </div>
    </Card>
  );
}