import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ For React Native
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import shortlistedMoviesReducer from './shortListedMoviesSlice';

const persistConfig = {
  key: 'root',  
  storage: AsyncStorage, 
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
