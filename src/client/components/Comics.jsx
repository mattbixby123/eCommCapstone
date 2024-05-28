import React, { useEffect, useState } from 'react';
import { useFetchAllProductsQuery } from '../redux/api';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, TextField, Grid, Paper, styled, IconButton, Modal, FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useSelector } from 'react-redux';
import '../style.css';
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

const Comics = () => {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState('');
  const [comicsData, setComicsData] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [postPerPage] = useState(12); 
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const { data: fetchedProductsData, isLoading, error } = useFetchAllProductsQuery();

  useEffect(() => {
    console.log("Fetched Products Data:", fetchedProductsData);

    if (!isLoading && !error && fetchedProductsData) {
      const comics = fetchedProductsData.products.filter(products => products.categoryId === 1);
      console.log("Comics Data:", comics);

      setComicsData({ products: comics });
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
    let filtered = comicsData.products;

    if (searchParam) {
      filtered = filtered.filter((comic) =>
        comic.name.toLowerCase().includes(searchParam)
      );
    }
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((comic) => {
        return selectedPriceRanges.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return comic.price >= min && comic.price <= max;
        });
      });
    }
    setComicsData({ products: filtered });
    setFilterOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Comics</div>;

  const filteredComics = comicsData ? comicsData.products.filter(comic =>
    comic.name.toLowerCase().includes(searchParam)
  ) : [];

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filteredComics.slice(indexOfFirstPost, indexOfLastPost);

  
    return (
  <Container>
    <Box>
      <Typography variant='h3' gutterBottom>
        Comic Catalog
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          variant='outlined'
          placeholder='Search comics...'
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 2 }}
          />
          <IconButton onClick={handleFilterOpen} sx={{ m1:1 }}>
            <FilterList />
          </IconButton>
      </Box>
      <Grid container spacing={3}>
        {currentPosts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Item sx={{ border: '1px solid #ccc', p: 2, borderRadius: '8px' }}> 
              <img src={product.imageUrl} alt={product.name} width="100%" style={{ maxHeight: '200px', marginBottom: '20px' }} />
              <Typography variant="h6">{product.name}</Typography>
              <Button variant="contained" color="primary" onClick={() => navigate(`/product/${product.id}`)}>
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
};

export default Comics;
 