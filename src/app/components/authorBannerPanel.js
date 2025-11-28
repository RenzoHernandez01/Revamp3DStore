
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
export default function AuthorBannerPanels({seller}) {
  return (
    <Box
  sx={{
    position: "relative",
    display: "flex",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    overflow: "hidden", 
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${seller.authorBanner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(4px)",
      transform: "scale(1.05)", 
      zIndex: -1, 
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: -1,
    },
  }}
>


    <Stack sx={{gap:1, display:"flex", justifyContent:"center",alignItems:"center"}}>
        <Avatar sx={{ bgcolor: "pink" }}> {seller.name?.charAt(0).toUpperCase()}
 </Avatar>
        <Stack sx={{justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"row" }}>
          <Typography fontSize={20}> {seller.rating} </Typography> <StarPurple500OutlinedIcon sx={{fontSize:"40", marginLeft:1}}/>
        </Stack>
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