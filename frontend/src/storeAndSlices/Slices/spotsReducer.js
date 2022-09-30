/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAsyncSpots = createAsyncThunk(
  'spots/loadSpots',
  async () => {
    const response = await fetch('/spots');
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.spots;
    }
  }
);

const initialState = {
  spots: [],
  error: null,
};

const spotsSlice = createSlice({
  name: 'spots',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncSpots.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncSpots.fulfilled, (state, action) => {
        state.spots = action.payload;
      });
  }
});

export default spotsSlice.reducer;
