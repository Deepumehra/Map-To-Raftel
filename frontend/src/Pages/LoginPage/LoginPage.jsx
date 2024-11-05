import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';
import { loginUser, loginGoogle } from '../../State/Authentication/Action';
import { googleAuth } from '../../Helper/googleApi';
import './LoginPage.css';

const Login = ({ open, handleClose, handleSignup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Google Login response handler
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const { image, jwt, userDetails } = result.data;
        dispatch(loginGoogle(userDetails));
        localStorage.setItem('JWT', jwt);
        navigate('/profile', { state: { userDetails, image, jwt } });
      } else {
        console.log("Auth Result: ", authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.error('Error during Google Login', e);
    }
  };

  // Initialize Google login
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  // Form validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(loginUser({ data: values, navigate }));
      handleClose();
    },
  });

  const styles = {
    googleButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#4285F4',
      color: 'white',
      cursor: 'pointer',
      transition: '0.3s',
      margin: '0 auto',
    },
    googleImage: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
    },
    googleText: {
      margin: 0,
      fontWeight: 'bold',
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Login</Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
              Login
            </Button>
          </Box>
          <Typography align="center" sx={{ mt: 2, fontSize: '14px', color: 'text.secondary' }}>OR</Typography>
          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <button style={styles.googleButton} onClick={googleLogin}>
              <img src='/Images/google.png' alt="Google Logo" style={styles.googleImage} />
              <p style={styles.googleText}>Login With Google</p>
            </button>
          </Box>
          <Typography align="center" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Button component="button" onClick={() => {handleSignup()}}>
              Sign up here
            </Button>
          </Typography>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
