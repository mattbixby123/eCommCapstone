import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const FilterComponent = ({ minPrice, maxPrice, category, setMinPrice, setMaxPrice, setCategory }) => {
  return(
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <FormControl variant='outlined' sx={{ m: 1, minWidth: 120 }}>
        <TextField
          label='Min Price'
          variant='outlined'
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          />
      </FormControl>
      <FormControl variant='outlined' sx={{ m: 1, minWidth: 120 }}>
        <TextField
          label='Max Price'
          variant='outlined'
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          />
      </FormControl>
      <FormControl variant='outlined' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label='Category'
          >
            <MenuItem value=''><em>All</em></MenuItem>
            <MenuItem value='book'><em>Book</em></MenuItem>
            <MenuItem value='comic'><em>Comic</em></MenuItem>
            <MenuItem value='magazine'><em>Magazine</em></MenuItem>
          </Select>
      </FormControl>
    </Box>
  );
};

export default FilterComponent;

