import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLazySearchActorsByNameQuery } from '../services/tmdbService';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks/hooks';
import { setActor } from '../store/reducers/actorsSlice';
import { IActor } from '../models/IActor';

export const SearchActor = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [run, { data: actors, isFetching }] = useLazySearchActorsByNameQuery();
  const navigate = useNavigate();

  const goMoviePage = (actor: IActor) => {
    dispatch(setActor(actor));
    navigate(`/actors/${actor.id}`);
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
        options={actors?.results ?? []}
        sx={{ flex: '1' }}
        open={open}
        loading={isFetching}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(e, actor) => {
          if (actor) {
            goMoviePage(actor);
          }
        }}
        getOptionLabel={(actor: any) => actor.name}
        renderOption={(props, actor) => (
          <li {...props} key={actor.id}>
            {actor.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search Actor'
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
