"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {useSearchParams, useRouter } from 'next/navigation';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import styles from './searchGrid.module.css';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import { useNotFound } from '../context/notFoundContext';
export default function SearchGrid({ products }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setItemNotFound } = useNotFound();

  return (
    <div className={styles.searchGrid}>
      <Stack sx={{display:"flex", justifyContent:"flex-start", alignItems:"center", flexDirection:"column", width:"100%", height:"100%", gap:2}}>
      <Typography variant="h4"sx={{color:"#e8e8e8ff", fontWeight:700, marginTop:10, fontSize: 46}} >
               CG Marketplace by the World's Best 3D Artists
      </Typography>
       <Typography variant="h6"sx={{color:"#e8e8e8ff",fontWeight:500, margin:0, fontSize: 20}} >
               Curated 3D models. Ready to use in gaming, animation, and 3D Printing.
      </Typography>
      <Stack spacing={2} sx={{ width: 1000, marginTop:2 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={products.map(p => p.name)}
          filterOptions={(options, state) => {
            const input = state.inputValue.toLowerCase().replace(/\s+/g, '');
            if (!input) return [];
            return options.filter(option =>
              option.toLowerCase().replace(/\s+/g, '').includes(input)
            );
          }}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option, inputValue, { insideWords: true });
            const parts = parse(option, matches);
            return (
              <li {...props}>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                      color: part.highlight ? "#1b1b1bff" : "inherit"
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </li>
            );
          }}
           onInputChange={(event, newInputValue) => {

              if (newInputValue) {
                setItemNotFound(null);
              }
            }}

          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = e.target.value.toLowerCase().trim();
              const normalizedInput = value.replace(/\s+/g, '');
              const product = products.find(p =>
                p.name.toLowerCase().replace(/\s+/g, '').includes(normalizedInput)
              );

              if (product) {
                setItemNotFound(null);
                router.push(`/productPage/${product.id}`);
              } else {
                setItemNotFound(value);
                const params = new URLSearchParams(searchParams.toString());
                params.set('notFound', value);
                router.push(`/categoryPages/marketplace?${params.toString()}`);

              }
            }
          }}
          onChange={(event, value) => {
            if (!value) return;
            const normalizedValue = value.toLowerCase().replace(/\s+/g, '');
            const product = products.find(p =>
              p.name.toLowerCase().replace(/\s+/g, '').includes(normalizedValue)
            );
            if (product) {
               setItemNotFound(null);
              router.push(`/productPage/${product.id}`);
            } else {
              const params = new URLSearchParams(searchParams.toString());
              params.set('notFound', value);
              router.push(`/categoryPages/marketplace?${params.toString()}`);
              setItemNotFound(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <SearchIcon fontSize="small" />
                    Search Marketplace...
                  </span>
                }
              variant="filled"
              sx={{
                backgroundColor: '#e0e0e05d',
                borderRadius: 2,
                '& .MuiFilledInput-root': {
                  backgroundColor: 'transparent',
                  borderBottom: 'none',
                },
                '& .MuiFilledInput-underline:before': { borderBottom: 'none', },
                '& .MuiFilledInput-underline:after': { borderBottom: 'none' },
                '& .MuiFilledInput-root.Mui-focused': {
                  backgroundColor: 'white',backgroundColor: '#e0e0e05d',
                },
              }}
            />
          )}
        />
      </Stack>  
      </Stack>
    </div>
  );
}