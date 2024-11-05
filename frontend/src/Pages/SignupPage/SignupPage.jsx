import { Box, Button, Link, TextField, Typography, Dialog, DialogContent, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import * as Yup from 'yup';
import { registerUser, loginGoogle } from '../../State/Authentication/Action';
import { googleAuth } from '../../Helper/googleApi';
import CloseIcon from '@mui/icons-material/Close';

const Signup = ({ open, onClose, handleLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser({ userData: values, navigate }));
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (authResult) => {
      try {
        const result = await googleAuth(authResult.code);
        const { image, jwt, userDetails } = result.data;
        dispatch(loginGoogle(userDetails));
        localStorage.setItem('JWT', jwt);
        navigate('/profile', {
          userDetails: { userDetails, image, jwt }
        });
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
    },
    flow: 'auth-code',
  });

  const styles = {
    googleButton: {
      margin: '5px auto',
      display: 'flex',
      alignItems: 'center',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#4285F4',
      color: 'white',
      cursor: 'pointer',
      transition: '0.3s',
      width: '100%',
      maxWidth: 300,
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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
          <Box sx={{ position: 'relative', padding: '20px' }}>
            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
              />
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                Sign Up
              </Button>
            </form>
            <p style={{ textAlign: 'center', margin: '10px 0' }}>OR</p>
            <button onClick={googleLogin} style={styles.googleButton}>
              <img src='../../../public/Images/google.png' alt="Google Logo" style={styles.googleImage} />
              <p style={styles.googleText}>Sign Up With Google</p>
            </button>
            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link component="button" onClick={() => { handleLogin(); onClose(); }}>
                Log in here
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
