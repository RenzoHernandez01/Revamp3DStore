import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import styles from "./orderHistory.module.css";


export default function orderHistory({product}) {
  return (
    <div>
        <Card className={`${styles.orderHistoryWrapper}`} sx={{ maxWidth: 900, height: 50,backgroundColor:"white",alignItems: 'center', }}>   
            <CardContent  >
                <Stack direction={"row"} sx={{alignSelf: 'center',margin:0,padding:0,gap:2,}} >
                    <Typography variant='body2' color="gray">ID: </Typography>
                    <Typography variant='body2'> {product.id} </Typography>
                    <Typography variant='body2' color="gray">Date: </Typography>
                    <Typography variant='body2' > {new Date(product.purchaseDate).toLocaleDateString()} </Typography>
                    <Typography variant='body2' color="gray">OrderTotal: </Typography>
                    <Typography variant='body2'> ${product.priceAtPurchase} </Typography>

                </Stack>
            </CardContent>
        </Card>
    </div>
  );
}
