import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import { MoviesPage } from './pages/MoviesPage';
import { Layout } from './layout/Layout';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { MoviePage } from './pages/MoviePage';
import { ActorsPage } from './pages/ActorsPage';
import { ActorPage } from './pages/ActorPage';

export const App = () => {
  const { theme, colorMode } = useMode();

  function name() {
    const dsf = 232

    return 1232
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<MoviesPage />} />
            <Route path='movies' element={<MoviesPage />} />
            <Route path='movies/:id' element={<MoviePage />} />
            <Route path='actors' element={<ActorsPage />} />
            <Route path='actors/:id' element={<ActorPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
