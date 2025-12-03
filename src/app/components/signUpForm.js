"use client";
import * as React from 'react';
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
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

export  default function SignUpForm(){
  let  router = useRouter();
  let [showPassword, setShowPassword] = React.useState(false);
  let handleClickShowPassword = () => setShowPassword((prev) => !prev);
  let handleMouseDownPassword = (event) => event.preventDefault();
  let handleMouseUpPassword = (event) => event.preventDefault();
  let [errors, setErrors] = React.useState({});
  let [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  let handleChange = (field) => (e) => {
    setForm({...form,  [field]: e.target.value});
    setErrors(prev => ({ ...prev, [field]: '' }));
  };
  
  let validate = () => {
    let newErrors = {};
    if(!form.firstName.trim()) newErrors.firstName = 'this field is required';
    if(!form.lastName.trim()) newErrors.lastName = 'this field is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
     if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
        return; 
    }
    try {
        let res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        });
        let data = await res.json();
        if (!res.ok) {
        setErrors(prev => ({ ...prev, email: data.error }));
        return;
        }
        console.log('signup response', data);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/authPage/signin');
    } catch (err) {
        console.log('Sign up failed:', err);
    }
    };

  return (
    <div className={`${styles.signUpContainer}`} id="signUpBlock">
        <div className={`${styles.signPageBlock} ${styles.signInBlock}`}>
            <div className={`${styles.signInImages}`}> 
              <Stack  sx={{display:"flex", zIndex:2, direction:"column", width:"100%", height:"100%", padding:2, marginTop:5, gap:2}}>
                <Typography variant='h3' sx={{fontWeight:"bold",}}>LOGO</Typography>
                <Typography variant='h6' sx={{fontWeight:"bold", fontSize:25, lineHeight:1.25 }}>Create a free account.</Typography>
                <Box sx={{width:150, height:5, backgroundColor:"#7DA0CA", borderRadius:5}}> </Box> 
                <Typography sx={{lineHeight:1.25}}>Join FlippedNormals and explore thousands of courses and resources created by the world’s best artists.</Typography>
              </Stack>  
            </div>
            <div className={`${styles.signUpInputs}`}>
                <Button variant="outlined"  disableRipple  
               href='https://www.facebook.com/' target='_blank'
                sx={{width:384, marginBottom:2, borderColor:"black",borderWidth:1.25, 
                  "&:hover": {backgroundColor: "#dcdcdcff", }
                }}>
                  <Stack sx={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"row", gap:7}}>
                    <FacebookOutlinedIcon sx={{color:'black',position:"absolute",marginRight:40}}/>
                    <Typography sx={{color:"black", fontWeight:"bold", textTransform: "none",}} >
                    Continue with Facebook 
                    </Typography>
                  </Stack>
                </Button>
                <Button variant="outlined"  disableRipple  
                href='https://www.Google.com/' target='_blank'
                sx={{width:384, marginBottom:2, borderColor:"black",borderWidth:1.25, 
                  "&:hover": {backgroundColor: "#dcdcdcff", }
                }}>
                   <Stack sx={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"row", gap:7}}>
                    <GoogleIcon  sx={{color:'black',position:"absolute",marginRight:40}}/>
                    <Typography sx={{color:"black", fontWeight:"bold", textTransform: "none",}} >
                    Continue with Google
                    </Typography>
                  </Stack>
                </Button>
                <Stack sx={{width:"100%",height:"100%", display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"row", gap:2}}>
                  <Box sx={{width:160, height:2, backgroundColor:"black"}}></Box>
                  <Typography sx={{color:"black"}}>Or</Typography>
                  <Box sx={{width:160, height:2, backgroundColor:"black"}}></Box>
                </Stack>
                <Stack sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <div className={`${styles.userNameContainer}`}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" size="small"
                        sx={{"& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0px 1000px #eaeaeaff inset", 
                          WebkitTextFillColor: "black",                
                          transition: "background-color 5000s ease-in-out 0s", 
                        },
                    }} 
                        value={form.firstName} 
                        onChange={handleChange('firstName')} error={!!errors.firstName} helperText={errors.firstName || ' '}/>  
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small"
                        sx={{"& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0px 1000px #eaeaeaff inset", 
                          WebkitTextFillColor: "black",                
                          transition: "background-color 5000s ease-in-out 0s", 
                        },
                    }} 
                        value={form.lastName} 
                        onChange={handleChange('lastName')} error={!!errors.lastName} helperText={errors.lastName || ' '}/>  
                </div>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small" 
                sx={{width:384,marginBottom:0,
                  "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0px 1000px #eaeaeaff inset", 
                          WebkitTextFillColor: "black",                
                          transition: "background-color 5000s ease-in-out 0s", }
                  
                }} 
                value={form.email} 
                onChange={handleChange('email')} error={!!errors.email} helperText={errors.email || ' '}/>    
                <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? 'text' : 'password'}
                sx={{ width: 384,marginBottom:1, marginTop:0, 
                   "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0px 1000px #eaeaeaff inset", 
                          WebkitTextFillColor: "black",                
                          transition: "background-color 5000s ease-in-out 0s", }
                }}
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
                value={form.password} onChange={handleChange('password')} 
                error={!!errors.password} helperText={errors.password || ' '}
                />
                <Button  onClick={handleSubmit}  variant="contained" disableElevation  disableRipple
                sx={{ backgroundColor:"#7DA0CA", width: 384,height: 40, whiteSpace:"nowrap",  textTransform: "none",
                "&:hover": {backgroundColor: "#6f8cafff"}}} >
                  Sign Up
                  </Button> 
                <Typography variant="body2" color="text.secondary">
                    Already a member?{' '}
                         <Button variant='text' disableRipple disableElevation sx={{textDecoration:"underline", textTransform:"none", color:"black",
                         "&:hover": {
                            backgroundColor: "transparent", 
                            textDecoration: "underline",    
                              },
                          }}
                            onClick={() => router.push('/authPage/signin')}
                            >
                                Sign In
                        </Button>
                </Typography>
                </Stack>
                

            </div>
        </div>
   </div>
  );
}