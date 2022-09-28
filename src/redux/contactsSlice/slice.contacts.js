import { createSlice } from "@reduxjs/toolkit";
import { initialContacts } from "./initial-state.contacts";
import { addContact, deleteContact, editContact, fetchAllContacts } from "./operations.contacts";

const setError = (state, action) => {
  state.error = action.payload;
  state.isLoading = false;
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContacts,
  reducers: {},
  extraReducers: {
    [fetchAllContacts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAllContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchAllContacts.rejected]: setError,

    [addContact.pending]: (state) => { state.isLoading = true },
    [addContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addContact.rejected]: setError,

    [deleteContact.pending]: (state) => { state.isLoading = true },
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(item => action.payload !== item.id);
    },
    [deleteContact.rejected]: setError,

    [editContact.pending]: (state) => { state.isLoading = true },
    [editContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.map(item => item.id === payload.id ? payload : item);
    },
    [editContact.rejected]: setError
  }
});

