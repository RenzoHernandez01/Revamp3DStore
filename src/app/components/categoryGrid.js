import styles from './categoryGrid.module.css'; 
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from 'next/link';

export default function categoryGrid() {
  return (
    <div>
        <div className = {`${styles.categoryGrid}`}>
            <ButtonGroup variant="contained" aria-label="Basic button group" sx={{width:"100%",height:"100%"}}>
                <Button sx={{flex:1}}>Character</Button>
                <Button sx={{flex:1}}>Terrain</Button>
                <Button sx={{flex:1}}>Vehicles</Button>
                <Button sx={{flex:1}}>Weapon</Button>
                <Button sx={{flex:1}}>Furniture</Button>
            </ButtonGroup>
        </div>
    </div>
    
  );
}
