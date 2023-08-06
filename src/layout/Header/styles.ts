import { useTheme } from '@mui/material';

export const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  const theme = useTheme();

  return {
    color: isActive ? theme.palette.text.secondary : theme.palette.text.primary,
  };
};
