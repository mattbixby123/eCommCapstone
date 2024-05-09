import { configureStore } from "@reduxjs/toolkit";
import { api } from '../../api_calls/api.js';
import authReducer from './authslice.js';
import cartReducer from './cartslice.js'


const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})

export default store;