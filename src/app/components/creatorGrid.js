import styles from './creatorGrid.module.css'; 
import Link from 'next/link';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function CreatorGrid() {
  return (
    <div className = {styles.creatorDiv}>
           
            <div className= {styles.creatorGrid}>

            <div className={styles.sellerInfo}>
                    <div className={styles.profileImage}>
                        <div className = {styles.profileImageMain}>
                             <img src = "https://res.cloudinary.com/dxqj5g1ii/image/upload/v1761897485/madlogo_fy8js7.png"/>
                        </div>
                        <h3 className = {styles.sellerName}> rererere</h3>
                    </div>
            </div>


            </div>
        </div>
  );
}