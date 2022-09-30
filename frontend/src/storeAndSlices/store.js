import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './Slices/exampleSlice';
import usersReducer from './Slices/usersReducer';
import bandsReducer from './Slices/bandsReducer';
import spotsReducer from './Slices/spotsReducer';
import authReducer from './Slices/authReducer';

// формирование контейнера состояний (store)
export default configureStore({
  reducer: {
    auth: exampleSlice,
    usersState: usersReducer,
    bandsState: bandsReducer,
    spotsState: spotsReducer,
    authState: authReducer,
  }
});
