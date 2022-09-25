import { configureStore } from '@reduxjs/toolkit'
import { contactsSlice } from './contactsSlice/slice.contacts';
import { filterReducer } from './filterReducer/reducer.filter';

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})
