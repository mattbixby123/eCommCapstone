import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useAddToCartMutation, useMeQuery} from '../redux/api';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { addProductToCart } from '../redux/cartslice';


const SingleProduct = () => {
  const { productId } = useParams();
  const {data: customer} = useMeQuery();
  console.log(customer);
  const { data: product, isLoading, error } = useFetchProductByIdQuery(productId);


 

  const [addToCartProduct, { isLoading: isUpdating }] = useAddToCartMutation();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const sessionId = (customer.shoppingSessions[0]).id;
  console.log(sessionId);

  async function handleAddToCartClick(e) {
    e.preventDefault();
    try {
      await addToCartProduct({
        sessionId: parseInt(sessionId), 
        productId: parseInt(productId),
        quantity: 1,
      });
      console.log('Product added to cart successfully');

      dispatch(addProductToCart({
        id: productId,
        name: product.name,
        price: product.price,
        quantity: 1,
        type: 'Product'
      }));
    } catch (error) {
      console.error('Error adding book to cart.', error.message);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2, color: 'black' }}
        onClick={() => window.history.back()}
      >
        Back to All Products
      </Button>
      <div className='single-product'>
        {product && (
          <Card sx={{ backgroundColor: 'lightgrey' }}>
            <CardMedia
              component='img'
              image={product.imageUrl}
              alt={`Cover of ${product.name}`}
              sx={{ width: 'auto', maxHeight: 600, margin: '15px auto' }}
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                {product.name}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                SKU: {product.SKU}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Description: {product.desc}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Number in Stock: {product.inventory}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Price in USD: {product.price}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Category ID: {product.categoryId}
              </Typography>

              {/* Checkout and Add to Cart Button Logic */}
              {product.inventory > 0 ? (
                <Button
                  onClick={handleAddToCartClick}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2, color: 'black' }}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  disabled
                  variant='contained'
                  sx={{ mt: 2, bgcolor: 'grey.500', color: 'white', '$.Mui-disabled': { color: 'white' } }}
                >
                  Unavailable
                </Button>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button variant='outlined' onClick={() => navigate('/')}>
                  Home / All Products
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </div>
    </Box>
  );
};

export default SingleProduct;