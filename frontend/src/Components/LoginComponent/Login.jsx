import React from 'react';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

const LoginComponent = () => {

    const handleGoogleSignUp = () => {
        console.log("Google Sign-Up Clicked"); // Placeholder action
    }

    return (
        <div className='login-button'>
            <Button variant='outlined' onClick={handleGoogleSignUp}>
                <GoogleIcon />
                <span className='buttonText'>Google SignIn</span>
            </Button>
        </div>
    );
}

export default LoginComponent;
