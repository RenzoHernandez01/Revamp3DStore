"use client";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import styles from './button.module.css'; 
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import CartOverLay from './cartOverlay.js';
import style from "../components/cartOverlay.module.css";
import { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import { useAuth } from '../context/AuthContext';
import SearchBarComponent from './searchBarComponent';



export default function ResponsiveAppBar() {
  let  router = useRouter();
  let { signOut, user } = useAuth();
  let [anchorElUser, setAnchorElUser] = React.useState(null);
  let [showCart, setShowCart] = React.useState(false);
  let handleOpenCart = () => setShowCart(true);
  let handleCloseCart = () => setShowCart(false);
  let handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  let handleCloseUserMenu = () => setAnchorElUser(null);


useEffect(() => {
  document.body.style.overflow = showCart ? 'hidden' : 'auto';
}, [showCart]);


  return (
    <div className={styles.buttonGrid}>
       <div className={styles.leftGroup}>
      <button className={styles.logoHome}>LOGO</button>
        <SearchBarComponent/>
        </div>
      <button className={styles.cartBtnHomeMain}    onClick={() => {
        handleOpenCart();
      }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30,color:"black" }}/>
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
  PaperProps={{
    sx: {
      zIndex: 9999, // 👈 higher than your grid
    },
  }}
>
  {['My Library', 'Order History','Logout'].map((setting) => (
    <MenuItem
      key={setting}
      onClick={() => {
        handleCloseUserMenu();
        if (setting === 'Logout') {
          signOut();
          router.push('/');
        }
         if (setting === 'My Library') {
          router.push('/customerProfile?section=library');
        }
        if (setting === 'Order History') {
          router.push('/customerProfile?section=orderHistory');
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