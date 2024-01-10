import { Box, Button, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getAllProducts } from '../slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import SearchInput from '../components/FormComponents/SearchInput';

export type productType = {
  id : number,
  brand : string,
  category : string,
  image : string,
  description : string,
  ratings : number,
  price : number,
};

export default function Dashboard() {
  const productList = useAppSelector((state) => state.products);
  const { response } = productList;
  const dispatch = useAppDispatch();
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.name);
      dispatch(getAllProducts());
    }
  }, []);

  useEffect(() => {
    if (response && response.statusCode === 200) {
        setProducts(response.data);
    }
  }, [response]);

  const handleSearch = (searchItem:  string) => {
      console.log(searchItem);
  };
  

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} mt={3} alignItems={'center'}>
        <SearchInput handleSearch={handleSearch}/>
      </Box>
      { products &&
          <Grid container spacing={3} padding={3}>
              {products.map((product : productType, index) => (
                  <ProductCard key={index} product={product}/>
              ))}
          </Grid>
      }
    </>
  );
}
