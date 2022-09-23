import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { initialContacts } from "./initial-state.items";

// const STORAGE_KEY = 'contacts';

// const readArrayFromStorage = (key) => {
//   const value = localStorage.getItem(key);
//   try {
//     return value ? JSON.parse(value) : initialContacts;
//   } catch (error) {
//     return initialContacts;
//   }
// }

// const writeArrayToStorage = (key, value) => {
//   localStorage.setItem(key, JSON.stringify(value))
// }

export const addItemAction = createAction('items/addItem', item => (
  { payload: { ...item, id: nanoid() } }
));

export const itemsSlice = createSlice({
  name: 'items',
  initialState: { items: initialContacts },
  reducers: {
    // readItemsFromStorage(state, action) {
    //   const storedItems = readArrayFromStorage(STORAGE_KEY);
    //   if (storedItems) {
    //     return storedItems ?? state;
    //   }
    // },

    deleteItemAction(state, action) {
      state.items = state.items.filter(item => action.payload !== item.id);
      // writeArrayToStorage(STORAGE_KEY, state);
      return state;
    },
  },
  extraReducers: {
    [addItemAction]: (state, action) => {
      state.items.push(action.payload);
      // writeArrayToStorage(STORAGE_KEY, state)
    },
  }
});

export const { deleteItemAction } = itemsSlice.actions;

export const getItems = state => state.items.items;
