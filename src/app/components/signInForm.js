"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import styles from "../authPage/[mode]/authPage.module.css";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useAuth } from "../context/AuthContext";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
export default function SignInForm() {
  const router = useRouter();

  const { signIn } = useAuth();
  let [showPassword, setShowPassword] = React.useState(false);
  let handleClickShowPassword = () => setShowPassword((prev) => !prev);
  let handleMouseDownPassword = (event) => event.preventDefault();
  let handleMouseUpPassword = (event) => event.preventDefault();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
  const newErrors = validate();
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;
  setLoading(true);
  try {
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      console.error("Response was not JSON");
      setLoading(false);
      return;
    }
if (!res.ok) {
  if (data.field) {
    setErrors((prev) => ({ ...prev, [data.field]: data.error }));
  } else {
    setErrors((prev) => ({
      ...prev,
      email: data.error,
      password: data.error,
    }));
  }
  setLoading(false);
  return;
}

    //console.log("signin response", data);
     signIn(data.user);
    router.push("/");
  } catch (err) {
    console.error("Sign in failed:", err);
  } finally {
    setLoading(false);
  }
};

  return (
   <div className={`${styles.signUpContainer}`}>
        <div className={`${styles.signPageBlock} ${styles.signInBlock}`} id="signInBlock">
            <div className={`${styles.signInImages}`}>    
              <Stack  sx={{display:"flex", zIndex:2, direction:"column", width:"100%", height:"100%", padding:2, marginTop:5, gap:1}}>
                <Box
                    sx={{
                        width: 200,
                        height: 80,
                        backgroundImage:'url(https://res.cloudinary.com/dxqj5g1ii/image/upload/v1765433828/revampWhite_xaycqm.png)',
                        backgroundSize: 'contain',                   
                        backgroundPosition: 'center',
                        backgroundRepeat:"no-repeat" ,
                     }}
                  />

                <Typography variant='h6' sx={{fontWeight:"bold", fontSize:25, lineHeight:1.25,color:"white"}}>Welcome back to webStorePage.</Typography>
                <Box sx={{width:150, height:5, backgroundColor:"#7DA0CA", borderRadius:5}}> </Box> 
                <Typography sx={{lineHeight:1.25, color:"white"}}>Sign in to continue to your account.</Typography>
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
               <Stack sx={{width:"100%",height:"20%", display:"flex", justifyContent:"center", alignItems:"center",flexDirection:"row", gap:2}}>
                  <Box sx={{width:160, height:2, backgroundColor:"black"}}></Box>
                  <Typography sx={{color:"black"}}>Or</Typography>
                  <Box sx={{width:160, height:2, backgroundColor:"black"}}></Box>
                </Stack>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                 <Stack sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small" 
                  sx={{width:384,marginBottom:0,
                      "& input:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0px 1000px #eaeaeaff inset", 
                          WebkitTextFillColor: "black",                
                          transition: "background-color 5000s ease-in-out 0s", }
                  }} 
                  onChange={handleChange('email')} error={!!errors.email} helperText={errors.email || ' '}/>    
                  <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      size="small"
                      type={showPassword ? "text" : "password"}
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
                              aria-label={showPassword ? "hide the password" : "display the password"}
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
                      value={form.password}
                      onChange={handleChange("password")}
                      error={!!errors.password}
                      helperText={errors.password || " "}
                      />
                  <Button onClick={handleSubmit}   type="submit" variant="contained" disableElevation  disableRipple
                sx={{ backgroundColor:"#7DA0CA", width: 384,height: 40, whiteSpace:"nowrap",  textTransform: "none", 
                "&:hover": {backgroundColor: "#6f8cafff"}}} >
                      {loading ? "Signing in..." : "Sign In"}
                  </Button> 
                     <Typography variant="body2" color="text.secondary">
                   Not yet a member?{' '}
                         <Button variant='text' disableRipple disableElevation sx={{textDecoration:"underline", textTransform:"none", color:"black",
                         "&:hover": {
                            backgroundColor: "transparent", 
                            textDecoration: "underline",    
                              },
                          }}
                            onClick={() => router.push('/authPage/signup')}
                            >
                                Sign Up
                        </Button>
                </Typography>
                </Stack>
                </form>
            </div>
        </div>
   </div>
  );
}