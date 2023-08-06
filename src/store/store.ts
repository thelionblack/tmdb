import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import tmdbApi from '../services/tmdbService';
import { setupListeners } from '@reduxjs/toolkit/query';
import movieReducer from './reducers/moviesSlice';
import actorsReducer from './reducers/actorsSlice';

const rootReducer = combineReducers({
  movie: movieReducer,
  actors: actorsReducer,
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
