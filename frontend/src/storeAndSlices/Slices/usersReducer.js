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
      return data;
    }
  }
);

export const updateAsyncUsersList = createAsyncThunk(
  'users/searchUsers',
  async (filters) => {
    const response = await fetch('/users/search', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ filters })
    });
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.usersWithExtraStuff;
    }
  }
);

const initialState = {
  users: [],
  instruments: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncUsers.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.instruments = action.payload.instruments;
      })
      .addCase(updateAsyncUsersList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAsyncUsersList.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  }
});

export default usersSlice.reducer;
