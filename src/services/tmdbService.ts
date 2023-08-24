import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovie } from '../models/IMovies';

const TMDB_API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWZiYzAxN2JiYjU5NmZhOGQzZjEzZjllYzBhNjAxYSIsInN1YiI6IjY0Y2JkZTUzMjk3MzM4MDIwYzVjN2YxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ETkaTGjFGm-bZqFAwWuWfPWA4i4dA-98vrh3J7OfZ8U';

export interface IResponse {
  page: number;
  results: Array<IMovie>;
  total_pages: number;
  total_results: number;
}
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders(headers) {
      headers.set('Authorization', `Bearer ${TMDB_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    SearchMoviesByFilter: build.query<any, { filter: string; page: number }>({
      query: ({ filter, page }) => ({
        url: `discover/movie?sort_by=${filter}&page=${page}`,
      }),
    }),
    searchMoviesByName: build.query<IResponse, string>({
      query: (searchText) => `/search/movie?query=${searchText}`,
    }),
    searchMoviesById: build.query<IMovie, string>({
      query: (id) => `/movie/${id}`,
    }),
    getActors: build.query<any, number>({
      query: (page) => `/person/popular?page=${page}`,
    }),
    searchActorsByName: build.query<any, string>({
      query: (searchText) => `/search/person?query=${searchText}`,
    }),
    searchActorById: build.query<any, string>({
      query: (id) => `/person/${id}`,
    }),
    getActorsByMovieId: build.query<any, string>({
      query: (movieId) => `/movie/${movieId}/credits`,
    }),
  }),
});

export const {
  useLazySearchMoviesByFilterQuery,
  useLazySearchMoviesByNameQuery,
  useLazySearchMoviesByIdQuery,
  useLazyGetActorsQuery,
  useLazySearchActorsByNameQuery,
  useLazySearchActorByIdQuery,
  useLazyGetActorsByMovieIdQuery,
} = tmdbApi;
export default tmdbApi;
