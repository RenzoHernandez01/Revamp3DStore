import styles from './button.module.css'; 
import Link from 'next/link';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



export default function ButtonGrid() {
  return (
    <div className={`${styles.buttonGrid}`}>
      <button className={`${styles.logoHome}`}>LOGO</button>
      
      <button className={`${styles.cartBtnHomeMain}`}>
        <ShoppingCartIcon sx={{ fontSize: 30}}/>
      </button>

      <Link href="/login" className={`${styles.signInButtonHome} ${styles.signInButton}`}>
        Sign In
      </Link>

      <div className={`${styles.signUpWrapperHome}`}>
        <Link href="/signup" className={`${styles.signUpButtonHome} ${styles.signUpButton}`}>
          Sign Up
        </Link>
      </div>

      {/*<Link href="/profile" className={`${styles.profileBtnHome} ${styles.profileBtn}`} style={{ display: 'none' }}>
        Profile
      </Link>*/}

      <Link href="/" className={`${styles.logOutBtnHome} ${styles.logOutBtn}`} style={{ display: 'none' }}>
        Log Out
      </Link>

    </div>
  );
}