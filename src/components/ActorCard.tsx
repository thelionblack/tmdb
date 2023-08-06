import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { IActor } from '../models/IActor';
import { useNavigate } from 'react-router-dom';
import { setActor } from '../store/reducers/actorsSlice';
import { useAppDispatch } from '../store/hooks/hooks';

const ActorCard = ({ actor }: { actor: IActor }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoToMoviePage = () => {
    dispatch(setActor(actor));
    navigate(`/actors/${actor.id}`);
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
          alt={actor.name}
          height='400'
          image={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
        />
        <CardContent>
          <Typography variant='h4' component='h4' sx={{ whiteSpace: 'nowrap' }}>
            {actor.name.length > 25
              ? `${actor.name.slice(0, 25)}...`
              : actor.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActorCard;
