import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

// const loadUser = createAsyncThunk(
//   'user/loadUser',
//   () => fetch('/auth')
//     .then((response) => response.json())
//     .then((body) => {
//       if (!body.isUser) {
//         throw new Error(body.isUser);
//       }
//       return body.user;
//     }),
// );

const loginUser = createAsyncThunk(
  'user/loginUser',
  (data) => fetch('/auth/login', {
    method: 'post',
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
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const logoutUser = createAsyncThunk(
  'user/logoutUser',
  () => fetch('/auth/logout', {
    method: 'delete',
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.message;
    }),
);

const regUser = createAsyncThunk(
  'user/regUser',
  (data) => fetch('/auth/reg', {
    method: 'post',
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
      if (body.message) {
        throw new Error(body.message);
      }
      return body.user;
    }),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    //   .addCase(loadUser.rejected, (state, action) => {
    //     state.isUser = false
    //   })
    //   .addCase(loadUser.fulfilled, (state, action) => {
    //     state.isUser = true;
    //     state.data = action.payload;
    //   })
      .addCase(loginUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      });
  }
});

export default authSlice;
