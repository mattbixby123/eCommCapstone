import React from 'react';
import { useFetchOrderHistoryQuery, useMeQuery } from '../redux/api';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const OrderHistory = () => {
  const { data: customerDetails, error: customerError, isLoading: customerLoading } = useMeQuery();
  
  if (customerLoading) return <Box>Loading user details...</Box>;
  if (customerError || !customerDetails) return <Box>Error loading customer details</Box>;
  
  const customerId = customerDetails.id;
  
  const { data: orderHistory, error: orderError, isLoading: orderLoading } = useFetchOrderHistoryQuery(customerId);
  
  console.log(`Fetching order history for customer ID: ${customerId}`);

  if (orderLoading) return <Box>Loading order history...</Box>;

  if (orderError && orderError.status === 404) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant='h5'>Order History</Typography>
        <Typography variant='body1'>No orders found for this customer.</Typography>
      </Box>
    );
  }
  
  if (orderError) return <Box>Error: {JSON.stringify(orderError)}</Box>;
  
  if (!orderHistory || orderHistory.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant='h5'>Order History</Typography>
        <Typography variant='body1'>No orders available yet.</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h5' gutterBottom textAlign="center">
        Order History:
      </Typography>
      <List>
        {orderHistory.map((order) => (
          <ListItem key={order.id} divider>
            <ListItemText
              primary={`Order #${order.id}: ${order.itemCount} items`}
              secondary={`Total: $${order.total}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OrderHistory;
