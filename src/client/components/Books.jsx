import React, { useState } from 'react';
import { useFetchAllBooksQuery } from '../../api_calls/api';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid } from '@mui/material'
import '../style.css';
// import { selectToken } from '../redux/authslice';


function AllBooks() {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const { data, error, isLoading } = useFetchAllBooksQuery();
  console.log(data);

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error Loading Books</div>
 
  
  return (
    <Box className="main-content">
      <Typography variant='h3' gutterBottom>
        Book Catalog
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Search books...'
        onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Grid container spacing={3}>
        {data && data.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Box sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px', textAlign: 'center' }}>
              <img src={book.imageUrl} alt={book.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
              <Typography variant="h6">{book.name}</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/${book.id}`)}>
                View Details
              </Button>
              {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
 
  export default AllBooks;