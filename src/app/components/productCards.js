import { useState, useEffect } from "react";
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
import { ProductImageCarousel } from "@/utils/ProductImageCarousel";
import { CheckForSale } from '@/utils/checkForSale';

export default function ProductCards({ products = [], filterMode = null, sellerName = null, categoryFilter = null, limitStart, limitEnd }) {
  const router = useRouter();
    let filtered;
        if (filterMode === "seller") {
          filtered = products.filter((product) =>{
            let matchesSeller =  product.sellerId?.toLowerCase().trim() === sellerName?.toLowerCase().trim()
            let matchesCategory = categoryFilter ? product.category?.toLowerCase().trim() === categoryFilter?.toLowerCase().trim() : true;
            return matchesSeller && matchesCategory;
          });
        } else if (!filterMode) {
          filtered = products;
        } else {
          filtered = products.filter(
            (product) =>
              product.category?.toLowerCase().trim() === filterMode?.toLowerCase().trim()
          );
        }

  let sliced = limitEnd
    ? filtered.slice(limitStart, limitEnd)
    : filtered.slice(0, filtered.length);

  return sliced.map((product) => {
    let averageRating = 0;
    let totalRate = 0;
    let trendingScore = 0;
    let isTrending = false;

    if (product.ratingsBreakdown) {
      totalRate = Object.values(product.ratingsBreakdown).reduce(
        (sum, count) => sum + count,
        0
      );
      const weightedSum = Object.entries(product.ratingsBreakdown).reduce(
        (sum, [score, count]) => sum + Number(score) * count,
        0
      );
      averageRating = totalRate === 0 ? 0 : (weightedSum / totalRate).toFixed(1);
      trendingScore = totalRate + Math.floor(Math.random() * 20);
      if (trendingScore >= 60) {
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
          boxShadow: 2,
          zIndex:0,
          "&:hover": {
            boxShadow: 10,
            transform: "scale(1.01)",
            transition: "all 0.2s ease-in-out",
          },
        }}
        onClick={() => router.push(`/productPage/${product.id}`)}
      >
        <div className={styles.productCardWrapper}>
          <div className={styles.previewWrapper}>
            {product.onSale ? (
              <Box
                sx={{
                  display: "flex",
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
                  justifyContent: "center",

                }}
              >
                {product.salePercentage}%
              </Box>
            ) : (
              ""
            )}
           <ProductImageCarousel images={product.images} />
          </div>
        </div>

        <CardContent sx={{ padding: 0, maxHeight: 300 }}>
          <Stack direction="row" sx={{ display: 'flex', marginTop: .5, justifyContent: "flex-end", alignItems: "center" }}>
            {product.staffPick && (
              <Box sx={{ backgroundColor: "#7DA0CA", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 25, borderRadius: "25%", marginRight: .5 }}>
                <VerifiedOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
              </Box>
            )}
            {isTrending && (
              <Box sx={{ backgroundColor: "#EA641B", display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 25, borderRadius: "25%" }}>
                <WhatshotOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
              </Box>
            )}

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
            <CheckForSale product={product} />
          </Stack>
        </CardContent>
      </Card>
    );
  });
}