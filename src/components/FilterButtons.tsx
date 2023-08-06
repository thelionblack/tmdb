import { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { setSortBy } from '../store/reducers/moviesSlice';
import { typeSortBy } from '../models/searchBy';

export const FilterButtons = () => {
  const dispatch = useAppDispatch();
  const { sortBy } = useAppSelector((state) => state.movie);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as typeSortBy));
  };

  return (
    <Stack direction={'row'} justifyContent='flex-end'>
      <FormControl>
        <InputLabel id='demo-simple-select-label'>Sort by</InputLabel>
        <Select value={sortBy} label='Sort by' onChange={handleChange}>
          <MenuItem value='popularity.desc'>Popularity (desc)</MenuItem>
          <MenuItem value='popularity.asc'>Popularity (increase)</MenuItem>
          <MenuItem value='vote_average.desc'>Rating (desc)</MenuItem>
          <MenuItem value='vote_average.asc'>Rating (increase)</MenuItem>
          <MenuItem value='release_date.desc'>Release date (desc)</MenuItem>
          <MenuItem value='release_date.asc'>Release date (increase)</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};
