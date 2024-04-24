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
  }
});

export const { setToken, clearToken } = authSlice.actions;
export const selectToken = state => state.auth.token;

export default authSlice.reducer;