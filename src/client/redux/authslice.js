import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? localStorage.getItem('authToken') || '': '',
    customer: null,
    sessionId: null,
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
    },
    clearCustomer: (state) => {
      state.customer = null
    },
    setSessionId: (state, action) => {
      const sessionId = action.payload;
      state.sessionId = sessionId;
    },
    // clearSessionId: (state, action) => {
    //   state.sessionId = null
    // }
  }
});

export const { setToken, clearToken, setCustomer, clearCustomer, setSessionId } = authSlice.actions;
export const selectToken = state => state.auth.token;
export const selectCustomer = state => state.auth.customer;
export const selectSessionId = state => state.auth.sessionId;

export default authSlice.reducer;