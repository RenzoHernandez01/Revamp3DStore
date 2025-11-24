import styles from './buttonMain.module.css'; 
import Link from 'next/link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from 'react';
import * as React from 'react';
import CartOverLay from './cartOverlay.js';
import { useRouter } from 'next/navigation';
import style from "../components/cartOverlay.module.css";
import { useAuth } from '../context/AuthContext';
export default function ButtonGridSignedIn() {
    let  router = useRouter();
    let { signOut, user } = useAuth();
    let [showCart, setShowCart] = React.useState(false);
    let handleOpenCart = () => setShowCart(true);
    let handleCloseCart = () => setShowCart(false);
    let [anchorElUser, setAnchorElUser] = React.useState(null);
    let handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    let handleCloseUserMenu = () => setAnchorElUser(null);
  
  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);
      
  return (
    <div className={`${styles.buttonGrid}`}>
      <button className={`${styles.logoHome}`}>LOGO</button>
      <button className={styles.cartBtnHomeMain}    onClick={() => {
        handleOpenCart();
      }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30,color:"white" }}/>
      </button>
      {showCart && ( <><div className= {style.cartBackdrop} onClick={handleCloseCart} />
        <CartOverLay onClose={handleCloseCart} /> 
      </>
      )}
       <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,marginRight:5}}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: '45px' }}
      >
        {['Profile', 'Account', 'Dashboard', 'Logout'].map((setting) => (
          <MenuItem key={setting} onClick={() => {
        handleCloseUserMenu();
        if (setting === "Logout") {
          signOut(); 
          router.push("/");// clears localStorage + resets auth state
          }
        }}
          >
            {setting}
          </MenuItem>
        ))}
      </Menu>
   

    </div>
  );
}