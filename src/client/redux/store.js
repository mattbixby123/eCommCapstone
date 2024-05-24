import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from '../redux/api.js';
import authReducer from './authslice.js';
import cartReducer from './cartslice.js';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),
});

export default store;