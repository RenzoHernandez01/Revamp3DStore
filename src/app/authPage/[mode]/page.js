"use client";
import * as React from 'react';
import CategoryGrid from "../../components/categoryGrid";
import FooterPanel from "../../components/footerPanel";
import OtherButtonGrid from "../../components/otherButtonGrid"
import SignInForm from '@/app/components/signInForm';
import SignUpForm from '@/app/components/signUpForm';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Toolbar from '@mui/material/Toolbar';

export  default function AuthPage(){
let { isSignedIn, user, signOut } = useAuth();
 let {mode} = useParams();
  return (
<div>
 <OtherButtonGrid/>
    <Toolbar />
  <CategoryGrid/>
   {mode === 'signin' && <SignInForm/>}
   {mode === 'signup' && <SignUpForm/>}
   <FooterPanel/>
</div>
  );
}