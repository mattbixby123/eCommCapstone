import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartslice";
import { Card, CardContent, CardActions, Button, Typography, Box, Grid } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { redirect } from "react-router-dom";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.products);
  console.log("Current Cart Products:", cartProducts); 

 
  const bookProducts = cartProducts.filter((product) => product.type === 'book');
  const comicProducts = cartProducts.filter((product) => product.type === 'comic');
  const magazineProducts = cartProducts.filter((product) => product.type === 'magazine');

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const makePayment = async () => {
    const stripe = await loadStripe('pk_test_51PECT8P0XwnQ2xvXxTq35D4lEZkx7dxmdc0VXfKOWYWYuot4x4KgTbPHuV9CrU0FtE8TcYYpdcqBPzsTLqrfJP1c00bbJEW8sP');
    const body = {
      products: cartProducts
    }
    const headers = {
      "Content-Type":"application.json"
    }
    const response = await fetch(`localhost:3000/api/checkout/create-checkout-session`,{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })
    const session = await response.json()
    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })
  }



  const handleClearCart = () => {
    dispatch(clearCart());
  };


  const totalPrice = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartProducts.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {cartProducts.map((product) => (
              <Grid item xs={12} md={6} lg={4} key={product.id}>
                <Card sx={{ bgcolor: 'lightblue', borderRadius: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {product.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {product.type}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Summary:</Typography>
            <Typography>Total Items: {cartProducts.length}</Typography>
            <Typography>Total Cost: ${totalPrice.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
              variant="contained"
              color="warning"
              onClick={makePayment}
              sx={{ bgcolor: 'orange', ':hover': { bgcolor: 'darkorange' } }}
            >
              Checkout
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleClearCart}
              sx={{ bgcolor: 'orange', ':hover': { bgcolor: 'darkorange' } }}
            >
              Clear Cart
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </Box>
  );
};

export default Cart;
