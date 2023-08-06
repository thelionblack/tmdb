import { FormControl, FormControlLabel, useTheme } from '@mui/material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';
import { MaterialUISwitch } from './styles';

export const ThemeButton = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <FormControl component='form'>
      <FormControlLabel
        onChange={colorMode.toggleColorMode}
        control={<MaterialUISwitch />}
        label={`${theme.palette.mode} mode`}
      />
    </FormControl>
  );
};
