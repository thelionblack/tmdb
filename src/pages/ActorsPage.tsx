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
import { useLazyGetActorsQuery } from '../services/tmdbService';
import {
  setActors,
  setTotalPage,
  changePage,
} from '../store/reducers/actorsSlice';
import ActorCard from '../components/ActorCard';

export const ActorsPage = () => {
  const dispatch = useAppDispatch();
  const { actors, currentPage, totalPage } = useAppSelector(
    (state) => state.actors,
  );
  const [run, { isLoading, isError, error }] = useLazyGetActorsQuery();

  useEffect(() => {
    run(currentPage).then(({ data }) => {
      if (data) {
        const dataTotalPage = data.total_pages > 500 ? 500 : data.total_pages;

        dispatch(setActors((data.results as any) || []));
        dispatch(setTotalPage((dataTotalPage as number) || 0));
      }
    });
  }, [currentPage]);

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
      <Grid container spacing={2}>
        {actors.map((actor: any) => (
          <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3}>
            <ActorCard actor={actor} />
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
