import { Stack, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { useEffect } from 'react';
import { useLazyGetActorsByMovieIdQuery } from '../services/tmdbService';
import ActorCard from './ActorCard';
import { IActor } from '../models/IActor';

export const ActorFromMovie = () => {
    const {currentMovies} = useAppSelector((state) => state.movie)
  const [run, { data: dataActors, isLoading, isError }] = useLazyGetActorsByMovieIdQuery();

  useEffect(() => {
    if (currentMovies) {
      run(`${currentMovies.id}`);
      
    }
  }, [currentMovies]);

  if (isLoading) {
    return <CircularProgress color='secondary' />;
  }

  if (isError) {
    return <>Error</>;
  }

  console.log(dataActors);
  

  return (
    <>
      {dataActors?.cast.map((actor: IActor) => {
        return (<ActorCard key={actor.id} actor={actor} />)
      })}
    </>
  );
};
