// src/components/Signup.js
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';

const Signup = () => {
  const navigate = useNavigate();
  const styles = {
    googleButton: {
        margin:'5px 100px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#4285F4',
        color: 'white',
        cursor: 'pointer',
        transition: '0.3s',
    },
    googleImage: {
        width: '20px',
        height: '20px',
        marginRight: '10px', 
    },
    googleText: {
        margin: 0, 
        fontWeight: 'bold', 
    }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-background"></div>
      <div className="auth-overlay"></div>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }} className="auth-container">
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <TextField fullWidth label="Name" margin="normal" />
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Sign Up
        </Button>
        <p style={{'margin':'10px 180px' }}>OR</p>
        <Link component="button" onClick={() => navigate('/googleLogin')} style={{ textDecoration: 'none' }}>
            <button style={styles.googleButton}>
                <img src='../../../public/Images/google.png' alt="Google Logo" style={styles.googleImage} />
                <p style={styles.googleText}>Login With Google</p>
            </button>
        </Link>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link component="button" onClick={() => navigate('/login')}>
            Log in here
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Signup;
