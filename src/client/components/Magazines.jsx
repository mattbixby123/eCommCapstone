import React, { useState, useEffect } from 'react';
import { useFetchAllMagazinesQuery } from '../redux/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled} from '@mui/material'
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authslice';
import { Container } from '@mui/system';
import '../style.css';
import Pagination from './Pagination';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Magazines = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const [magazinesData, setMagazinesData] = useState(null); // State to hold magazines data

  // Function to handle data update from Pagination component
  const handlePaginationDataUpdate = (data) => {
    setMagazinesData(data);
  };

  // Fetch magazines data
  const { isLoading, error } = useFetchAllMagazinesQuery();

  useEffect(() => {
    if (!isLoading && !error) {
      setMagazinesData(magazinesData);
    }
  }, [isLoading, error]); // Update magazinesData when isLoading or error changes


  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error Loading Magazines</div>;
    return (
       <Container>
    <Box>
      <Typography variant='h3' gutterBottom>
        Magazine Catalog
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Search magazines...'
        onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
        fullWidth
        sx={{ mb: 2 }}
        />
      <Grid container spacing={3}>
        {magazinesData && magazinesData.magazines.map((magazine) => ( // added .magazines here to show paginated magazines
          <Grid item xs={12} sm={6} md={4} lg={3} key={magazine.id}>
            <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}> 
              <img src={magazine.imageUrl} alt={magazine.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
              <Typography variant="h6">{magazine.name}</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/product/magazines/${magazine.id}`)}>
                View Details
              </Button>
              {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
            </Item>
          </Grid>
        ))}
      </Grid>
      <Pagination endpoint="magazines" onDataUpdate={handlePaginationDataUpdate} />
    </Box>
  </Container>
    );
};

export default Magazines;
 