import { configureStore } from '@reduxjs/toolkit';
import tempReducer from 'slices/temp';

const store = configureStore({
  reducer: {
    temp: tempReducer,
  },
});

export default store;
