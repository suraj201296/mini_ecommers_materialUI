import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getProductById } from '../slices/productSlice';
import StarRatings from '../components/products/StarRatings';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CustomInput from '../components/FormComponents/CustomInput';

type paramsProps = {
  id: string;
};

export default function ShowProduct({}) {
  const { id } = useParams<paramsProps>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productDetails = useAppSelector(
    (state) => state.products.productDetails
  );
  const { loading, response, error } = productDetails;
  const [product, setProduct] = useState({
    brand: '',
    category: '',
    color: '',
    image: '',
    description: '',
    ratings: 0,
    price: 0,
  });

  const [pin, setPin] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, []);

  useEffect(() => {
    if (response && response.statusCode === 200) {
      setProduct(response.data);
    }
  }, [response]);

  if (loading) {
    return <div>Loading other data...</div>;
  }

  if (error) {
    return <div>Error fetching other data: {error}</div>;
  }

  const handleChange =(e : React.ChangeEvent<HTMLInputElement>)=> {
    setPin(e.target.value);
  }

  const checkDeliveryAvailable = (pin : string) => {
    setIsAvailable(true);
  }

  const handleCheckDelivery = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkDeliveryAvailable(pin);
  }

  const handleBuyProduct = () => {
    // navigate('/buy-product/${id}');
    navigate('/buy-product', { state: { product } });
  }


  return (
    <Card
      sx={{
        display: 'flex',
        height: `${fullScreen ? '100%' : '100%'}`,
        margin: 3,
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            padding: '10px',
          }}
        >
          <CardMedia
            component='img'
            alt={product.image}
            height='100%'
            image={product.image}
            style={{
              objectFit: 'cover',
              height: '470px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: ' 5px',
            }}
          >
            <Button
              variant='outlined'
              color='info'
              sx={{ width: '48%' }}
              startIcon={<ShoppingCartIcon />}
            >
              Add To Cart
            </Button>
            <Button
              variant='contained'
              color='warning'
              sx={{ width: '50%' }}
              startIcon={<FlashOnIcon />}
              onClick={handleBuyProduct}
            >
              Buy Now
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component='div' variant='h5'>
                {product.brand}
              </Typography>
              <Typography
                variant='subtitle1'
                color='text.secondary'
                component='div'
              >
                {product.description}
              </Typography>
              {product.ratings && <StarRatings ratings={product.ratings} />}

              <Typography
                component='div'
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {product.price}
                <CurrencyRupeeIcon sx={{ fontSize: '20px' }} />
                <Typography
                  variant='subtitle2'
                  color='text.secondary'
                  sx={{ marginLeft: '20px', textDecoration: 'line-through' }}
                >
                  {product.price + 1050}
                </Typography>
                <Typography
                  component='span'
                  color={'green'}
                  sx={{ fontWeight: 'bold', marginLeft: '5px' }}
                >
                  {' '}
                  {Math.round((product.price / (product.price + 1050)) * 100)}%
                  off
                </Typography>
              </Typography>

              <Box>
                <h4>Available Colors </h4>
                <Typography
                  component='span'
                  sx={{
                    border: 'none',
                    height: '30px',
                    width: '30px',
                    display: 'block',
                    borderRadius: '5px',
                    backgroundColor: `${product.color}`,
                    boxShadow: '0px 0px 5px 0px grey',
                  }}
                ></Typography>
              </Box>

              <Box>
                <h4>Coupons for you</h4>
                <SellIcon
                  sx={{ fontSize: '15px', marginRight: '7px', color: 'green' }}
                />
                Partner OfferBuy this product and get upto ₹500 off
                <h4>Available offers</h4>
                <Typography component='p'>
                  <SellIcon
                    sx={{
                      fontSize: '15px',
                      marginRight: '7px',
                      color: 'green',
                    }}
                  />
                  Bank Offer10% off on Bank of Baroda Credit Card and EMI
                  Transactions, up to ₹1500 on orders of ₹5000 and aboveT&C
                </Typography>
                <Typography component='p'>
                  <SellIcon
                    sx={{
                      fontSize: '15px',
                      marginRight: '7px',
                      color: 'green',
                    }}
                  />
                  Bank Offer10% off on Canara Bank Credit Card Transactions, up
                  to ₹1,500 on orders of ₹5,000 and aboveT&C
                </Typography>
                <Typography component='p'>
                  <SellIcon
                    sx={{
                      fontSize: '15px',
                      marginRight: '7px',
                      color: 'green',
                    }}
                  />
                  Bank Offer10% off on Citi-branded Credit Card EMI
                  Transactions, up to ₹2,000 on orders of ₹10,000 and aboveT&C
                </Typography>
              </Box>

                <form onSubmit={handleCheckDelivery} style={{ display: 'flex'}}>
                  <CustomInput label='Delivery' name='pin' id='pin' value={pin} handleChangeEvent={handleChange}/>
                  <Button type='submit' variant='contained' sx={{ height : '50%', top: '25px', left:'15px'}}>Check</Button>
                </form>
                { isAvailable && <span style={{ color: 'green' }}>Available for delivery</span> }
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
