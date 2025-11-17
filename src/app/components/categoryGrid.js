"use client";
import styles from './categoryGrid.module.css'; 
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from 'next/link';

export default function categoryGrid() {
  return (
    <div>
        <div className = {`${styles.categoryGrid}`}>
            <ButtonGroup variant="contained" aria-label="Basic button group" sx={{width:"100%",height:"100%"}}>
                <Button sx={{flex:1,borderRadius:0}} component={Link} href="/categoryPages/character">Character</Button>
                <Button sx={{flex:1}} component={Link} href="/categoryPages/terrain">Terrain</Button>
                <Button sx={{flex:1}} component={Link} href="/categoryPages/vehicle">Vehicles</Button>
                <Button sx={{flex:1}} component={Link} href="/categoryPages/weapon">Weapon</Button>
                <Button sx={{flex:1,borderRadius:0}} component={Link} href="/categoryPages/props">Props</Button>
            </ButtonGroup>
        </div>
    </div>
    
  );
}
