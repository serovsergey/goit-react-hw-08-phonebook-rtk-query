import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { initialContacts } from "./initial-state.items";

export const addItemAction = createAction('items/addItem', item => (
  { payload: { ...item, id: nanoid() } }
));

export const itemsSlice = createSlice({
  name: 'items',
  initialState: { items: initialContacts },
  reducers: {
    deleteItemAction(state, action) {
      state.items = state.items.filter(item => action.payload !== item.id);
      return state;
    },
  },
  extraReducers: {
    [addItemAction]: (state, action) => {
      state.items.push(action.payload);
    },
  }
});

export const { deleteItemAction } = itemsSlice.actions;

