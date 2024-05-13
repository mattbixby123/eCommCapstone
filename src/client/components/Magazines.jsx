import React, { useState, useEffect } from 'react';
import { useFetchAllProductsQuery } from '../redux/api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled} from '@mui/material'
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/authslice';
import { Container } from '@mui/system';
import '../style.css';
import Pagination from '@mui/material/Pagination';


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
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(9);

  // Fetch magazines data
  const { data: fetchedProductsData, isLoading, error } = useFetchAllProductsQuery();

  useEffect(() => {
    if (!isLoading && !error && fetchedProductsData) {
      // Filter products based on the category ID for magazines
      const magazines = fetchedProductsData.products.filter(products => products.categoryId === 3);
      console.log("Magazines Data:", magazines);

      setMagazinesData({ products: magazines });
    }
  }, [isLoading, error, fetchedProductsData]);

  // Function to handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
   // Function to handle search input change
   const handleSearchChange = (e) => {
    setSearchParam(e.target.value.toLowerCase());
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Magazines</div>;

  // Filter books based on search parameter
  const filteredMagazines = magazinesData ? magazinesData.products.filter(magazine => magazine.name.toLowerCase().includes(searchParam)) : [];
  if(isLoading) return <div>Loading...</div>;
  if(error) return <div>Error Loading Magazines</div>;

  // Calculate the index of the first and last items on the current page
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredMagazines.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <Container>
      <Box>
        <Typography variant='h3' gutterBottom>
          Magazine Catalog
        </Typography>
        <TextField
          variant='outlined'
          placeholder='Search magazines...'
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Grid container spacing={3}>
        {currentPosts.map((magazine) => ( 
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
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredMagazines.length / postPerPage)}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
    </Box>
  </Container>
    );
};

export default Magazines;
 