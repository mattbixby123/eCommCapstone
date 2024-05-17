import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [SKU, setSKU] = useState('');
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/product', {
        name: productName,
        desc,
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
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <label>
        SKU:
        <input
          type="text"
          value={SKU}
          onChange={(e) => setSKU(e.target.value)}
        />
      </label>
      <label>
        Inventory:
        <input
          type="number"
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
      </label>
      <label>
        Category ID:
        <input
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
