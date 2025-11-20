"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import styles from "../authPage/[mode]/authPage.module.css";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
export  default function SignUpForm(){
  let  router = useRouter();
  let [showPassword, setShowPassword] = React.useState(false);
  let handleClickShowPassword = () => setShowPassword((prev) => !prev);
  let handleMouseDownPassword = (event) => event.preventDefault();
  let handleMouseUpPassword = (event) => event.preventDefault();
  return (
    <div className={`${styles.signUpContainer}`} id="signUpBlock">
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
                <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? 'text' : 'password'}
                sx={{ width: 384 }}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
                />
                <Button variant="contained" sx={{width:384,marginTop:2, marginBottom:2}}>Sign Up</Button> 
                <Typography variant="body2" color="text.secondary">
                    Already a member?{' '}
                         <Button variant='text'
                            onClick={() => router.push('/authPage/signin')}
                            >
                                Sign In
                        </Button>
                </Typography>
            </div>
        </div>
   </div>
  );
}