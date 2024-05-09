/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { useFetchBooksByIdQuery, useAddToCartBookMutation } from '../redux/api';
import AddToCart from './AddToCart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const SingleBook= () => {
  const { bookId } = useParams();
  const { data: book, error, isLoading, refetch } = useFetchBooksByIdQuery(bookId);
<<<<<<< Updated upstream
  const [addToCart, { isLoading: isUpdating, data}] = useAddToCartBookMutation();
=======
  const [addToCartBook, { isLoading: isUpdating, data}] = useAddToCartBookMutation();
>>>>>>> Stashed changes
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  async function handleAddToCartClick(e) {
    e.preventDefault();
    try{
      await addToCartBook({
        sessionId: 1,
        productId: parseInt(bookId),
        quantity: 1,
      })
      console.log('Book added to cart successfully');
    } catch (error) {
      console.error('Error adding book to cart.', error.message)
    }}

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon/>}
        sx={{ mb: 2, color: 'black' }}
        onClick={() => window.history.back()}
        >
        Back to Books
      </Button>
      {book && (
        <Card sx={{ backgroundColor: 'lightgrey'}}>
          <CardMedia
          component='img'
          image={book.imageUrl}
          alt={`Cover of ${book.name}`}
          sx={{ width: 'auto', maxHeight: 600, margin: '15px auto' }}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {book.name}
            </Typography>
            <Typography variant='body2'color='text.secondary'>
              SKU: {book.SKU}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Description: {book.desc}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Number in Stock: {book.inventory}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Price in USD: {book.price}
            </Typography>
<<<<<<< Updated upstream
            {token && book.book.available ? (
              <Button onClick={handleAddToCartClick} variant='contained' color='primary' sx={{ mt: 2, color: 'black' }}>
                Checkout
=======
            <Typography variant='body2' color='text.secondary'>
              Number in Stock: {book.inventory}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Price in USD: {book.price}
            </Typography>
            {
            // token && 
            book.inventory > 0 ? (
              <Button 
              onClick={handleAddToCartClick} 
              variant='contained' 
              color='primary' 
              sx={{ mt: 2, color: 'black' }}>
                Add To Cart
>>>>>>> Stashed changes
              </Button>
            ) : (
              <Button 
              disabled variant='containted' 
              sx={{ mt: 2, bgcolor: 'grey.500', color: 'white', '$.Mui-disabled': { color: 'white' }}}>
                Unavailable
              </Button>
            )}
          </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant='outlined' onClick={() => navigate('/')} sx={{ mr: 1 }}>Home</Button>
          <Button variant='outlined' onClick={() => navigate('/books')}>Books</Button>
        </Box>
        </Card>
      )}
    </Box>
  );
};

export default SingleBook;