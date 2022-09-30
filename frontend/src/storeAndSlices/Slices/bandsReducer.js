/* eslint-disable default-param-last */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAsyncBands = createAsyncThunk(
  'bands/loadBands',
  async () => {
    const response = await fetch('/bands');
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.bands;
    }
  }
);

const initialState = {
  bands: [],
  error: null,
};

const bandsSlice = createSlice({
  name: 'bands',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAsyncBands.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncBands.fulfilled, (state, action) => {
        state.bands = action.payload;
      });
  }
});

export default bandsSlice.reducer;
