"use client";
import styles from './categoryGrid.module.css'; 
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from 'next/link';
import { useNotFound } from '../context/notFoundContext';

export default function categoryGrid() {
  const { setItemNotFound } = useNotFound();
  return (
   <div>
        <div className = {`${styles.categoryGrid}`}>
            <ButtonGroup variant="contained" aria-label="Basic button group"  disableRipple disableElevation  
            sx={{width:"100%",height:"100%",
              "& .MuiButton-root": { 
                flex:1,textTransform:"none", backgroundColor:"#7DA0CA",  boxShadow: "none",
                 "&:hover": {backgroundColor: "#8dadd4ff"}
              },
            }}
            onClick={() => setItemNotFound(null)}
            >
                <Button sx={{borderRadius:0}} component={Link} href="/categoryPages/character">Character</Button>
                <Button  component={Link} href="/categoryPages/terrain">Terrain</Button>
                <Button  component={Link} href="/categoryPages/vehicle">Vehicles</Button>
                <Button  component={Link} href="/categoryPages/weapon">Weapon</Button>
                <Button sx={{borderRadius:0}} component={Link} href="/categoryPages/props">Props</Button>
            </ButtonGroup>
        </div>
    </div> 
  );
}
