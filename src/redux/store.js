import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { filterReducer } from './filterReducer/reducer.filter';
import { authReducer } from '../redux/auth';
import { contactsApi } from '../services/contacts.api';
import { unsetCredentials } from './auth/auth.slice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token']
}

export const rtkQueryErrorLogger = ({ dispatch, getState }) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    if (getState().auth.token && action.payload.status === 401) {
      console.warn('Wrong token! Cleared.');
      dispatch(unsetCredentials());
    }
  }

  return next(action)
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware, rtkQueryErrorLogger),
  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store);
