
import Box from '@mui/material/Box';
export default function ProductBannerPanel({product}) {
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
      backgroundImage: `url(${product.images[0]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(4px)",
      backgroundColor:"black",
      transform: "scale(1)", 
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
    </Box>
  );
}