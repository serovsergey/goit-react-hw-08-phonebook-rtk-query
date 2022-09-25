import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../services/contactsAPI';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.fetchAllContacts()
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (item, { rejectWithValue }) => {
    try {
      const response = await API.addContact(item);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.deleteContact(id);
      return response.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
