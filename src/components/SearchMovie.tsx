import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLazySearchMoviesByNameQuery } from '../services/tmdbService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks/hooks';
import { setMovie } from '../store/reducers/moviesSlice';
import { IMovie } from '../models/IMovies';

export const SearchMovie = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [run, { data: movies, isFetching }] = useLazySearchMoviesByNameQuery();
  const navigate = useNavigate();

  const goMoviePage = (movie: IMovie) => {
    dispatch(setMovie(movie));
    navigate(`/movies/${movie.id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText) {
      setOpen(true);
      run(debouncedSearchText);
    }
  }, [debouncedSearchText, run]);

  return (
    <>
      <Autocomplete
        options={movies?.results ?? []}
        sx={{ flex: '1' }}
        open={open}
        loading={isFetching}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, movie) => {
          if (movie) {
            goMoviePage(movie);
          }
        }}
        getOptionLabel={(movie: any) => movie.title}
        renderOption={(props, movie) => (
          <li {...props} key={movie.id}>
            {movie.title}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search Movie'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isFetching ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};
