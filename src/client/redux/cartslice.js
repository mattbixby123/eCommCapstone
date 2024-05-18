import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
        console.log("Action Paylod", action.payload)
        
      const { id, name, price, quantity, type } = action.payload;

      const existingProduct = state.products.find
      (product => product.id === id && product.type === type);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({ id, name, price, quantity, type });
      }
        console.log("Updated Cart State:", state.products);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter
      (product => product.id !== action.payload);
    },

    clearCart: (state) => {
      state.products = [];
    },
    setCart: (state, action) => {
      state.products = action.payload;
    }
  },
});

export const { addProductToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
