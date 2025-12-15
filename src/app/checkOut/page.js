"use client";
import * as React from 'react';
import styles from "./checkOut.module.css";
import CategoryGrid from "../components/categoryGrid";
import OtherButtonGrid from "../components/otherButtonGrid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CreditCard } from '@mui/icons-material';
import CheckOutItems from '../components/checkOutItems';
import Stack from '@mui/material/Stack';
import countries from '../../../data/countries.json';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/cartContext';
import { ProductsContext } from '../context/productContext';
import { enrichUserWithLibrary } from '../context/AuthContext';
function getTotalDiscount(cartItems) {
  let totalDiscount = 0;
  cartItems.forEach(product => {
    if (product.onSale) {
      let discount = Math.round(product.price * (product.salePercentage / 100));
      totalDiscount += discount;
    }
  });
  return totalDiscount;
}

export  default function CheckOut(){
    let  router = useRouter();
    const { user, setUser } = useAuth();
    const { cartItems, clearCart } = useCart();
    const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };
    let subtotalPrice = 0;
    let totalDiscount = getTotalDiscount(cartItems);
    let [saveInfo, setSaveInfo] = useState(false);
    let [products, setProducts] = useState([]);
    let [errors, setErrors] = React.useState({});
    let [ccForm, setCcForm] = React.useState({
        email: '',
        ccNumber: '',
        ccDate: '',
        cvc: '',
        ccName: '',
        country: '',
        address: '',
    })

    useEffect(() => {
    if (user?.email) {
        const saved = localStorage.getItem(`savedPaymentInfo_${user.email}`);
        if (saved) {
        setCcForm(JSON.parse(saved));
        setSaveInfo(true);
        } else {
        setSaveInfo(false);
        }
    }
    }, [user]);


    let handleChange = (field) => (e) => {
        setCcForm({...ccForm,  [field]: e.target.value});
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 16);
        const formatted = value.match(/.{1,4}/g)?.join(" ") || "";
        setCcForm(prev => ({ ...prev, ccNumber: formatted }));
        setErrors(prev => ({ ...prev, ccNumber: "" }));
        };
    
    const handleDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 4);
        const formatted = value.match(/.{1,2}/g)?.join("/") || "";
        setCcForm(prev => ({ ...prev, ccDate: formatted }));
        setErrors(prev => ({ ...prev, ccDate: "" }));
        };

    const handleCvcChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 4);
        const formatted = value.match(/.{1,4}/g)?.join("") || "";
        setCcForm(prev => ({ ...prev, cvc: formatted }));
        setErrors(prev => ({ ...prev, cvc: "" }));
        };

    let validate = () => {
        let newErrors = {};
        if(!ccForm.ccNumber.trim()) newErrors.ccNumber = 'this field is required';
        if(!ccForm.ccDate.trim()) newErrors.ccDate = 'this field is required';
        if(!ccForm.cvc.trim()) newErrors.cvc = 'this field is required';
        if(!ccForm.ccName.trim()) newErrors.ccName = 'this field is required';
        if (!ccForm.country || !ccForm.country.label) {
            newErrors.country = 'this field is required';
            }
        if(!ccForm.address.trim()) newErrors.address = 'this field is required';
        return newErrors;
    };

const handleSubmit = async () => {
  const newErrors = validate();
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    let latestUser = null;

    if (saveInfo && user?.email) {
      localStorage.setItem(`savedPaymentInfo_${user.email}`, JSON.stringify(ccForm));
      const res = await fetch('/api/storeCcInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ccForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(prev => ({ ...prev, email: data.error }));
        return;
      }

      localStorage.setItem('user', JSON.stringify(data.user));
      latestUser = data.user;
    } else {
      const storedUser = localStorage.getItem("user");
      latestUser = storedUser ? JSON.parse(storedUser) : { email: ccForm.email };
    }

    if (!cartItems || cartItems.length === 0) {
      console.warn('No items in cart to purchase');
      return;
    }

    for (const cartItem of cartItems) {
      if (!cartItem?.id) {
        console.warn('Cart item missing id:', cartItem);
        continue;
      }

      const finalPrice = cartItem.onSale
        ? cartItem.price - Math.round(cartItem.price * (cartItem.salePercentage / 100))
        : cartItem.price;

      const purchaseRes = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: latestUser.email,
          productId: cartItem.id,
          priceAtPurchase: finalPrice,
        }),
      });

      const purchaseData = await purchaseRes.json();

      if (!purchaseRes.ok) {
        console.error('Purchase failed:', purchaseData.error);
        return;
      }
      


      const enrichedUser = enrichUserWithLibrary(purchaseData.user, products);
    localStorage.setItem("user", JSON.stringify(enrichedUser));
    setUser(enrichedUser);
            latestUser = enrichedUser;


    }

    router.push('/customerProfile');
    clearCart();
  } catch (err) {
    console.log('payment failed:', err);
  }
};


    useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email) {
      setCcForm(prev => ({ ...prev, email: storedUser.email }));
    }
    
    }, []);
    cartItems.forEach(productInCart =>{
    subtotalPrice = productInCart.price + subtotalPrice;
  })

  return (
<div>
    <ProductsContext.Provider value={products}>
        <OtherButtonGrid/>
   </ProductsContext.Provider>
    <CategoryGrid/>
    <section>
        <div className = {`${styles.checkOutContainer}`}>
            <div className={`${styles.checkOutCart}`}>
                 <div className={`${styles.checkOutProductArea}`}>
                    {cartItems.map((item) => (
                        <CheckOutItems product = {item}/>
                    ))}
                </div>
                <div className={`${styles.subTotalArea}`}>
                    <div className={`${styles.subTotalWrapper}`}>
                        <Box sx={{width:480, height:2}}>
                        </Box>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: '100%',marginTop:.1,marginBottom:5}}>
                            <Typography variant="h6" color = "black">
                                Subtotal
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Typography variant="h6" color = "black">
                                ${subtotalPrice}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: '100%',marginBottom:5}}>
                            <Typography variant="h6" color = "black">
                                Sale Discount
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Typography variant="h6" color = "red">
                                -${totalDiscount}   
                            </Typography>
                        </Stack>
                         <Box sx={{width:480, height:2,backgroundColor:"#9f9f9f"}}>
                        </Box>
                         <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ width: '100%',marginTop:.1}}>
                            <Typography variant="h6" color = "black">
                                Total Price
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Typography variant="h5" color = "black">
                                ${subtotalPrice-totalDiscount}
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
                    <TextField id="outlined-basic" variant="filled" size="medium"  disabled value={ccForm.email} 
                    sx={{width:550,marginBottom:2,boxShadow:5,borderRadius:2,marginBottom:2, justifyContent:"center",
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
                         value={ccForm.ccNumber} onChange={handleCardNumberChange} error={!!errors.ccNumber} helperText=""   id="outlined-error"
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none', boxShadow:1,borderTopLeftRadius: '10px',borderTopRightRadius: '10px',
                             border: (errors.ccNumber ? '2px solid red' : '1px solid #ccc'),},

                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none',
                            }}}/>
                        <TextField className={`${styles.ccDateInfo}`} label="MM / YY" variant="filled" size="medium" 
                         value={ccForm.ccDate}  onChange={handleDateChange} error={!!errors.ccDate} helperText=""
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none', boxShadow:1,borderBottomLeftRadius: '10px',borderTopLeftRadius:0,borderTopRightRadius:0
                                , border: (errors.ccDate? '2px solid red' : '1px solid #ccc'),},
                            '& .MuiFilledInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottom: 'none',
                        }}}/>
                         <TextField className={`${styles.ccCvcInfo}`}label="CVC" variant="filled" size="medium" 
                           value={ccForm.cvc}  onChange={handleCvcChange} error={!!errors.cvc} helperText=""
                        sx={{width:`100%`,
                            '& .MuiFilledInput-root': {backgroundColor: 'white',borderBottom: 'none', boxShadow:1,borderBottomRightRadius: '10px',borderTopLeftRadius:0,borderTopRightRadius:0
                                ,border: (errors.cvc? '2px solid red' : '1px solid #ccc'),},

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
                         value={ccForm.ccName}  onChange={handleChange('ccName')} error={!!errors.ccName} helperText=""
                    sx={{width:588,marginBottom:2,boxShadow:1,borderRadius:2,marginBottom:5, boxShadow:1,
                        '& .MuiFilledInput-root': {backgroundColor: 'transparent',borderBottom: 'none',
                            border: (errors.ccName? '2px solid red' : '1px solid #ccc'), backgroundColor: 'transparent', 
                        },
                        
                           '& .MuiFilledInput-underline:before': {
                                    borderBottom: 'none',  
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                    borderBottom: 'none', 
                                    },}}/>
                    <Typography variant="h6" color = "black">
                        Billing address
                    </Typography>
                    <div className = {`${styles.billingAddressArea}`}>
                       <Autocomplete
                            options={countries}
                            disableCloseOnSelect
                            getOptionLabel={(option) =>
                                option ? `${option.label} (${option.code}) +${option.phone}` : ""
                            }
                            value={ccForm.country}
                            onChange={(e, newValue) =>
                                setCcForm(prev => ({ ...prev, country: newValue }))
                            }
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Choose a country"
                                variant="filled"
                                error={!!errors.country}
                                helperText=""
                                />
                            )}
                            sx={{
                                width: `100%`,
                                boxShadow: 1,
                                '& .MuiFilledInput-root': {
                                backgroundColor: 'white',
                                borderBottom: 'none',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                border: (errors.ccName? '2px solid red' : '1px solid #ccc'),
                                },
                            }}
                            />
                        <TextField
                                label="Address"
                                variant="filled"
                                size="medium"
                                value={ccForm.address}
                                onChange={handleChange('address')}
                                error={!!errors.address}
                                helperText=""
                                sx={{
                                    width: '100%',
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    '& .MuiFilledInput-root': {
                                    backgroundColor: 'white',
                                    border: errors.address ? '2px solid red' : '1px solid #ccc',
                                    borderBottomLeftRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                    },
                                    '& .MuiFilledInput-underline:before': {
                                    borderBottom: 'none',  
                                    },
                                    '& .MuiFilledInput-underline:after': {
                                    borderBottom: 'none', 
                                    },
                                }}
                                />

                    </div>
                    <div className= {`${styles.storeCCInfoArea}`}>
                         <Checkbox 
                        inputProps={{ 'aria-label': 'Save payment info' }}
                         checked={saveInfo}           
                         onChange={(e) => setSaveInfo(e.target.checked)}/>
                        <Typography variant="h8" color = "black">
                            Save my payment details for faster checkout next time
                        </Typography>
                    </div>
                  <Button  
                  onClick={handleSubmit} 
                  disableElevation disableRipple
                  variant="contained" 
                  sx={{ height:50, width:588,marginTop:2, marginBottom:2,  backgroundColor: "#313131ff" , 
                  color:"white", "&:hover":{backgroundColor:"#424242ff"}}}> 
                    Pay</Button> 
                </div> 
            </div>
        </div>
    </section>
</div>
  );
}