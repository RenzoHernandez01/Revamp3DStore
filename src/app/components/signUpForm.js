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
            </div>
            <div className={`${styles.signUpInputs}`}>
                <Button variant="outlined" sx={{width:384, marginBottom:2}}>Continue with Facbook</Button>
                <Button variant="outlined" sx={{width:384}}>Continue with Google</Button>
                <Divider textAlign="center" sx={{ my: 2 }}>
                     <span style={{ fontSize: '1.2rem', color: 'black' }}>or</span>
                </Divider>
                <div className={`${styles.userNameContainer}`}>
                        <TextField id="outlined-basic" label="First Name" variant="outlined" size="small"sx={{marginBottom:2}} value={form.firstName} 
                        onChange={handleChange('firstName')} error={!!errors.firstName} helperText={errors.firstName || ' '}/>  
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" size="small"sx={{marginBottom:2}} value={form.lastName} 
                        onChange={handleChange('lastName')} error={!!errors.lastName} helperText={errors.lastName || ' '}/>  
                </div>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small" sx={{width:384,marginBottom:0}} value={form.email} 
                onChange={handleChange('email')} error={!!errors.email} helperText={errors.email || ' '}/>    
                <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? 'text' : 'password'}
                sx={{ width: 384,marginBottom:1, marginTop:0, }}
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
                <Button  onClick={handleSubmit}  variant="contained" sx={{width:384,marginTop:2, marginBottom:2}}>Sign Up</Button> 
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