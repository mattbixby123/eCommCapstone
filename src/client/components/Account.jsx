import React, { useState } from "react";
import {useMeQuery} from '../redux/api';
import {Typography, Button, Box, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { data: customerDetails, error, isLoading } = useMeQuery();
  const navigate = useNavigate();

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {JSON.stringify(error)}</div>;
  if(!customerDetails) return <div>No Customer Data Found</div>

  const customerId = customerDetails.id;
    
    return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        width: '100%',
        p: 4
      }}
    >
      
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', p: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to Homepage
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 600,
          p: 4,
          borderRadius: 2,
          boxShadow: 3, 
          backgroundColor: 'background.paper'
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom textAlign='center'>
              Welcome {customerDetails.firstName}!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5' gutterBottom textAlign='center'>
              Account Details:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign='center'>
              Name: {`${customerDetails.firstName} ${customerDetails.lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign='center'>Username: {customerDetails.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign='center'>Email: {customerDetails.email}</Typography>
          </Grid>
          <Grid item xs={12} textAlign='center'>
            <Button
              variant='outlined'
              onClick={() => navigate(`/orderdetail/${customerId}`)}
              sx={{ mt: 2 }}
            >
              View Order History
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};


export default Account;
