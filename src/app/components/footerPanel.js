
import styles from './footerPanel.module.css'; 
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
export default function FooterPanel() {
  let router = useRouter();
  return (
<div>
    <section className={`${styles.aboutSection}`}>
      <Stack sx={{width:"100%",height: 210,backgroundColor:"#7DA0CA"
        ,display:"flex", 
        justifyContent:"center",
        alignItems:"center", 
        flexDirection:"row", 
        gap:25, pl:10, pr:10, pt:5}}>
         <Stack sx={{ color: "white",display: "flex",flexDirection: "column",alignItems:"flex-start",justifyContent:"flex-start",height:"100%",backgroundcolor:"red"}}>
         <Button
                disableRipple disableElevation
                variant="text"
                onClick={() => router.push('/')}
                sx={{
                  width: 120,
                  height: 50,
                  backgroundImage: 'url(https://res.cloudinary.com/dxqj5g1ii/image/upload/v1765433828/revampWhite_xaycqm.png)', 
                 backgroundSize: 'contain',                   
                  backgroundPosition: 'center',
                  backgroundRepeat:"no-repeat",
                  "&:hover":{backgroundColor:"transparent"}                 
                }}
              >
              </Button>
        </Stack>
        <Stack sx={{ color: "white",display: "flex",flexDirection: "column",alignItems:"flex-start",justifyContent:"flex-start",height:"100%",gap: 1}}>
            <Typography variant="h6" sx={{ textTransform: "none", fontWeight:"bold"}}>
            Community
            </Typography>
            <Typography component={"a"}  href = "https://www.youtube.com/" target=" " sx={{ color: "#dbdbdbff", textTransform: "none", "&:hover":{color:"white"}}}>
              Youtube
            </Typography>
            <Typography  component={"a"}  href = "https://www.facebook.com/" target=" " sx={{ color: "#dbdbdbff", textTransform: "none", "&:hover":{color:"white"}}}>
              Facebook
            </Typography>
            <Typography  component={"a"} href = "https://www.instagram.com/" target=" " sx={{ color: "#dbdbdbff", textTransform: "none", "&:hover":{color:"white"}}}>
              Instagram
            </Typography>
        </Stack>
        <Stack sx={{ color: "white",display: "flex",flexDirection: "column",alignItems:"flex-start",justifyContent:"flex-start",height:"100%", gap:1}}> 
            <Typography variant="h6" sx={{ textTransform: "none", fontWeight:"bold"}}>
              Legal
            </Typography>
            <Typography onClick={() => router.push('/policyPage/termsofservices')} target=" " sx={{ color: "#dbdbdbff", textTransform: "none", "&:hover":{color:"white",cursor:"pointer"}}}>
              Terms of Service
            </Typography>
            <Typography  onClick={() => router.push('/policyPage/privacy')} target=" " sx={{ color: "#dbdbdbff", textTransform: "none", "&:hover":{color:"white",cursor:"pointer"}}}>
              Privacy Policy
            </Typography>
        </Stack>
      </Stack>
    </section>
</div>
  );
}