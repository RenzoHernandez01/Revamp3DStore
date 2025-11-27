
import AuthorCards from './authorCards.';
import { Stack } from '@mui/material';
export default function CreatorGrid() {
  return (
    <Stack sx={{display:"flex",justifyContent:"center", alignItems:"center", marginTop:5, flexDirection:"row" , gap:4}}>
      <AuthorCards limitEnd={5} />     
    </Stack>
  );
}