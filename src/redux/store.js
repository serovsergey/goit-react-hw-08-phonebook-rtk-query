import { configureStore } from '@reduxjs/toolkit'
import { itemsSlice } from './itemsSlice/slice';
import { filterSlice } from './filterSlice/slice';


export const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    filter: filterSlice.reducer,
  },
})

// export default store;
