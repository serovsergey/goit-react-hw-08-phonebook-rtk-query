import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state.auth";
import authOperations from "./operations.auth";

const setPending = state => {
  state.isLoading = true;
  state.error = null;
}

const setError = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [authOperations.register.pending]: setPending,
    [authOperations.register.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [authOperations.register.rejected]: setError,

    [authOperations.login.pending]: setPending,
    [authOperations.login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [authOperations.login.rejected]: setError,

    [authOperations.logout.pending]: setPending,
    [authOperations.logout.fulfilled]: (state) => {
      state.user = initialState.user;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    [authOperations.logout.rejected]: setError,

    [authOperations.getCurrentUser.pending]: state => {
      setPending(state);
      state.isFetchingCurrentUser = true;
    },
    [authOperations.getCurrentUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.getCurrentUser.rejected]: (state, action) => {
      setError(state, action);
      state.isFetchingCurrentUser = false;
    },
  },
})

export default authSlice.reducer;
