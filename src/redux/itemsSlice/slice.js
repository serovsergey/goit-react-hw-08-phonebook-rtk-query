import { createSlice } from "@reduxjs/toolkit";

const initialContacts = [
  { id: 'id-1', name: 'Sergey Serov', number: '459-12-56' },
  { id: 'id-2', name: 'Irina Serova', number: '443-89-12' },
  { id: 'id-3', name: 'Vanya Durachok', number: '645-17-79' },
  { id: 'id-4', name: 'Petya Smarty', number: '227-91-26' },
];

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
    addItem(state, action) {
      state.items.push(action.payload);
      // writeArrayToStorage(STORAGE_KEY, state)
    },
    deleteItem(state, action) {
      state.items = state.items.filter(item => action.payload !== item.id);
      // writeArrayToStorage(STORAGE_KEY, state);
      return state;
    },
  }
});

export const { addItem, deleteItem, readItemsFromStorage } = itemsSlice.actions;

export const getItems = state => state.items.items;
