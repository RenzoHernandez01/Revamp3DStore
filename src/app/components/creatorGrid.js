
import AuthorCards from './authorCards.';
import { Stack } from '@mui/material';
export default function CreatorGrid() {
  return (
    <Stack sx={{display:"flex",justifyContent:"center", alignItems:"center", marginTop:3, flexDirection:"row" , gap:5}}>
      <AuthorCards limitEnd={5} />     
    </Stack>
  );
}