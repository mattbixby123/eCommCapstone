import React, { useEffect, useState } from 'react';
import { useFetchAllProductsQuery } from '../redux/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled } from '@mui/material';
import { Container } from '@mui/system';
import Pagination from '@mui/material/Pagination'; // Import MUI Pagination component

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AllBooks() {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const [booksData, setBooksData] = useState(null); // State to hold books data
  const [currentPage, setCurrentPage] = useState(1); // State to hold current page number
  const [postPerPage] = useState(9); // Number of items per page

  // Fetch all products data
  const { data: fetchedProductsData, isLoading, error } = useFetchAllProductsQuery();

  useEffect(() => {
    console.log("Fetched Products Data:", fetchedProductsData);

    if (!isLoading && !error && fetchedProductsData) {
      // Filter products based on the category ID for books
      const books = fetchedProductsData.products.filter(products => products.categoryId === 2);
      console.log("Books Data:", books);

      setBooksData({ products: books });
    }
  }, [isLoading, error, fetchedProductsData]);

  // Function to handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Books</div>;

  // Calculate the index of the first and last items on the current page
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = booksData ? booksData.products.slice(indexOfFirstPost, indexOfLastPost) : [];

  return (
    <Container>
      <Box>
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
          {currentPosts.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
                <img src={book.imageUrl} alt={book.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
                <Typography variant="h6">{book.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(`/product/books/${book.id}`)}>
                  View Details
                </Button>
                {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
              </Item>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil((booksData ? booksData.products.length : 0) / postPerPage)}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default AllBooks;
