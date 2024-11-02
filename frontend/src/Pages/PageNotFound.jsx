// NotFound.js
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#f0f4f8',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ff6b6b', mb: 1 }} />
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}>
        404
      </Typography>
      <BrokenImageIcon sx={{ fontSize: 60, color: '#ffb74d', mb: 1 }} />
      <Typography variant="h5" sx={{ color: '#666', mb: 3 }}>
        Sorry, the page you are looking for could not be found.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        startIcon={<HomeIcon />}
        sx={{
          textTransform: 'none',
          padding: '8px 24px',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
