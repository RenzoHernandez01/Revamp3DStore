"use client";

import styles from './searchGrid.module.css'; 
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchGrid() {
  return (
    <div className={styles.searchGrid}>
      <Stack spacing={2} sx={{ width: 747, border: 'none',
    boxShadow: 'none',
    outline: 'none'
}}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          renderInput={(params) => <TextField {...params} label="freeSolo" variant='filled' 
          sx={{
            backgroundColor: '#e0e0e05d',
            borderRadius: 10,
            '& .MuiFilledInput-root': {
                backgroundColor: 'transparent',
                borderBottom: 'none',
            },
            '& .MuiFilledInput-underline:before': {
                borderBottom: 'none',
            },
            '& .MuiFilledInput-underline:after': {
                borderBottom: 'none',
            }
            }}
        />}
        />
      </Stack>
    </div>
  );
}