import React, { useEffect, useState } from 'react';
import { useFetchAllProductsQuery } from '../redux/api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled, IconButton, Modal, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Container } from '@mui/system';
import Pagination from '@mui/material/Pagination'; 
import { FilterList } from '@mui/icons-material';

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
  const [booksData, setBooksData] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12); 
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const { data: fetchedProductsData, isLoading, error } = useFetchAllProductsQuery();

  useEffect(() => {
    console.log("Fetched Products Data:", fetchedProductsData);

    if (!isLoading && !error && fetchedProductsData) {
      const books = fetchedProductsData.products.filter(products => products.categoryId === 2);
      console.log("Books Data:", books);

      setBooksData({ products: books });
    }
  }, [isLoading, error, fetchedProductsData]);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchParam(e.target.value.toLowerCase());
  };

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handlePriceRangeChange = (e) => {
    const { value } = e.target;
    setSelectedPriceRanges((prev) =>
      prev.includes(value) ? prev.filter((range) => range !== value) : [...prev, value]
    );
  };

  const handleFilterApply = () => {
    let filtered = booksData.products;

    if (searchParam) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(searchParam)
      );
    }
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((book) => {
        return selectedPriceRanges.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return book.price >= min && book.price <= max;
        });
      });
    }
    setBooksData({ products: filtered });
    setFilterOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Books</div>;

  const filteredBooks = booksData ? booksData.products.filter(book => book.name.toLowerCase().includes(searchParam)) : [];

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredBooks.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container>
      <Box>
        <Typography variant='h3' gutterBottom>
          Book Catalog
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            variant='outlined'
            placeholder='Search books...'
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 2 }}
            />
            <IconButton onClick={handleFilterOpen} sx={{ m1:1 }}>
              <FilterList />
            </IconButton>
        </Box>
        <Grid container spacing={3}>
          {currentPosts.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}>
                <img src={book.imageUrl} alt={book.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
                <Typography variant="h6">{book.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate(`/product/${book.id}`)}>
                  View Details
                </Button>
                {token && <Typography sx={{ mt: 1 }} variant="body2">In Stock</Typography>}
              </Item>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredBooks.length / postPerPage)}
            color="primary"
            onChange={handlePageChange}
            page={currentPage}
          />
        </Box>
      </Box>
      <Modal
        open={filterOpen}
        onClose={handleFilterClose}
        aria-labelledby='filter-modal-title'
        aria-describedby='filter-modal-description'  
      >
        <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id='filter-modal-title' variant='h5' component='h2'>
            Filter By Price
          </Typography>
          <FormControl variant='outlined' fullWidth sx={{ mt: 2 }}>
            <FormGroup>
              {[
                '0-100',
                '101-200',
                '201-300',
                '301-400',
                '401-500'
              ].map((range) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPriceRanges.includes(range)}
                      onChange={handlePriceRangeChange}
                      value={range}
                    />
                  }
                  label={`$${range}`}
                  key={range}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={handleFilterClose} sx={{ mr: 2 }}>Cancel</Button>
            <Button variant='contained' color='primary' onClick={handleFilterApply}>Apply Filters</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default AllBooks;
