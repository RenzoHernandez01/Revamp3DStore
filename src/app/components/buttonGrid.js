import styles from './buttonMain.module.css'; 
import Link from 'next/link';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useEffect, useState } from 'react';
import * as React from 'react';
import CartOverLay from './cartOverlay.js';
import { useRouter } from 'next/navigation';
import style from "../components/cartOverlay.module.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { withTheme } from '@emotion/react';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/cartContext';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import Badge from '@mui/material/Badge';

export default function ButtonGrid() {
    let  router = useRouter();
    let [showCart, setShowCart] = React.useState(false);
    let [anchorElUser, setAnchorElUser] = React.useState(null);
    let handleOpenCart = () => setShowCart(true);
    let handleCloseCart = () => setShowCart(false);
    let handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    let handleCloseUserMenu = () => setAnchorElUser(null);
    const { cartItems,} = useCart();
    let { isSignedIn, user, signOut } = useAuth();

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);

     const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
      
  return (
     <AppBar position='fixed' sx={{backgroundColor: trigger?"white":"transparent",zIndex:99999}}  elevation={trigger ? 6 : 0}>
     <Toolbar sx={{ justifyContent: "space-between", px: 2  }}>
    <div className={`${styles.buttonGrid}`}>
      <div className={`${styles.logoHome}`}>  <Button variant="text" onClick={() => router.push('/')}>
              HOME LOGO
            </Button></div>
      
      <button className={styles.cartBtnHomeMain}    
      onClick={() => {
        handleOpenCart();
      }}>
        <Badge  badgeContent={cartItems.length} color="primary">
        <ShoppingCartOutlinedIcon sx={{ fontSize: 30,color:trigger?"black":"white"}}/>
        </Badge>
      </button>
     

      {showCart && ( <><div className= {style.cartBackdrop} onClick={handleCloseCart} />
        <CartOverLay onClose={handleCloseCart} /> 
      </>
      )}
      

      { isSignedIn ? <Stack>
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
                    zIndex: 9999,
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
      </Stack>
      :
      <Stack  direction={"row"} sx={{gap:2}}>
          <Button disableRipple variant='text' sx={{color:trigger?"black":"white", fontWeight:"bold", textTransform: "none", "&:hover":{
            backgroundColor:"transparent",
          } }}
        onClick={() => router.push('/authPage/signin')}
        >
          Sign In
          </Button>
   
          <Button variant='outlined'  disableRipple 
          sx={{color:trigger?"black":"white",borderStyle:"solid", fontWeight:"bold", textTransform: "none",  borderWidth:2,borderColor: trigger ? "black" : "white",
            "&:hover":{
            backgroundColor:"transparent",}
            
          }}
                onClick={() => router.push('/authPage/signup')}
                >
                Sign Up
          </Button>
      </Stack>}
     

    </div>
    </Toolbar>
    </AppBar>
  );
}