/* eslint-disable no-restricted-globals */
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

export const loadAsyncBand = createAsyncThunk(
  'band/loadBand',
  async (id) => {
    const response = await fetch(`/bands/${id}`);
    if (response.status >= 400) {
      const { error } = await response.json();
      throw error;
    } else {
      const data = await response.json();
      return data.band;
    }
  }
);

const initialState = {
  bands: [],
  error: null,
  band: null,
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
      })
      .addCase(loadAsyncBand.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadAsyncBand.fulfilled, (state, action) => {
        state.band = action.payload;
      });
  }
});

export default bandsSlice.reducer;
