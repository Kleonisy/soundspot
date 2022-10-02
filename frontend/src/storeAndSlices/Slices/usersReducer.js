/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAsyncUsers = createAsyncThunk(
  'users/loadUsers',
  async () => {
    const response = await fetch('/users');
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.users;
    }
  }
);

const initialState = {
  user: null,
  users: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    findUser: (state, action) => {
      state.user = state.users.find((user) => user.id === Number(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  }
});

export const { findUser } = usersSlice.actions;
export default usersSlice.reducer;
