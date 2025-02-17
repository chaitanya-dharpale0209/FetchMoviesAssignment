import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // You can also use AsyncStorage
import shortlistedMoviesReducer from './shortListedMoviesSlice';

const persistConfig = {
  key: 'root',  
  storage,      
};

const persistedReducer = persistReducer(persistConfig, shortlistedMoviesReducer);


export const store = configureStore({
  reducer: {
    shortlistedMovies: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
