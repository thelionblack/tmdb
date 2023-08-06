import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../models/IMovies';
import { typeSortBy } from '../../models/searchBy';
import { IActor } from '../../models/IActor';

interface IInitState {
  currentActor?: IActor;
  actors: IActor[];
  currentPage: number;
  totalPage: number;
}

const initialState: IInitState = {
  actors: [],
  currentPage: 1,
  totalPage: 0,
};

export const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<any>) => {
      state.currentActor = action.payload;
    },
    setActors: (state, action: PayloadAction<any>) => {
      state.actors = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setActor, setActors, setTotalPage, changePage } =
  actorsSlice.actions;

export default actorsSlice.reducer;
