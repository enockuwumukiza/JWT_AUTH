import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slice/authSlice';
import { apiSlice } from '../slice/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
