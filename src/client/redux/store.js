import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from '../redux/api.js';
import authReducer from './authslice.js';
import cartReducer from './cartslice.js';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore,  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware),
});

export const persistor = persistStore(store);

export default store;