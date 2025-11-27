
import Typography from '@mui/material/Typography';
import styles from './bannerPanels.module.css'; 
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function AuthorBannerPanels({seller}) {
  return (
    <Box   sx={{ display:"flex",  backgroundImage: "url('https://res.cloudinary.com/dxqj5g1ii/image/upload/v1764207948/2_ngc34t.jpg')",  backgroundSize: "cover", 
            backgroundPosition: "center", width: "100%", height: 300, justifyContent:"center", alignContent:"center", padding:2 }}>

    <Stack sx={{gap:1, display:"flex", justifyContent:"center",alignItems:"center"}}>
        <Avatar sx={{ bgcolor: "pink" }}>N</Avatar>
        <Typography>5000 Sales | {seller.rating} </Typography>
        <Typography variant='h4'>{seller.name} </Typography>
        <Button variant="outlined">Contact</Button>
        <Typography >Something something about the authro made up lmao big bong bing bong nachu pampu  </Typography>
        <Stack sx={{display:"flex", flexDirection:"row"}}>
            <IconButton aria-label="youtube" >
                    <YouTubeIcon sx={{ color: "white",fontSize:30 }} />
            </IconButton>
            <IconButton aria-label="youtube" >
                    <InstagramIcon sx={{ color: "white",fontSize:30 }} />
            </IconButton>
             <IconButton aria-label="youtube" >
                    <LinkedInIcon sx={{ color: "white",fontSize:30 }} />
            </IconButton>
        </Stack> 
    </Stack>

    </Box>
  );
}