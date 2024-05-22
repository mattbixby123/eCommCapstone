import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchComicsByIdQuery, useAddToCartMutation } from '../redux/api';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { addProductToCart } from '../redux/cartslice';

const SingleComic = () => {
  const { comicId } = useParams();
  const customer = useSelector((state) => state.auth.customer);
  const sessionId = (customer.shoppingSessions[0]).id;
  const { data: comic, error, isLoading } = useFetchComicsByIdQuery(comicId);
  const [addToCart, { isLoading: isUpdating }] = useAddToCartMutation();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  async function handleAddToCartClick(e) {
    e.preventDefault();
    try {
      await addToCart({
        sessionId: parseInt(sessionId),
        productId: parseInt(comicId),
        quantity: 1,
      });
      console.log('Comic added to cart successfully');
      
    //   dispatch(addProductToCart({
    //   id: comicId,
    //   name: comic.name,
    //   price: comic.price,
    //   quantity: 1,
    //   type: 'Comic'
    // }));
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
        Back to Comics
      </Button>

      {comic && (
        <Card sx={{ backgroundColor: 'lightgrey' }}>
          <CardMedia
            component='img'
            image={comic.imageUrl}
            alt={`Cover of ${comic.name}`}
            sx={{ width: 'auto', maxHeight: 600, margin: '15px auto' }}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {comic.name}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              SKU: {comic.SKU}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Description: {comic.desc}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Number in Stock: {comic.inventory}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Price in USD: {comic.price}
            </Typography>

            {/* Only show "Add to Cart" if the token exists and the comic is available */}
            {comic.inventory > 0 ? (
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
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
            <Button variant='outlined' onClick={() => navigate('/')} sx={{ mr: 1 }}>Home</Button>
            <Button variant='outlined' onClick={() => navigate('/comics')}>Comics</Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default SingleComic;
