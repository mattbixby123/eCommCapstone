import React from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { useFetchMagazinesByIdQuery, useAddToCartMutation } from '../redux/api';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SingleMagazine= () => {
  const { productId } = useParams();
  const sessionId = useSelector((state) => state.auth.sessionId);
  const { data: magazine, error, isLoading } = useFetchMagazinesByIdQuery(productId);
  const [addToCart, { isLoading: isUpdating }] = useAddToCartMutation();
  const navigate = useNavigate();

  async function handleAddToCartClick(e) {
    e.preventDefault();
    try {
      await addToCart({
        sessionId: parseInt(sessionId), 
        productId: parseInt(productId),
        quantity: 1,
      });
      location.reload();
      console.log('Magazine added to cart successfully');

    } catch (error) {
      console.error('Error adding magazine to cart.', error.message);
    }
  }

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon/>}
        sx={{ mb: 2, color: 'black' }}
        onClick={() => window.history.back()}
        >
        Back to Magazines
      </Button>
      {magazine && (
        <Card sx={{ backgroundColor: 'lightgrey'}}>
          <CardMedia
          component='img'
          image={magazine.imageUrl}
          alt={`Cover of ${magazine.name}`}
          sx={{ width: 'auto', maxHeight: 600, margin: '15px auto' }}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {magazine.name}
            </Typography>
            <Typography variant='body2'color='text.secondary'>
              SKU: {magazine.SKU}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Description: {magazine.desc}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Number in Stock: {magazine.inventory}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Price in USD: {magazine.price}
            </Typography>
            {magazine.inventory > 0 ? (
              <Button onClick={handleAddToCartClick} variant='contained' color='primary' sx={{ mt: 2, color: 'black' }}>
                Add to Cart
              </Button>
            ) : (
              <Button disabled variant='containted' sx={{ mt: 2, bgcolor: 'grey.500', color: 'white', '$.Mui-disabled': { color: 'white' }}}>
                Unavailable
              </Button>
            )}
          </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant='outlined' onClick={() => navigate('/')} sx={{ mr: 1 }}>Home</Button>
          <Button variant='outlined' onClick={() => navigate('/magazines')}>Magazines</Button>
        </Box>
        </Card>
      )}
    </Box>
  );
};

export default SingleMagazine;