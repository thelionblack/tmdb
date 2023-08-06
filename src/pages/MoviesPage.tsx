import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  Pagination,
  Grid,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { ChangeEvent, useEffect } from 'react';
import {
  changePage,
  setMovies,
  setTotalPage,
} from '../store/reducers/moviesSlice';
import { useLazySearchMoviesByFilterQuery } from '../services/tmdbService';
import { FilterButtons } from '../components/FilterButtons';
import { IMovie } from '../models/IMovies';
import MovieCard from '../components/MovieCard';

export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const { movies, sortBy, currentPage, totalPage } = useAppSelector(
    (state) => state.movie,
  );
  const [run, { isLoading, isError, error }] =
    useLazySearchMoviesByFilterQuery();

  useEffect(() => {
    run({ filter: sortBy, page: currentPage }).then(({ data }) => {
      if (data) {
        const dataTotalPage = data.total_pages > 500 ? 500 : data.total_pages;

        dispatch(setMovies((data.results as IMovie[]) || []));
        dispatch(setTotalPage((dataTotalPage as number) || 0));
      }
    });
  }, [sortBy, currentPage]);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    if (value <= totalPage) {
      dispatch(changePage(value));
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant='h4' component='h4' align='center' mt={4}>
        {JSON.stringify(error)}
      </Typography>
    );
  }

  return (
    <Stack spacing={2} sx={{ pt: '20px', pb: '20px' }}>
      <FilterButtons />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPage}
        color='secondary'
        onChange={handleChangePage}
        sx={{ alignSelf: 'center' }}
      />
    </Stack>
  );
};
