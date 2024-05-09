import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Paper, Grid, Typography, TextField, styled } from '@mui/material';
import { useFetchAllProductsQuery } from '../redux/api';
import Categories from './Categories';
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Welcome = () => { 
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const { data: productsData, isLoading, error } = useFetchAllProductsQuery(); 
  const [searchParam, setSearchParam] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(9);

  useEffect(() => {
    if (productsData) {
      setFilteredProducts(productsData.products);
    }
  }, [productsData]);

  const handleSearchChange = (e) => {
    setSearchParam(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (productsData) {
      let filtered = productsData.products;
      if (searchParam) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchParam)
        );
      }
      setFilteredProducts(filtered);
    }
  }, [searchParam, productsData]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Products {error.message}</div>;

  return (
    <div className='welcome-screen'>
      <Categories />
      <div className='welcome-container'>
        <Typography variant='h3' gutterBottom>
          All Products
        </Typography>
        <TextField
          variant='outlined'
          placeholder='Search all products...'
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Grid container spacing={3}>
          {filteredProducts.slice((page - 1) * postPerPage, page * postPerPage).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
                <img src={product.imageUrl} alt={product.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
                <Typography variant="h6">{product.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(`/product/${product.id}`)}>
                  View Details
                </Button>
                {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
              </Item>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}> 
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={Math.ceil(filteredProducts.length / postPerPage)}
            color="secondary"
            shape="rounded"
            showFirstButton
            showLastButton
            size="small"
            defaultPage={1}
          />
        </Box> 
      </div>
    </div>
  );
};

export default Welcome;
