import {
  AppBar,
  Container,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import FaceIcon from '@mui/icons-material/Face';
import { ThemeButton } from '../../components/ThemeButton/ThemeButton';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinkStyles } from './styles';
import { SearchMovie } from '../../components/SearchMovie';
import { SearchActor } from '../../components/SearchActor';

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <AppBar position={'static'} sx={{ p: '10px' }}>
      <Container maxWidth='xl'>
        <Toolbar>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='space-between'
            minWidth='100%'
          >
            <nav>
              <Stack
                component='ul'
                direction='row'
                spacing={1}
                alignItems='center'
              >
                <Typography variant='h1' component='h1'>
                  <Link to='/movies'>
                    <HomeIcon />
                    TMDB
                  </Link>
                </Typography>
                <NavLink to='/movies' style={navLinkStyles}>
                  <MovieIcon />
                  Movies
                </NavLink>
                <NavLink to='/actors' style={navLinkStyles}>
                  <FaceIcon />
                  Actors
                </NavLink>
              </Stack>
            </nav>
            {pathname.search(/\bactors\b/g) === -1 ? (
              <SearchMovie />
            ) : (
              <SearchActor />
            )}
            <ThemeButton />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
