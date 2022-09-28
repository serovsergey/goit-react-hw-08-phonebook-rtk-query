import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from '../../services/authAPI';
import { setToken, clearToken } from "services/apiClient";

const register = createAsyncThunk('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authAPI.register(credentials);
    setToken(data.token);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message, status: error.response.status })
  }
})

const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authAPI.login(credentials);
    setToken(data.token);
    return data;
  } catch (error) {
    return rejectWithValue({ message: error.message, status: error.response.status })
  }
})

const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await authAPI.logout();
    clearToken();
  } catch (error) {
    return rejectWithValue({ message: error.message, status: error.response.status })
  }
})

const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().auth;
    if (!token) {
      return rejectWithValue();
    }
    setToken(token);
    const data = await authAPI.getCurrentUser();
    return data;
  } catch (error) {
    clearToken();
    return rejectWithValue({ message: error.message, status: error.response.status })
  }
})

const authOperations = { register, login, logout, getCurrentUser };

export default authOperations;
