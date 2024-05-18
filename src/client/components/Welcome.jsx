import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Paper, Grid, Typography, TextField, styled, IconButton, Modal, FormControl, FormGroup, FormControlLabel, Checkbox, Select, InputLabel, MenuItem } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import { useFetchAllProductsQuery } from '../redux/api';
import Categories from './Categories';
import Pagination from "@mui/material/Pagination";
import { addTotalToSession } from '../redux/sessionSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Welcome = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { data: productsData, isLoading, error } = useFetchAllProductsQuery(); 
  const [searchParam, setSearchParam] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(12);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (productsData) {
      setFilteredProducts(productsData.products);
    }
  }, [productsData]);

  const handleSearchChange = (e) => {
    setSearchParam(e.target.value.toLowerCase());
  };

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handlePriceRangeChange = (e) => {
    const { value } = e.target;
    setSelectedPriceRanges((prev) => 
    prev.includes(value)
      ? prev.filter((range) => range !== value)
      : [...prev, value]
    );
  };

   const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((product) => product !== value)
        : [...prev, value]
    );
  };

   const handleFilterApply = () => {
    let filtered = productsData.products;
     console.log("Initial Products:", productsData.products);

    if (searchParam) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchParam)
      );
      console.log("After Search Filter:", filtered);

    }
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPriceRanges.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && product.price <= max;
        });
      });
      console.log("After Price Range Filter:", filtered);

    }

    setFilteredProducts(filtered);
    setFilterOpen(false);
  };

  useEffect(() => {
    if (productsData) {
      let filtered = productsData.products;
      if (searchParam) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchParam)
        );
      }
      setFilteredProducts(filtered);
    }
  }, [searchParam, productsData]);

  useEffect(() => {
    if (productsData) {
      dispatch(addTotalToSession())
    }
  })

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Products {error.message}</div>;

  return (
    <div className='welcome-screen'>
      <Categories />
      <div className='welcome-container'>
        <Typography variant='h3' gutterBottom sx={{ mt:4 }}>
          All Products
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          variant='outlined'
          placeholder='Search all products...'
          onChange={handleSearchChange}
          fullWidth
          // sx={{ mb: 2 }}
          />
          <IconButton onClick={handleFilterOpen} sx={{ m1: 1 }}>
            <FilterList />
          </IconButton>
        </Box>
        <Grid container spacing={3}>
          {filteredProducts.slice((page - 1) * postPerPage, page * postPerPage).map((product) => (
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
            page={page}
            onChange={handlePageChange}
            count={Math.ceil(filteredProducts.length / postPerPage)}
            color="secondary"
            shape="rounded"
            showFirstButton
            showLastButton
            size="small"
            defaultPage={1}
          />
          <Modal
            open={filterOpen}
            onClose={handleFilterClose}
            aria-labelledby='filter-modal-title'
            ara-describedby='filter-modal-description'
          >
            <Box
              sx={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solif #000',
                boxShadow: 24,
                p: 4,
              }}>
                <Typography id='filter-modal-title' variant='h5' component='h2'>
                  Filter by Price 
                </Typography>
                <FormControl variant='outlined' fullWidth sx={{ mt: 2 }}>
                  <FormGroup>
                    {[
                      '0-100',
                      '101-200',
                      '201-300',
                      '301-400',
                      '401-500',
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
        </Box> 
      </div>
    </div>
  );
};

export default Welcome;
