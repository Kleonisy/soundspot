import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {
    id: null,
    email: null,
    login: null,
    password: null,
    about: null,
    latitude: null,
    longitude: null,
    contact: null,
    photo: null,
  },
  isUser: null,
  helpMessage: null,
  error: null,
};

const loadUser = createAsyncThunk(
  'user/loadUser',
  () => fetch('/auth')
    .then((response) => response.json())
    .then((body) => {
      if (!body.isUser) {
        throw new Error(body.isUser);
      }
      return body.user;
    }),
);

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
    disableHelpMessage: (state) => {
      state.helpMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.rejected, (state, action) => {
        state.isUser = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      })
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
        state.isUser = false;
        state.data = {
          id: null,
          email: null,
          login: null,
          password: null,
          about: null,
          latitude: null,
          longitude: null,
          contact: null,
          photo: null,
        };
      })
      .addCase(regUser.rejected, (state, action) => {
        state.helpMessage = action.error.message;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default authSlice.reducer;

// Экспорт action creator-функций
export const { disableHelpMessage } = authSlice.actions;

// Экспорт action creator-функций (thunk)
export {
  // loadUser,
  loginUser, logoutUser, regUser
};
