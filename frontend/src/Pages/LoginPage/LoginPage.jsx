import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../../State/Authentication/Action';
import './LoginPage.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  // Define validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  });

  // Initialize Formik with initial values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
      dispatch(loginUser({data:values,navigate}));
    },
  });

  const styles = {
    googleButton: {
      margin: '10px 100px',
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
    },
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
        <form onSubmit={formik.handleSubmit}>
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            type="submit"
          >
            Login
          </Button>
        </form>
        <p style={{ margin: '10px 180px' }}>OR</p>
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
