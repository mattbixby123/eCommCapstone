import React, { useEffect, useState } from 'react';
import { useFetchAllProductsQuery } from '../redux/api';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled} from '@mui/material'
import { useSelector } from 'react-redux';
import '../style.css';
import { Container } from '@mui/system';
import Pagination from '@mui/material/Pagination';

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
  const [comicsData, setComicsData] = useState(null); // state to hold comics data
  const [currentPage, setCurrentPage] = useState(1); // State to hold current page number
  const [postPerPage] = useState(12); // Number of items per page

  // fetch all products data
  const { data: fetchedProductsData, isLoading, error } = useFetchAllProductsQuery();

  useEffect(() => {
    console.log("Fetched Products Data:", fetchedProductsData);

    if (!isLoading && !error && fetchedProductsData) {
      // Filter products based on the category ID for books
      const comics = fetchedProductsData.products.filter(products => products.categoryId === 1);
      console.log("Comics Data:", comics);

      setComicsData({ products: comics });
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
  if (error) return <div>Error Loading Comics</div>;

  // Filter comics based on search parameter
  const filteredComics = comicsData ? comicsData.products.filter(comic =>
    comic.name.toLowerCase().includes(searchParam)
  ) : [];

  // Calculate the index of the first and last items on the current page
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredComics.slice(indexOfFirstPost, indexOfLastPost);

  
    return (
  <Container>
    <Box>
      <Typography variant='h3' gutterBottom>
        Comic Catalog
      </Typography>
      <TextField
        variant='outlined'
        placeholder='Search comics...'
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2 }}
        />
      <Grid container spacing={3}>
        {currentPosts.map((comic) => ( // added .comics here so that the paginated comics would show
          <Grid item xs={12} sm={6} md={4} lg={3} key={comic.id}>
            <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}> 
              <img src={comic.imageUrl} alt={comic.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
              <Typography variant="h6">{comic.name}</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/product/comics/${comic.id}`)}>
                View Details
              </Button>
            
              {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
            </Item>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredComics.length / postPerPage)}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
    </Box>
  </Container>
  );
};

export default Comics;
 