import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../models/IMovies';
import { typeSortBy } from '../../models/searchBy';

interface IInitState {
  currentMovies?: IMovie;
  movies: IMovie[];
  sortBy: typeSortBy;
  currentPage: number;
  totalPage: number;
}

const initialState: IInitState = {
  movies: [],
  sortBy: 'popularity.desc',
  currentPage: 1,
  totalPage: 0,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<IMovie>) => {
      state.currentMovies = action.payload;
    },
    setMovies: (state, action: PayloadAction<IMovie[]>) => {
      state.movies = action.payload;
    },
    setSortBy: (state, action: PayloadAction<typeSortBy>) => {
      state.sortBy = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setMovie, setMovies, setSortBy, setTotalPage, changePage } =
  moviesSlice.actions;

export default moviesSlice.reducer;
