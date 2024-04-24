import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../server/api/product';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authslice';


const AllProducts = () => {
  const { data: productsData, error, isLoading } = useFetchAllProductsQuery();
  const [searchParam, setSearchParam] = useState('');

  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  const products = productsData?.products || [];

  const productsToDisplay = products.filter((product) =>
  product.title.toLowerCase().includes(searchParam.toLowerCase())
  );
  
    return (
      <Box sx={{ padding: '3rem' }}>
        <Typography variant='h3' gutterBottom>
          Product Catalog
        </Typography>
        <Box sx={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
          <TextField
          variant='outlined'
          placeholder='Search products...'
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {!isLoggedIn && (  
            <Button 
              variant='contained' 
              color='primary' 
              onClick={() => navigate('/users/register')}>
              Register Here! 
            </Button>
          )}
          {!isLoggedIn && (
            <Button 
              variant='contained' 
              color='secondary' 
              onClick={() => navigate('/users/login')}>
                Login Here!
            </Button>
          )}
          <Button 
            variant='outlined' 
            onClick={() => navigate('/')}>
              Home
          </Button> 
          {isLoggedIn && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate('/users/me')}>
                Profile
            </Button>
          )}
        </Box>
         <List >
          {productsToDisplay.map(products => (
            <ListItem 
            key={products.id} 
            component={Link}
            to={`/productss/${products.id}`}
            >
              <ListItemText primary={products.title} sx={{ color: 'black' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
};

export default AllProducts;
 