
import AuthorCards from './authorCards.';
import { Stack } from '@mui/material';
export default function CreatorGrid() {
  return (
    <Stack sx={{display:"flex",justifyContent:"center", alignItems:"center",  flexDirection:"row" , gap:5}}>
      <AuthorCards limitEnd={6} />     
    </Stack>
  );
}