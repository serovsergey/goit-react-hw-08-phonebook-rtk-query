import { configureStore } from '@reduxjs/toolkit'
import { itemsSlice } from './itemsSlice/slice';
import { filterSlice } from './filterSlice/slice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import rootReducer from './reducers'

const persistConfig = {
  key: 'contacts',
  storage,
}

const persistedReducer = persistReducer(persistConfig, itemsSlice.reducer)

export const store = configureStore({
  reducer: {
    items: persistedReducer,
    filter: filterSlice.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
})

export const persistor = persistStore(store);
