import { configureStore } from "@reduxjs/toolkit";
import { api } from '../redux/api.js';
import authReducer from './authslice.js';


const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
})

export default store;