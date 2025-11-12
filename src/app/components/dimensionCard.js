import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
export default function dimensionCard() {
  return (
    <Card sx={{ width: '100%',}} variant="outlined">
        <CardContent sx={{ display: 'flex', flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography variant='caption'>Dimensions</Typography>
            <Typography variant="h6">25cm x 30cm x 25cm</Typography>
        </CardContent>
    </Card>
  );
}
