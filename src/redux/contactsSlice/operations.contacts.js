import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../services/contactsAPI';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.fetchAllContacts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const addContact = createAsyncThunk(
  'contacts/add',
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
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const editContact = createAsyncThunk(
  'contacts/edit',
  async (item, { rejectWithValue }) => {
    try {
      await API.editContact(item);
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
