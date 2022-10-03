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
  async ({ filters, filtersGenre, orderByRating, orderByName, inputText }) => {
    const response = await fetch('/users/search', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ filters, filtersGenre, orderByRating, orderByName, inputText })
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
  user: null,
  users: [],
  instruments: [],
  genres: [],
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
        state.users = action.payload.usersWithExtraStuff;
        state.instruments = action.payload.instruments;
        state.genres = action.payload.genres;
      })
      .addCase(updateAsyncUsersList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAsyncUsersList.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  }
});

export const { findUser } = usersSlice.actions;
export default usersSlice.reducer;
