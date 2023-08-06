import { Stack, CircularProgress, Typography, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { useEffect } from 'react';
import { useLazySearchActorByIdQuery } from '../services/tmdbService';
import { useParams } from 'react-router-dom';
import { setActor } from '../store/reducers/actorsSlice';
import MovieCard from '../components/MovieCard';

export const ActorPage = () => {
  const { currentActor: actor } = useAppSelector((state) => state.actors);
  const dispatch = useAppDispatch();
  const [run, { data: dataActor, isLoading, isError }] =
    useLazySearchActorByIdQuery();
  const { id = '' } = useParams();

  useEffect(() => {
    if (!actor) {
      run(id).then(({ data: dataActor }) => {
        if (dataActor) {
          dispatch(setActor(dataActor));
        }
      });
    }
  }, [actor]);

  if (isLoading) {
    return <CircularProgress color='secondary' />;
  }

  if (isError) {
    return <>Error</>;
  }

  console.log(actor);
  return (
    <>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          height: '100%',
          width: '100%',
          p: '15px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${actor?.profile_path})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backdropFilter: 'invert(1)',
            opacity: '0.3',
            minHeight: '100%',
            width: '100%',
            position: 'absolute',
            top: '0',
            right: '0',
            zIndex: '-21365765756',
          }}
        ></div>
        <Stack spacing={2} alignItems={'center'}>
          <Typography variant='h2' component='h2'>
            {actor?.name}
          </Typography>
          <div className='poster-wrapper'>
            <img
              src={`https://image.tmdb.org/t/p/original${actor?.profile_path}`}
              alt={actor?.name}
            />
          </div>
        </Stack>
        <Stack spacing={2} justifyContent='space-between' sx={{ flex: '1' }}>
          <Typography variant='h3' component='h3'>
            Known For:
          </Typography>
          <Grid container spacing={2}>
            {actor?.known_for.map((movie: any) => (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};
