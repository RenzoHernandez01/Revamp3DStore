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

    console.log("signin response", data);
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
            </div>
            <div className={`${styles.signUpInputs}`}>
                <Button variant="outlined" sx={{width:384, marginBottom:2}}>Continue with Facbook</Button>
                <Button variant="outlined" sx={{width:384}}>Continue with Google</Button>
                <Divider textAlign="center" sx={{ my: 2 }}>
                     <span style={{ fontSize: '1.2rem', color: 'black' }}>or</span>
                </Divider>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" size="small" sx={{width:384,marginBottom:0}} 
                onChange={handleChange('email')} error={!!errors.email} helperText={errors.email || ' '}/>    
               <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    sx={{ width: 384 }}
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
                <Button onClick={handleSubmit}  variant="contained" sx={{width:384,marginTop:2, marginBottom:2}}>
                    {loading ? "Signing in..." : "Sign In"}
                </Button> 
                <Typography variant="body2" color="text.secondary">
                    Not yet a member?{' '}
                        <Link href="#" underline="hover" component ="a" color="primary">
                            {'Sign Up'}
                        </Link>
                </Typography>
            </div>
        </div>
   </div>
  );
}