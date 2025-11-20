"use client";
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/navigation';



let Search = styled('div')(({ theme }) => ({

  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  maxWidth: 300,
}));

let SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

let StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));


export default function ResponsiveAppBar() {
  let  router = useRouter();
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
      <button className={styles.logoHome}>LOGO</button>
        <Search sx= {{marginRight:"auto",border:1}}>
        <SearchIconWrapper  >
            <SearchIcon sx={{color:"black"}}/>
        </SearchIconWrapper>
        <StyledInputBase
            sx={{color:"black"}}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
        />
        </Search>
      <button className={styles.cartBtnHomeMain}    onClick={() => {
        handleOpenCart();
      }}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30,color:"black" }}/>
      </button>
     

      {showCart && ( <><div className= {style.cartBackdrop} onClick={handleCloseCart} />
        <CartOverLay onClose={handleCloseCart} /> 
      </>
      )}
     
      <Button variant='text'
      onClick={() => router.push('/authPage/signin')}
      >
        Sign In
      </Button>

      <div className={styles.signUpWrapperHome}>
          <Button variant='text'
            onClick={() => router.push('/authPage/signup')}
            >
            Sign Up
          </Button>
      </div>

      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            {setting}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}