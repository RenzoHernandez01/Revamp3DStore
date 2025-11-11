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

export default function libraryCards() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
        <Card sx={{ maxWidth: 900}}>   
     <CardContent>
        <Stack direction="row">
          <CardMedia component="img"
            image = "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761636528/Thumbnail_xahizu.jpg"
            sx={{ 
            width:120,
            height:90,
            objectFit: 'cover',       
            overflow: 'hidden', 
            }}/>
          <Stack sx={{marginLeft:2}} direction="column" >
            <Typography variant='h6' className="libraryProductName" sx={{marginBottom:1,fontWeight:"bold"}}>ProductName</Typography>
            <Typography variant='overline'>Leave a rating:</Typography>
             <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          </Stack>
          <Stack sx={{marginLeft:"auto"}} direction="column">
            <Typography variant='h6' sx={{marginBottom:1, fontWeight:"bold"}}>Purchased</Typography>
            <Typography variant='overlin    ' sx={{marginBottom:1}}>Oct 31,2025</Typography>
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
                <Typography variant='caption' sx={{fontWeight:"Bold"}}>ProductName.zip</Typography>
                <Typography variant='caption'>ZIP 2GB</Typography>
            </Stack>
            <Button variant="contained" sx={{marginLeft:"auto"}}>Contained</Button>
        </CardContent>
      </Collapse>
    </Card>
    </div>
    
  );
}
