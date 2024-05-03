import React, { useState } from 'react';
import { useFetchAllComicsQuery } from '../redux/api';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled} from '@mui/material'
import { useSelector } from 'react-redux';
import '../style.css';
import { Container } from '@mui/system';
// import { selectToken } from '../redux/authslice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Comics = () => {
 const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const { data: comicsData, error, isLoading } = useFetchAllComicsQuery();
  console.log(comicsData);

  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error Loading Comics</div>;

  
    return (
  <Container>
    <Box>
      <Typography variant='h3' gutterBottom>
        Comic Catalog
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Search comics...'
        onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
        fullWidth
        sx={{ mb: 2 }}
        />
      <Grid container spacing={3}>
        {comicsData && comicsData.comics.map((comic) => ( // added .comics here so that the paginated comics would show
          <Grid item xs={12} sm={6} md={4} lg={3} key={comic.id}>
            <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}> 
              <img src={comic.imageUrl} alt={comic.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
              <Typography variant="h6">{comic.name}</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/comics/${comic.id}`)}>
                View Details
              </Button>
            
              {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Container>
  );
};

export default Comics;
 