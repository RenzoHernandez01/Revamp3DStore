import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { useState, useRef } from "react";

export function ProductImageCarousel({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const startCarousel = () => {
    if (intervalRef.current) return; 
    intervalRef.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 1000);
  };
  const stopCarousel = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setImageIndex(0); 
  };


  return (
    <Box
      sx={{ width: "100%", height: "100%" }}
      onMouseEnter={startCarousel}
      onMouseLeave={stopCarousel}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
          objectFit: "cover",
          transition: "opacity 0.1s ease-in-out"
        }}
        image={images[imageIndex]}
        alt={`product-${imageIndex}`}
      />
    </Box>
  );
}