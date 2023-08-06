import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IMovie } from '../models/IMovies';
import { useNavigate } from 'react-router-dom';
import { setMovie } from '../store/reducers/moviesSlice';
import { useAppDispatch } from '../store/hooks/hooks';

const MovieCard = ({ movie }: { movie: IMovie }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoToMoviePage = () => {
    dispatch(setMovie(movie));
    navigate(`/movies/${movie.id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
      }}
      onClick={handleGoToMoviePage}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          alt={movie.title}
          height='400'
          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
        <CardContent>
          <Typography variant='h4' component='h4' sx={{ whiteSpace: 'nowrap' }}>
            {movie.title.length > 25
              ? `${movie.title.slice(0, 25)}...`
              : movie.title}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {movie.release_date || 'soon'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
