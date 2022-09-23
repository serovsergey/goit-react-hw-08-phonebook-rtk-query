import { configureStore } from '@reduxjs/toolkit'
import { itemsSlice } from './itemsSlice/slice.items';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { filterReducer } from './filterReducer/reducer.filter';

const persistConfig = {
  key: 'contacts',
  storage,
}

const persistedItemsReducer = persistReducer(persistConfig, itemsSlice.reducer)

export const store = configureStore({
  reducer: {
    items: persistedItemsReducer,
    filter: filterReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store);
