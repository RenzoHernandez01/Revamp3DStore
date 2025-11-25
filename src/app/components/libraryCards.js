import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import FolderZipRoundedIcon from '@mui/icons-material/FolderZipRounded';
import { autocompleteClasses } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function libraryCards({product}) {
  const [expanded, setExpanded] = React.useState(false);
  const [rating, setRating] = useState(0);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  

  return (
    <div>
        <Card sx={{ maxWidth: 900}}>   
        <CardContent>
        <Stack direction="row">
          <CardMedia component="img"
            image = {product.images[0]}
            sx={{ 
            width:120,
            height:90,
            objectFit: 'cover',       
            overflow: 'hidden', 
            }}/>
          <Stack sx={{marginLeft:2}} direction="column" >
            <Typography variant='h6' className="libraryProductName" sx={{marginBottom:1,fontWeight:"bold"}}>{product.name}</Typography>
            <Typography variant='overline'>Leave a rating:</Typography>
             <Rating name="half-rating" value={rating}  precision={0.5} onChange={(event, newValue) => setRating(newValue)} />
          </Stack>
          <Stack sx={{marginLeft:"auto"}} direction="column">
            <Typography variant='h6' sx={{marginBottom:1, fontWeight:"bold"}}>Purchased</Typography>
            <Typography variant='overlin' sx={{marginBottom:1}}>{new Date(product.purchaseDate).toLocaleDateString()}</Typography>
          </Stack>
        </Stack>     
     </CardContent>
      <Divider />
      <CardActions disableSpacing>
        <Typography sx={{ marginLeft: 1 }}>Product Link</Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
       <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <FolderZipRoundedIcon/>
            <Stack sx={{marginLeft:2}} direction="column" >
                <Typography variant='caption' sx={{fontWeight:"Bold"}}>{product.name}.zip</Typography>
                <Typography variant='caption'>ZIP </Typography>
            </Stack>
            <Button onClick={() => {
                const link = document.createElement("a");
                link.href = "https://storage.googleapis.com/3dwebstoreassets/cube.glb";
                link.download = "cube.glb";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
          variant="contained" sx={{marginLeft:"auto"}}>download</Button>
        </CardContent>
      </Collapse>
    </Card>
    </div> 
  );
}
