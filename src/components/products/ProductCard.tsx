import React, { useState } from 'react'
import { productType } from '../../pages/Dashboard'
import { Box, Card, Grid, Typography } from '@mui/material';
import StarRatings from './StarRatings';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ProductCardProps {
    product: productType;
}

export default function ProductCard( {product}: ProductCardProps) {

    const [ isInWishList, setIsInWishlist ] = useState(false);
const handleWishlist = () => {
    setIsInWishlist(!isInWishList);
}

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ height : '410px' , boxShadow : '0px 0px 5px 0px grey' , ':hover': {
            boxShadow : '0px 0px 10px 0px grey',
            background : 'lavenderblush',
            cursor : 'pointer'
        }}}>
            <Box padding={1}>
                { isInWishList ? <FavoriteIcon onClick={handleWishlist} sx={{position: 'absolute', display: 'inline-block', cursor: 'pointer', padding: '8px',fontSize: '30px',
                    border : 'none', boxShadow : '0px 0px 5px grey', borderRadius : '50%', margin : '7px 7px', background: 'whitesmoke', color: 'red' }}/> : 
                    <FavoriteBorderIcon onClick={handleWishlist} sx={{position: 'absolute', display: 'inline-block', cursor: 'pointer', padding: '8px',fontSize: '30px',
                    border : 'none', boxShadow : '0px 0px 5px grey', borderRadius : '50%', margin : '7px 7px', background: 'whitesmoke', color: 'grey' }}/>
                }
                
                <img src={product.image} style={{ objectFit: 'cover', height: '250px', width:'100%' }}/>
            </Box>
            <Box sx={{ margin : '0px 5px 0px 5px'}}>
                <Box padding={1} sx={{ height: "95px",}}>
                    <Typography variant='h6'>{product.brand}</Typography>
                    <Typography variant='subtitle1' color={'grey'}>{product.description}</Typography>
                </Box>
                <Box sx={{ position: 'relative', bottom: '15px', padding : '5px' , display : 'flex', justifyContent : 'space-between'}}>
                    { product.ratings && 
                        <StarRatings ratings={product.ratings}/>
                    }
                    <span style={{ fontSize : '20px' , fontWeight : '700'}}>{product.price} <CurrencyRupeeIcon sx={{ fontSize : 'medium'}}/></span>
                </Box>
            </Box>
        </Card>
    </Grid>
  )
}