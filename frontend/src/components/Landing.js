import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h5" sx={{ mt: 4, mb: 2 }}>
        Welcome to Health Tracker
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Your personal health dashboard.
      </Typography>
      <Box sx={{ mt: 2, width: '100%' }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ mb: 2 }}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          fullWidth
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Landing;
