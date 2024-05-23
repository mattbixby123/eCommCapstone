import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

/* useNavigate to refresh the page after an item has been removed from the cart does not seem to work, all instances of useNavigate have been commented out, consider other possible solutions to refresh */
// import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent, CardActions, Button, Typography, Box, Grid } from '@mui/material';
import '../style.css'
import { useFetchCartBySessionQuery, useRemoveFromCartMutation, useRemoveShoppingSessionMutation } from "../redux/api";

const Cart = () => {
  
  const location1 = useLocation();
  const params = new URLSearchParams(location1.search);
  const message = params.get('message');
  
  const sessionId = useSelector((state) => state.auth.sessionId)
  const {data: cartProducts, isLoading, error} = useFetchCartBySessionQuery(sessionId);
  const [removeFromCart, { isLoading: isUpdating}] = useRemoveFromCartMutation();
  const [removeShoppingSession] = useRemoveShoppingSessionMutation();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(sessionId);
  console.log(cartProducts);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  async function handleRemoveFromCart(id) {

    try {
      await removeFromCart({
        id: parseInt(id)
      })
      location.reload();

      // navigate('/cart')


    } catch(error) {
      console.error('Error removing item from cart:', error.message);
    }
  };


  async function handleClearCart() {

    try {
      await removeShoppingSession({
        sessionId: parseInt(sessionId)
      })
      location.reload();


    } catch(error) {
      console.error('Error removing items from cart:', error.message);
    }
    // dispatch(clearCart());
  };
  
  const handleProceedToCheckout = () => {
    fetch('api/checkout/create-checkout-session', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cartProducts })
    }).then(res => {
      if (res.ok) return res.json()
    }).then(({ url }) => {
      window.location = url
    }).catch(e => {
      console.error(e.error);
    })
    // dispatch(proceedToCheckout());
  };


  const totalPrice = cartProducts.reduce((sum, product) => sum + product.product.price * product.quantity, 0);


  return (
    <Box className='cart-container'>
      {message && <p>{message}</p>}
      <Typography variant="h4" className="cart-header">
        Shopping Cart
      </Typography>
      <Box className='cart-page'>
        <Box className="card-items-cart">
          {cartProducts.map((product) => (
            <Box key={product.product.id}>
              <Card sx={{
                bgcolor: 'lightgrey',
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '250px',
                margin: 2, 
                maxWidth: '300px'
              }}>
                <CardContent>
                  <Typography gutterBottom variant="h6">{product.product.name}</Typography>
                  <Typography variant="body2">Price: ${product.product.price}</Typography>
                  <Typography variant="body2">Quantity: {product.quantity}</Typography>
                  <Typography variant="body2">Category ID: {product.product.categoryId}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
        <Box className='cart-summary'>
          <Typography variant="h5">Summary:</Typography>
          <Typography>Total Items: {cartProducts.length}</Typography>
          <Typography>Total Cost: ${totalPrice.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleProceedToCheckout}
          >
            Proceed To Checkout
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 1 }}
            onClick={() => handleClearCart(sessionId)}
          >
            Clear Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


export default Cart;
