import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerUser } from '../../State/Authentication/Action';
import './SignupPage.css';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  // Define validation schema with Yup
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

  // Initialize Formik with initial values, validation schema, and submit handler
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission (e.g., send data to backend)
      console.log('Form Submitted:', values);
      dispatch(registerUser({userData:values,navigate}))
    },
  });

  const styles = {
    googleButton: {
      margin: '5px 100px',
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
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}
        className="auth-container"
      >
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        
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
        
        <p style={{ margin: '10px 180px' }}>OR</p>
        
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
