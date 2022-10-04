import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  helpMessage: null,
};

const loadUser = createAsyncThunk(
  'user/loadUser',
  (id) => fetch(`/user/${id}`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    }),
);

const addRating = createAsyncThunk(
  'user/addRating',
  (data) => fetch(`/user/${data.id}/rating`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body;
    }),
);




const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRating.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(changeProfile.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(changeProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default userSlice.reducer;

export {
  addRating, loadUser, changeProfile
};
