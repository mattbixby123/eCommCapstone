import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartslice";
import { Card, CardContent, CardActions, Button, Typography, Box, Grid } from '@mui/material';

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

  const handleClearCart = () => {
    dispatch(clearCart());
  };

   return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartProducts.length > 0 ? (
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
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
      {cartProducts.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClearCart}
            sx={{ bgcolor: 'orange', ':hover': { bgcolor: 'darkorange' } }}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;