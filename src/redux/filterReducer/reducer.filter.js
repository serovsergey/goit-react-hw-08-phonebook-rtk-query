import { createReducer } from "@reduxjs/toolkit";
import { setFilterAction } from "./actions.filter";
import { initialFilter } from "./initial-state.filter";

export const filterReducer = createReducer(initialFilter, {
  [setFilterAction]: (state, action) => {
    return action.payload;
  }
})
