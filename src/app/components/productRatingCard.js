import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import  LinearWithValueLabel  from '../components/progressBar.js';

export default function ProductRatingCard() {
  return (
    <Card sx={{ justifyContent:"center", alignItems:"center",width: '100%',  padding:1}} variant="outlined">
      <CardContent  sx={{ display: 'flex', justifyContent:"center", alignItems:"center",  flexDirection: 'column',}}>
        <Stack direction={"row"} sx={{width: '100%', alignItems:"center",justifyContent:"flex-start",padding:0}}>
            <Typography variant='subtitle2' sx={{fontWeight:"bold"}}>RATINGS</Typography>
            <Button variant="Text" size="small" sx={{marginLeft:"auto",marginRight:0,fontSize:'caption'}}>This Product</Button>
        </Stack>
         <Stack direction={"row"} sx={{width: '100%', alignItems:"center",justifyContent:"flex-start",gap:.5}}>
            <StarPurple500OutlinedIcon/>
            <Typography variant='subtitle2' sx={{fontWeight:"bold"}}>4.5</Typography>
            <Typography variant='subtitle2' sx={{}}>(21 ratings)</Typography>
        </Stack>
        <Stack direction={"column"} sx={{width: '100%', alignItems:"center",justifyContent:"flex-start",gap:.5,marginTop:1}}>
            <Stack direction="row" sx={{ width: '100%', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                        5 Stars
                    </Typography>
                    <LinearWithValueLabel value={100} />
            </Stack>
            <Stack direction="row" sx={{ width: '100%', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                       4 Stars
                    </Typography>
                    <LinearWithValueLabel value={100} />
            </Stack>
             <Stack direction="row" sx={{ width: '100%', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                       3 Stars
                    </Typography>
                    <LinearWithValueLabel value={100} />
            </Stack>
             <Stack direction="row" sx={{ width: '100%', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                       2 Stars
                    </Typography>
                    <LinearWithValueLabel value={100} />
            </Stack>
             <Stack direction="row" sx={{ width: '100%', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                       1 Stars
                    </Typography>
                    <LinearWithValueLabel  variant="determinate"  value={100} sx={{ height: 10, }} />
            </Stack>
            


        </Stack>
      </CardContent>
    </Card>
  );
}
