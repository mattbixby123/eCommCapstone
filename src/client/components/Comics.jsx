import React, { useState } from 'react';
import { useFetchAllComicsQuery } from '../../api_calls/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, List, ListItem, ListItemText, Typography, TextField } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authslice';


const Comics = () => {
  const { data: comicsData, error, isLoading } = useFetchAllComicsQuery();
  const [searchParam, setSearchParam] = useState('');

  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const isLoggedIn = !!token;

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error: {error.message}</div>;

  const comics = comicsData?.comics || [];

  const comicsToDisplay = comics.filter((comic) =>
  comic.title.toLowerCase().includes(searchParam.toLowerCase())
  );
  
    return (
      <Box sx={{ padding: '3rem' }}>
        <Typography variant='h3' gutterBottom>
          Comic Book Catalog
        </Typography>
        <Box sx={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
          <TextField
          variant='outlined'
          placeholder='Search comics...'
          onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          {!isLoggedIn && (  
            <Button 
              variant='contained' 
              color='primary' 
              onClick={() => navigate('/customer/register')}>
              Register Here! 
            </Button>
          )}
          {!isLoggedIn && (
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
          {isLoggedIn && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => navigate('/auth/me')}>
                Profile
            </Button>
          )}
        </Box>
         <List >
          {comicsToDisplay.map(comics => (
            <ListItem 
            key={comics.id} 
            component={Link}
            to={`/comics/${comics.id}`}
            >
              <ListItemText primary={comics.title} sx={{ color: 'black' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
};

export default Comics;
 