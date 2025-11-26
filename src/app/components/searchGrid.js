"use client";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/navigation';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import styles from './searchGrid.module.css';
import SearchIcon from '@mui/icons-material/Search';
export default function SearchGrid({ products }) {
  const router = useRouter();

  return (
    <div className={styles.searchGrid}>
      <Stack spacing={2} sx={{ width: 747 }}>
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = e.target.value.toLowerCase().trim();
              const normalizedInput = value.replace(/\s+/g, '');
              const product = products.find(p =>
                p.name.toLowerCase().replace(/\s+/g, '').includes(normalizedInput)
              );

              if (product) {
                router.push(`/productPage/${product.id}`);
              } else {
                router.push(`/categoryPages/marketplace?notFound=${encodeURIComponent(value)}`);
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
              router.push(`/productPage/${product.id}`);
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
    </div>
  );
}