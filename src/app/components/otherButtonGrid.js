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
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/AuthContext';
import { usePathname } from "next/navigation";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useWishList } from "../context/wishListContext";
export default function ResponsiveAppBar({products}) {
  let router = useRouter();
  const pathname = usePathname();
  let { isSignedIn, signOut, user } = useAuth();
  let [anchorElUser, setAnchorElUser] = React.useState(null);
  let handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  let handleCloseUserMenu = () => setAnchorElUser(null);
  const { showCart, openCart,cartItems, closeCart} = useCart();
  const {wishListItems} = useWishList();

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
            <Button
                disableRipple disableElevation
                variant="text"
                onClick={() => router.push('/')}
                sx={{
                  width: 120,
                  height: 50,
                  backgroundImage: 'url(https://res.cloudinary.com/dxqj5g1ii/image/upload/v1765432800/revampBlue_re31ch.png)', 
                 backgroundSize: 'contain',                   
                  backgroundPosition: 'center',
                  backgroundRepeat:"no-repeat",
                  "&:hover":{backgroundColor:"transparent"}                 
                }}
              >
              </Button>

            {pathname !== "/checkOut" && <SearchBarComponent />}
          </div>
          <div className={styles.rightGroup}>
           { isSignedIn ? 
           <IconButton
                disableRipple
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => router.push('/wishListPage')}
              >
                <Badge  badgeContent={wishListItems.length} color="primary">
                <FavoriteBorderRoundedIcon sx={{color:"#313131ff", "&:hover":{color:"#1a79ecff"}}}/>
                </Badge>
              </IconButton> : null}

            <IconButton
              disableRipple
              onClick={openCart}
              sx={{
                width: 32,
                height: 32,
              }}
            >
              <Badge  badgeContent={cartItems.length} color="primary">
                <ShoppingCartOutlinedIcon  sx={{color:"#313131ff", "&:hover":{color:"#1a79ecff"}}} />
              </Badge>
            </IconButton>

            {showCart && (
              <>
                <div className={style.cartBackdrop} onClick={closeCart} />
                <CartOverLay onClose={closeCart} />
              </>
            )}

         { isSignedIn ? 
          
         <Stack>
              <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 ,marginRight:5}}>
                <Avatar sx={{ bgcolor: "#7DA0CA",}}>
                {user?.firstName?.charAt(0).toUpperCase()}

                </Avatar>
              </IconButton>
            </Tooltip>

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                disableScrollLock
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ mt: '45px' ,}}
                PaperProps={{
                  sx: {
                    maxWidth: 'unset',
                    overflowX: 'hidden',
                    marginRight: 0,
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
                      variant="text" sx={{color:"#313131ff", fontWeight:"bold", textTransform: "none",
                    "&:hover":{
                          backgroundColor:"transparent",color:"#1a79ecff", 
                        }
                  }} 
                  onClick={() => router.push('/authPage/signin')}>
                    Sign In
                  </Button>
                  <div className={styles.signUpWrapperHome}>
                    <Button variant="text"  sx={{color:"#313131ff", fontWeight:"bold", textTransform: "none",
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