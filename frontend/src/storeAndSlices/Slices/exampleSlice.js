import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  examples: [],
};

const authSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    removeMusician: (state, action) => {
      state.examples = state.examples.filter((example) => example.id !== action.payload);
    },
    addMusician: (state, action) => {
      const obj = {
        id: new Date().toISOString(),
        title: action.payload,
      };
      state.examples.push(obj);
    },
  },
});

export default authSlice;
