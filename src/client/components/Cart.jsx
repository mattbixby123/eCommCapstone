import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from 'react-router-dom';
import { removeFromCart, clearCart } from "../redux/cartslice";
import { Card, CardContent, CardActions, Button, Typography, Box, Grid } from '@mui/material';
import '../style.css'
import { useFetchCartBySessionQuery, useRemoveFromCartMutation } from "../redux/api";

const Cart = () => {
  const customer = useSelector((state) => state.auth.customer);
  const sessionId = (customer.shoppingSessions[0].id);
  


  const {data: cartProducts, isLoading, error} = useFetchCartBySessionQuery(sessionId);

  const [removeFromCart, useRemoveFromCartMutation] = useState(null)


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(sessionId);
  console.log(cartProducts);



  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
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
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


export default Cart;
