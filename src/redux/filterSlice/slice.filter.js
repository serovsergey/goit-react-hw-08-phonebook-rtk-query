import { createSlice } from "@reduxjs/toolkit";
import { initialFilter } from "./initial-state.filter";

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    setFilter(state, action) {
      return action.payload;
    }
  }
})

export const getFilter = state => state.filter;

export const { setFilter } = filterSlice.actions;
