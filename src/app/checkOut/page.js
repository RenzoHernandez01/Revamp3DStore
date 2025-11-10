"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import styles from "./checkOut.module.css";
import CategoryGrid from "../components/categoryGrid";
import OtherButtonGrid from "../components/otherButtonGrid"
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CreditCard } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import countries from '../../../data/countries.json';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
export  default function CheckOut(){
    const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };
  return (
<div>
    <OtherButtonGrid/>
    <CategoryGrid/>
    <section>
        <div className = {`${styles.checkOutContainer}`}>
            <div className={`${styles.checkOutCart}`}>
                 <div className={`${styles.checkOutProductArea}`}>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{ width: '100%',backgroundColor:"#f1f1f1",marginTop:.1}}
                    >
                    <div className={`${styles.checkOutProductIcon}`}></div>  
                    <Typography variant="h6" color = "black">
                        Product Name
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}/>
                    <Typography variant="h6" color = "black">
                        $1000
                    </Typography>
                    </Stack>
                </div>
                <div className={`${styles.subTotalArea}`}>
                    <div className={`${styles.subTotalWrapper}`}>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: '100%',backgroundColor:"#f1f1f1",marginTop:.1,marginBottom:5}}>
                            <Typography variant="h6" color = "black">
                                Subtotal
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Typography variant="h6" color = "black">
                                $1000
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: '100%',backgroundColor:"#f1f1f1",marginBottom:5}}>
                            <Typography variant="h6" color = "black">
                                Sale Discount
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Typography variant="h6" color = "black">
                                $1000
                            </Typography>
                        </Stack>
                         <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: '100%',backgroundColor:"#f1f1f1",marginTop:.1}}>
                            <Typography variant="h6" color = "black">
                                Total Price
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Typography variant="h6" color = "black">
                                $1000
                            </Typography>
                        </Stack>
                    </div>
                </div>
            </div>
            <div className={`${styles.cardPaymentArea}`}>
                <div className = {`${styles.paymentWrapper}`}>                
                    <Typography variant="h4" color = "black" sx={{marginTop:5,marginBottom:5}}>
                        Pay with Card
                    </Typography>
                    <TextField id="outlined-basic" label="Email Address" variant="filled" size="medium" 
                    sx={{width:550,marginBottom:2,boxShadow:5,borderRadius:2,marginBottom:2,
                        '& .MuiFilledInput-root': {backgroundColor: 'transparent',borderBottom: 'none',},
                        '& .MuiFilledInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiFilledInput-underline:after': {
                            borderBottom: 'none',
                        }}}/>
                    <Typography variant="h4" color = "black" sx={{marginTop:5,marginBottom:5}}>
                        Payment Method
                    </Typography>
                    <Typography variant="h6" color = "black">
                        Card information
                    </Typography>
                    <div className = {`${styles.cardInfoArea}`}> 
                        <TextField className={`${styles.ccNumberInfo}`} label="1234 1234 1234 1234" variant="filled" size="medium" 
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none',borderTopLeftRadius: '10px',borderTopRightRadius: '10px'},
                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none',
                            }}}/>
                        <TextField className={`${styles.ccDateInfo}`} label="MM / YY" variant="filled" size="medium" 
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none',borderBottomLeftRadius: '10px',borderTopLeftRadius:0,borderTopRightRadius:0},

                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none',
   
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none',
                        }}}/>
                         <TextField className={`${styles.ccCvcInfo}`}label="CVC" variant="filled" size="medium" 
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none',borderBottomRightRadius: '10px',borderTopLeftRadius:0,borderTopRightRadius:0},
                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none',
                        }}}/>
                    </div>
                    <Typography variant="h6" color = "black">
                        Cardholder name
                    </Typography>
                       <TextField id="outlined-basic" label="Cardname" variant="filled" size="medium" 
                    sx={{width:588,marginBottom:2,boxShadow:5,borderRadius:2,marginBottom:5,
                        '& .MuiFilledInput-root': {backgroundColor: 'transparent',borderBottom: 'none',},
                        '& .MuiFilledInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiFilledInput-underline:after': {
                            borderBottom: 'none',
                        }}}/>
                    <Typography variant="h6" color = "black">
                        Billing address
                    </Typography>
                    <div className = {`${styles.billingAddressArea}`}>
                        <Autocomplete
                        options={countries}
                        disableCloseOnSelect
                        getOptionLabel={(option) =>
                            `${option.label} (${option.code}) +${option.phone}`
                        }
                        renderInput={(params) => <TextField {...params} label="Choose a country"   variant="filled" />}
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none',borderTopLeftRadius: '10px',borderTopRightRadius: '10px'}
                        }}
                        />
                         <TextField id="outlined-basic" label="Cardname" variant="filled" size="medium" 
                        sx={{width:`100%`,borderRadius:2,
                        '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none',borderBottomLeftRadius: '10px',borderBottomRightRadius: '10px',borderTopLeftRadius:0,borderTopRightRadius:0,},
                        '& .MuiFilledInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiFilledInput-underline:after': {
                            borderBottom: 'none',
                        }}}/>   
                    </div>
                    <div className= {`${styles.storeCCInfoArea}`}>
                         <Checkbox {...label} />
                        <Typography variant="h8" color = "black">
                            Save my payment details for faster checkout next time
                        </Typography>
                    </div>
                  <Button variant="contained" sx={{width:588,marginTop:2, marginBottom:2}}>Pay</Button> 
                </div> 
            </div>
        </div>
    </section>1
</div>
  );
}