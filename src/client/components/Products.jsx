import React, { useState, useEffect } from 'react';
import { useFetchAllProductsQuery } from '../redux/api';
import {  useNavigate } from 'react-router-dom';
import { Button, Box, Paper, Grid, Typography, TextField, styled } from '@mui/material'
import { useSelector } from 'react-redux';
import Pagination from './Pagination';
import { Container } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AllProducts = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const [productsData, setProductsData] = useState(null); // state to hold products data
  
  // function to handle data data update from Pagination component
  const handlePaginationDataUpdate = (data) => {
    setProductsData(data);
  };
  
  // fetch products data
  const { isLoading, error } = useFetchAllProductsQuery();
  console.log(productsData);
  useEffect(() => {
    if (!isLoading && !error) {
      setProductsData(productsData)
    }
  }, [isLoading, error]); // update booksData when isLoading or error changes


  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error Loading Products {error.message}</div>;

  // const products = productsData?.products || [];

  // const productsToDisplay = products.filter((product) =>
  // product.title.toLowerCase().includes(searchParam.toLowerCase())
  // );
  
  return (
    <Container>
      <Box>
        <Typography variant='h3' gutterBottom>
          All Products
        </Typography>
        <TextField
          variant='outlined'
          placeholder='Search all products...'
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          fullWidth
          sx={{ mb: 2 }}
          />
        <Grid container spacing={3}>
          {productsData && productsData.products.map((product) => ( // added .products here so that the paginated products show
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
                <img src={product.imageUrl} alt={product.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
                <Typography variant="h6">{product.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(`api/product/${id}`)}>
                  View Details
                </Button>
                {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
              </Item>
            </Grid>
          ))}
        </Grid>
        <Pagination endpoint="all" onDataUpdate={handlePaginationDataUpdate} />
      </Box>
    </Container>
    );
};

export default AllProducts;
 