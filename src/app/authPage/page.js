"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import styles from "./authPage.module.css";
import CategoryGrid from "../components/categoryGrid";
import FooterPanel from "../components/footerPanel";
import OtherButtonGrid from "../components/otherButtonGrid"
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
export  default function AuthPage(){
  return (
<div>
   <OtherButtonGrid/>
   <CategoryGrid/> 
   <div className={`${styles.signUpContainer}`}>
        <div className={`${styles.signPageBlock} ${styles.signInBlock}`} id="signInBlock">
            <div className={`${styles.signInImages}`}>    
            </div>
            <div className={`${styles.signUpInputs}`}>
                <Button variant="outlined" sx={{width:384, marginBottom:2}}>Continue with Facbook</Button>
                <Button variant="outlined" sx={{width:384}}>Continue with Google</Button>
                <Divider textAlign="center" sx={{ my: 2 }}>
                     <span style={{ fontSize: '1.2rem', color: 'black' }}>or</span>
                </Divider>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small" sx={{width:384,marginBottom:2}}/>    
                <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password" sx={{width:384}}/> 
                <Button variant="contained" sx={{width:384,marginTop:2, marginBottom:2}}>Sign In</Button> 
                <Typography variant="body2" color="text.secondary">
                    Not yet a member?{' '}
                        <Link href="#" underline="hover" component ="a" color="primary">
                            {'Sign Up'}
                        </Link>
                </Typography>
            </div>
        </div>
   </div>
   {/*<div className={`${styles.signUpContainer}` id="signUpBlock"}>
        <div className={`${styles.signPageBlock} ${styles.signInBlock}`}>
            <div className={`${styles.signInImages}`}>    
            </div>
            <div className={`${styles.signUpInputs}`}>
                <Button variant="outlined" sx={{width:384, marginBottom:2}}>Continue with Facbook</Button>
                <Button variant="outlined" sx={{width:384}}>Continue with Google</Button>
                <Divider textAlign="center" sx={{ my: 2 }}>
                     <span style={{ fontSize: '1.2rem', color: 'black' }}>or</span>
                </Divider>
                <div className={`${styles.userNameContainer}`}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" size="small"sx={{marginBottom:2}}/>  
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small"sx={{marginBottom:2}}/>  
                </div>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small" sx={{width:384,marginBottom:2}}/>    
                <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type="password" sx={{width:384}}/> 
                <Button variant="contained" sx={{width:384,marginTop:2, marginBottom:2}}>Sign Up</Button> 
                <Typography variant="body2" color="text.secondary">
                    Already a member?{' '}
                        <Link href="#" underline="hover" component ="a" color="primary">
                            {'Sign In'}
                        </Link>
                </Typography>
            </div>
        </div>
   </div>*/}
   <FooterPanel/>
</div>
  );
}