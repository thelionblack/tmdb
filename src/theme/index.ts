import {
  createTheme,
  PaletteMode,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import { darkColors } from './constants/darkColors';
import { whiteColors } from './constants/whiteColors';

export const tokens = (mode: string) => ({
  ...(mode === 'dark' ? darkColors : whiteColors),
});

export const themeSettings = (mode: PaletteMode): ThemeOptions => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 14,
      h1: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 35,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 30,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 25,
        fontWeight: 500,
      },
      body1: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 20,
      },
    },
  };
};

export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
}>({
  toggleColorMode: () => {
    /**/
  },
});

export const useMode = () => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [],
  );

  const theme = useMemo(
    () => responsiveFontSizes(createTheme(themeSettings(mode))),
    [mode],
  );

  return { theme, colorMode };
};
