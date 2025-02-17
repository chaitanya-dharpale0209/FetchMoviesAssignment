// src/redux/shortlistedMoviesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

interface ShortlistedMoviesState {
  movies: Movie[];
}

const initialState: ShortlistedMoviesState = {
  movies: [],
};

const shortlistedMoviesSlice = createSlice({
  name: 'shortlistedMovies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    removeMovie: (state, action: PayloadAction<Movie>) => {
      state.movies = state.movies.filter((movie) => movie.imdbID !== action.payload.imdbID);
    },
  },
});

export const { addMovie, removeMovie } = shortlistedMoviesSlice.actions;
export default shortlistedMoviesSlice.reducer;
