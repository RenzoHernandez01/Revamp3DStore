import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './productCards.module.css'; 
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';


function checkForSale(product){

  if (product.onSale) {
    product.salePrice = Math.round(product.price * (1 - product.salePercentage / 100));
    return (
      <Stack direction="row" spacing={1}  sx={{alignItems:"center", marginLeft:"auto"}}>
        <Typography variant="body.2" sx={{ textDecoration: "line-through", color: "gray" }}>
          ${product.price}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "red",  }}>
          ${product.salePrice}
        </Typography>
      </Stack>
    );
  }
  else{
    return(
      <Typography variant='h6' sx={{marginBottom:1, fontWeight:"bold", marginLeft:"auto"}}>${product.price}</Typography>
    )
  }
}

/*export default function ProductCards({ products = [], creators = null, filterMode = null, limitStart, limitEnd }) {
    let  router = useRouter();
    let filtered = products .filter(product => !filterMode || product.category.toLowerCase() === filterMode.toLowerCase());
    let sliced = limitEnd ? filtered.slice(limitStart,limitEnd) : filtered.slice(0,filtered.length);
    return (
    sliced.map((product,index) =>( 
    <Card  key={product.id}className = {styles.cardInfo} sx={{ maxWidth: 325, height: 435,margin:0,padding:2,borderRadius:3, '&:hover': {
    boxShadow: 4,
    transform: 'scale(1.01)',
    transition: 'all 0.2s ease-in-out',},}} 
    
    onClick={() => router.push(`/productPage/${product.id}`)}>

    <div className={styles.productCardWrapper}> 
        <div className = {styles.previewWrapper}>
            { product.onSale ? <Box sx={{display:'flex',width:90,height:30,backgroundColor:"#E83361",zIndex:2,position:"absolute"
                ,top: 0, right: 10, top:10, width: 60, borderRadius:1, height: 20, color:"white"
                ,alignItems:"center",justifyContent:"center"}}>
               {product.salePercentage}%</Box> : ""}
            <CardMedia
                sx={{ width: "100%", height: "100%"}}
                image={product.images[0]}
            />
        </div>     
        <CardContent sx={{ padding: 0,maxHeight:300}}>
            <Stack  direction="row"   sx={{ display: 'flex', marginTop: .5, justifyContent: "flex-end" }}  >
                {product.staffPick && (
                    <Box sx={{backgroundColor:"#7DA0CA", display:"flex", alignItems:"center", justifyContent:"center", width:30, height: 25,borderRadius:"25%", marginRight:.5}}>
                        <VerifiedOutlinedIcon sx={{color:"white", fontSize: 20 }}/></Box>
                )} 
                <Box sx={{backgroundColor:"#F8A127", display:"flex", alignItems:"center", justifyContent:"center", width:30, height: 25,borderRadius:"25%"}}>
                <WhatshotOutlinedIcon sx={{color:"white", fontSize: 20 }} /></Box>
            </Stack>
            <Stack direction={"row"} sx={{display:'flex',minHeight:24,marginTop:1}} >
                <Typography  gutterBottom variant="subtitle2"  sx={{   fontWeight: "bold",
                    whiteSpace: "nowrap",       
                    textOverflow: "ellipsis",  
                    overflow:"hidden",   
                    maxWidth: "100%",}}>     
                    {product.name}
                </Typography>  
            </Stack>
            <Stack direction={"row"} sx={{display:'flex',minHeight:20,marginTop:0,marginBottom:1,alignItems:"center"}}>
                 <Typography className = {styles.cardPrice} variant="body2" sx={{color:'text.secondary',}} component="div">
                    by {product.sellerId}
                </Typography>
                <Typography className = {styles.cardPrice} variant="h6" sx={{color:'text.secondary', marginLeft:"auto",fontWeight:"bold"}}>
                    {product.price}
                </Typography>
            </Stack>
        </CardContent>
    </div>
    </Card>)
  )
);
}*/

/*export default function ProductCards({ products = [], creators = null, filterMode = null, limitStart, limitEnd }) {
    let router = useRouter();
    let filtered = products.filter(product => !filterMode || product.category.toLowerCase() === filterMode.toLowerCase());
    let sliced = limitEnd ? filtered.slice(limitStart, limitEnd) : filtered.slice(0, filtered.length);

    return (
        sliced.map((product, index) => {
            let averageRating = 0;
            if (product.ratingsBreakdown) {
                const totalRate = Object.values(product.ratingsBreakdown).reduce((sum, count) => sum + count, 0);
                const weightedSum = Object.entries(product.ratingsBreakdown).reduce(
                    (sum, [score, count]) => sum + Number(score) * count,
                    0
                );
                averageRating = totalRate === 0 ? 0 : (weightedSum / totalRate).toFixed(1);
            }

            return (
                <Card
                    key={product.id}
                    className={styles.cardInfo}
                    sx={{
                        maxWidth: 325,
                        height: 435,
                        margin: 0,
                        padding: 2,
                        borderRadius: 3,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'scale(1.01)',
                            transition: 'all 0.2s ease-in-out',
                        },
                    }}
                    onClick={() => router.push(`/productPage/${product.id}`)}
                >
                    <div className={styles.productCardWrapper}>
                        <div className={styles.previewWrapper}>
                            {product.onSale ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: 60,
                                        height: 20,
                                        backgroundColor: "#E83361",
                                        zIndex: 2,
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        borderRadius: 1,
                                        color: "white",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {product.salePercentage}%
                                </Box>
                            ) : ""}
                            <CardMedia
                                sx={{ width: "100%", height: "100%" }}
                                image={product.images[0]}
                            />
                        </div>
                        <CardContent sx={{ padding: 0, maxHeight: 300 }}>
                            <Stack direction="row" sx={{ display: 'flex', marginTop: .5, justifyContent: "flex-end" }}>
                                {product.staffPick && (
                                    <Box sx={{ backgroundColor: "#7DA0CA", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 25, borderRadius: "25%", marginRight: .5 }}>
                                        <VerifiedOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
                                    </Box>
                                )}
                                <Box sx={{ backgroundColor: "#F8A127", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 25, borderRadius: "25%",}}>
                                    <WhatshotOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
                                </Box>
                                <Typography fontWeight="bold" sx={{marginLeft:1}}>{averageRating}</Typography> 
                                <StarPurple500OutlinedIcon />
                            </Stack>
                            <Stack direction={"row"} sx={{ display: 'flex', minHeight: 24, marginTop: 1 }} >
                                <Typography gutterBottom variant="subtitle2" sx={{
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxWidth: "100%",
                                }}>
                                    {product.name}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{ display: 'flex', minHeight: 20, marginTop: 0, marginBottom: 1, alignItems: "center" }}>
                                <Typography className={styles.cardPrice} variant="body2" sx={{ color: 'text.secondary' }} component="div">
                                    by {product.sellerId}
                                </Typography>
                                <Typography className={styles.cardPrice} variant="h6" sx={{ color: 'text.secondary', marginLeft: "auto", fontWeight: "bold" }}>
                                    {product.price}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </div>
                </Card>
            );
        })
    );
}*/

export default function ProductCards({ products = [], creators = null, filterMode = null, limitStart, limitEnd }) {
    let router = useRouter();
    let filtered = products.filter(product => !filterMode || product.category.toLowerCase() === filterMode.toLowerCase());
    let sliced = limitEnd ? filtered.slice(limitStart, limitEnd) : filtered.slice(0, filtered.length);

    return (
        sliced.map((product, index) => {
            let averageRating = 0;
            let totalRate = 0; 
            let trendingScore = 0;
            let isTrending = false;
            if (product.ratingsBreakdown) {
                totalRate = Object.values(product.ratingsBreakdown).reduce((sum, count) => sum + count, 0);
                const weightedSum = Object.entries(product.ratingsBreakdown).reduce(
                    (sum, [score, count]) => sum + Number(score) * count,
                    0
                );
                averageRating = totalRate === 0 ? 0 : (weightedSum / totalRate).toFixed(1);
                trendingScore = totalRate + Math.floor(Math.random() * 20);
                if(trendingScore >= 60){
                    isTrending = true;
                }
            }

            return (
                <Card
                    key={product.id}
                    className={styles.cardInfo}
                    sx={{
                        maxWidth: 325,
                        height: 435,
                        margin: 0,
                        padding: 2,
                        borderRadius: 3,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'scale(1.01)',
                            transition: 'all 0.2s ease-in-out',
                        },
                    }}
                    onClick={() => router.push(`/productPage/${product.id}`)}
                >
                    <div className={styles.productCardWrapper}>
                        <div className={styles.previewWrapper}>
                            {product.onSale ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: 60,
                                        height: 20,
                                        backgroundColor: "#E83361",
                                        zIndex: 2,
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        borderRadius: 1,
                                        color: "white",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {product.salePercentage}%
                                </Box>
                            ) : ""}
                            <CardMedia
                                sx={{ width: "100%", height: "100%", borderRadius:2 }}
                                image={product.images[0]}
                            />
                        </div>
                        <CardContent sx={{ padding: 0, maxHeight: 300 }}>
                            <Stack direction="row" sx={{ display: 'flex', marginTop: .5, justifyContent: "flex-end", alignItems: "center" }}>
                                {product.staffPick && (
                                    <Box sx={{ backgroundColor: "#7DA0CA", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 25, borderRadius: "25%", marginRight: .5 }}>
                                        <VerifiedOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
                                    </Box>
                                )}
                               { isTrending && (<Box sx={{ backgroundColor: "#F8A127", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 25, borderRadius: "25%" }}>
                                    <WhatshotOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
                                </Box>)}
            
                                <Typography fontWeight="bold" sx={{ marginLeft: 1 }}>
                                    {averageRating}
                                </Typography>
                                <StarPurple500OutlinedIcon sx={{ fontSize: 18, color: "black", marginLeft: 0.5 }} />
                                <Typography variant="caption" sx={{ marginLeft: 0.5, color: 'text.secondary' }}>
                                    ({totalRate})
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{ display: 'flex', minHeight: 24, marginTop: 1 }} >
                                <Typography gutterBottom variant="subtitle2" sx={{
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    maxWidth: "100%",
                                }}>
                                    {product.name}
                                </Typography>
                            </Stack>
                            <Stack direction={"row"} sx={{ display: 'flex', minHeight: 20, marginTop: 0, marginBottom: 1, alignItems: "center" }}>
                                <Typography className={styles.cardPrice} variant="body2" sx={{ color: 'text.secondary' }} component="div">
                                    by {product.sellerId}
                                </Typography>
                                {checkForSale(product)}
                                {/*<Typography className={styles.cardPrice} variant="h6" sx={{ color: 'text.secondary', marginLeft: "auto", fontWeight: "bold" }}>
                                    {product.price}
                                </Typography>*/}
                            </Stack>
                        </CardContent>
                    </div>
                </Card>
            );
        })
    );
}
