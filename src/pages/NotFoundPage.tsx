import { Stack, Typography } from '@mui/material';

export const NotFoundPage = () => {
  return (
    <Stack spacing={2} alignItems={'center'} sx={{ mt: '20px' }}>
      <Typography component={'h2'}>Status: 404</Typography>
      <Typography component={'h2'}>
        This page is not available. Sorry about that.
      </Typography>
    </Stack>
  );
};

export default NotFoundPage;
