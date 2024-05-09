import React from 'react';
import { useFetchOrderHistoryQuery } from '../redux/api';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const OrderHistory = () => {
  const { data: orderHistory, error: orderHistoryError, isLoading: orderHistoryLoading } = useFetchOrderHistoryQuery();

  if (orderHistoryLoading) return <Box sx={{ p: 2, textAlign: 'center' }}>Loading...</Box>;
  if (orderHistoryError) return <Box sx={{ p: 2, textAlign: 'center' }}>Error: {JSON.stringify(orderHistoryError)}</Box>;
  if (!orderHistory || orderHistory.length === 0) return <Box sx={{ p: 2, textAlign: 'center' }}>No Orders Found</Box>;

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
