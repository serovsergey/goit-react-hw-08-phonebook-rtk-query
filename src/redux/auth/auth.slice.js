import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state.auth";
// import authOperations from "./operations.auth";

// const setPending = state => {
//   state.isLoading = true;
//   state.error = null;
// }

// const setError = (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
// }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }
    ) => {
      state.user = user
      state.token = token
    },
    unsetCredentials: state => state = initialState,
    setUserInfo: (state, { payload }) => {
      state.user = payload;
    }
  },
})
export const { setCredentials, unsetCredentials, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
