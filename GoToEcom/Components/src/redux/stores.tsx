// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // You can also use AsyncStorage
import shortlistedMoviesReducer from './shortListedMoviesSlice';

// Persist config
const persistConfig = {
  key: 'root',  // The key for storage
  storage,      // You can choose different storage like localStorage, AsyncStorage, etc.
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, shortlistedMoviesReducer);

// Create the store
export const store = configureStore({
  reducer: {
    shortlistedMovies: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks
    }),
});

// Create a persistor
export const persistor = persistStore(store);
