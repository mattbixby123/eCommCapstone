import React, { useState } from 'react';
import { useFetchAllBooksQuery } from '../../api_calls/api';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material'
// import { selectToken } from '../redux/authslice';


function AllBooks() {
  const token = useSelector(state => state.auth.token);

  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useState('');
  
  const { data, error, isLoading } = useFetchAllBooksQuery();
  console.log(data);
  // const isLoggedIn = !!token;

  if(isLoading) return <div>Loading...</div>;
  // if(error) return <div>Error: {error.message}</div>;

  // const bookstoDisplay = searchParam
  //   ? data.filter((data) => 
  //         data.name.toLowerCase().includes(searchParam))
  //   : data;

  // const books = booksData?.books || [];

  // const booksToDisplay = books.filter((book) =>
  // book.title.toLowerCase().includes(searchParam.toLowerCase())
  // );
  
    return (
      <Box sx={{ padding: '3rem' }}>
        <Typography variant='h3' gutterBottom>
          Book Catalog
        </Typography>
        <Box sx={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
          <TextField
          variant='outlined'
          placeholder='Search books...'
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {token && (  
            <Button 
              variant='contained' 
              color='primary' 
              onClick={() => navigate('/customer/register')}>
              Register Here! 
            </Button>
          )}
          {token && (
            <Button 
              variant='contained' 
              color='secondary' 
              onClick={() => navigate('/customer/login')}>
                Login Here!
            </Button>
          )}
          <Button 
            variant='outlined' 
            onClick={() => navigate('/')}>
              Home
          </Button> 
          {token && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate('/customer/me')}>
                Profile
            </Button>
          )}
        </Box>
         <List >
         {/* {booksToDisplay.map((data) => {
            return (
              <Grid item xs={4}>
                <Item>
                  <div 
                  key={data.id}
                  className="book-item"
                  onClick={(e) => navigate(`/${data.id}`)}>
                  <h3 
                  key={data.id}
                  className="title"
                  >{data.name}</h3>
                  <img src={data.imageUrl} alt={data.name} width={200} />
                  {(token) && <h6>*Available for Checkout</h6>}
                  </div>
                </Item>
              </Grid>
            )
          })} */}
        </List>
      </Box>
    );
};

export default AllBooks;
 