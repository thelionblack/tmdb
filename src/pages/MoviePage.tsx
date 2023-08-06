import { Stack, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { useEffect } from 'react';
import { useLazySearchMoviesByIdQuery } from '../services/tmdbService';
import { useParams } from 'react-router-dom';
import { setMovie } from '../store/reducers/moviesSlice';

export const MoviePage = () => {
  const { currentMovies: movie } = useAppSelector((state) => state.movie);
  const dispatch = useAppDispatch();
  const [run, { data: dataMovie, isLoading, isError }] =
    useLazySearchMoviesByIdQuery();
  const { id = '' } = useParams();

  useEffect(() => {
    if (!movie) {
      run(id).then(({ data: dataMovie }) => {
        if (dataMovie) {
          dispatch(setMovie(dataMovie));
        }
      });
    }
  }, [movie]);

  if (isLoading) {
    return <CircularProgress color='secondary' />;
  }

  if (isError) {
    return <>Error</>;
  }

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
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
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
            zIndex: '-213',
          }}
        ></div>
        <div className='poster-wrapper'>
          <img
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
            alt={movie?.title}
          />
        </div>
        <Stack spacing={2} sx={{ flex: '1' }}>
          <Typography variant='h2' component='h2'>
            {movie?.title}
          </Typography>
          <Typography variant='h3' component='h3'>
            About Movie
          </Typography>
          <Typography variant='subtitle1' component='p'>
            {movie?.overview || '***'}
          </Typography>
          <Typography variant='h4' component='h4'>
            Release date: {movie?.release_date}
          </Typography>
          <Typography variant='h4' component='h4'>
            Genres:{' '}
            {movie?.genres
              ? movie?.genres.map((genre) => `${genre.name} `)
              : '*'}
          </Typography>
          <Typography variant='h4' component='h4'>
            Runtime: {movie?.runtime} minutes
          </Typography>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h4' component='h4'>
              Rating: {movie?.vote_average}
            </Typography>
            <Typography variant='h4' component='h4'>
              Vote Count: {movie?.vote_count}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
