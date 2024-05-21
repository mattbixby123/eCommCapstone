import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [SKU, setSKU] = useState('');
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/product', {
        name: productName,
        desc,
        author,
        imageUrl,
        SKU,
        inventory,
        price,
        categoryId
      });

      console.log('Product added:', response.data);
      
      // Reset form fields
      setProductName('');
      setDesc('');
      setAuthor('');
      setImageUrl('');
      setSKU('');
      setInventory('');
      setPrice('');
      setCategoryId('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

   return (
    <FormContainer>
      <Typography variant="h6" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SKU"
              variant="outlined"
              value={SKU}
              onChange={(e) => setSKU(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Inventory"
              variant="outlined"
              type="number"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category ID</InputLabel>
              <Select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                label="Category ID"
                required
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContainer>
  );
};

export default AddProduct;
