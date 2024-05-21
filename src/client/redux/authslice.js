import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? localStorage.getItem('authToken') || '': '',
  },
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      localStorage.setItem('authToken', token);
      state.token = token;
    },
    clearToken: (state) => {
      localStorage.removeItem('authToken');
      state.token = '';
    },
    setCustomer: (state, action) => {
      const customer = action.payload;
      state.customer = customer;
    }
  }
});

export const { setToken, clearToken, setCustomer } = authSlice.actions;
export const selectToken = state => state.auth.token;
export const selectCustomer = state => state.auth.customer;

export default authSlice.reducer;