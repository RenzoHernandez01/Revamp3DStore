"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import styles from './button.module.css'; 
import CartOverLay from './cartOverlay.js';
import style from "../components/cartOverlay.module.css";
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/navigation';
import SearchBarComponent from './searchBarComponent';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/AuthContext';

export default function ResponsiveAppBar({products}) {
  let router = useRouter();
  let [showCart, setShowCart] = React.useState(false);
  let { isSignedIn, signOut, user } = useAuth();
  let [anchorElUser, setAnchorElUser] = React.useState(null);
  let handleOpenCart = () => setShowCart(true);
  let handleCloseCart = () => setShowCart(false);
  let handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  let handleCloseUserMenu = () => setAnchorElUser(null);
  const { cartItems,} = useCart();
  console.log("asdfasdfa",isSignedIn);
  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart]);

   let trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar position='fixed' sx={{backgroundColor:"white"}}  elevation={trigger ? 6 : 0}>
       <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>

    <div className={styles.buttonGrid}>
          <div className={styles.leftGroup}>
            <Button variant="text" onClick={() => router.push('/')}>
              HOME LOGO
            </Button>
            <SearchBarComponent/>
          </div>

          <div className={styles.rightGroup}>
            <button
              className={styles.cartBtnHomeMain}
              onClick={handleOpenCart}
            >
              <Badge  badgeContent={cartItems.length} color="primary">
                <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: "black" }} />
              </Badge>
            </button>

            {showCart && (
              <>
                <div className={style.cartBackdrop} onClick={handleCloseCart} />
                <CartOverLay onClose={handleCloseCart} />
              </>
            )}

         { isSignedIn ? 
         <Stack>
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
           <Stack direction={"row"} sx={{gap:2}}>
                  <Button   disableElevation disableRipple
                      variant="text" sx={{color:"black", fontWeight:"bold", textTransform: "none",
                    "&:hover":{
                          backgroundColor:"transparent",color: "black", 
                        }
                  }} 
                  onClick={() => router.push('/authPage/signin')}>
                    Sign In
                  </Button>
                  <div className={styles.signUpWrapperHome}>
                    <Button variant="text"  sx={{color:"black", fontWeight:"bold", textTransform: "none",
                      "&:hover":{
                          backgroundColor:"transparent",color: "black", 
                        }
                    }} onClick={() => router.push('/authPage/signup')}>
                      Sign Up
                    </Button>
                  </div>
          </Stack>}
         
          </div>
        </div>
        </Toolbar>
    </AppBar>
    
  );
}