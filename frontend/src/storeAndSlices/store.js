import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './Slices/exampleSlice';

// формирование контейнера состояний (store)
export default configureStore({
  reducer: {
    auth: exampleSlice,
  }
});
