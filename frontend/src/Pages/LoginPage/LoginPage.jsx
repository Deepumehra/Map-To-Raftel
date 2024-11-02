import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const Login = () => {
  const navigate = useNavigate();
  const styles = {
    googleButton: {
        margin:'10px 100px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#4285F4', // Google blue color
        color: 'white',
        cursor: 'pointer',
        transition: '0.3s',
    },
    googleImage: {
        width: '20px', // Set your desired width
        height: '20px', // Set your desired height
        marginRight: '10px', // Space between image and text
    },
    googleText: {
        margin: 0, // Remove default margin from <p>
        fontWeight: 'bold', // Optional: make text bold
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
          Login
        </Typography>
        <TextField fullWidth label="Email" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
          Login
        </Button>
        <p style={{'margin':'10px 180px' }}>OR</p>
        <Link component="button" onClick={() => navigate('/googleLogin')} style={{ textDecoration: 'none' }}>
            <button style={styles.googleButton}>
                <img src='../../../public/Images/google.png' alt="Google Logo" style={styles.googleImage} />
                <p style={styles.googleText}>Login With Google</p>
            </button>
        </Link>

        <Typography align="center" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link component="button" onClick={() => navigate('/signup')}>
            Sign up here
          </Link>
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Login;
