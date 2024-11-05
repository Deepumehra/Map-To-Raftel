const express = require('express');
const router = express.Router();
const { googleLogin, register, login, generateOTP, verifyOTP,
    getUserDetails ,saveProfile, fetchProfile, updateProfile } = require('../controllers/authController.js');
const authenticate=require('../middlewares/authentcate');
router.get('/google', googleLogin);
router.post('/signup', register);
router.post('/login', login);
router.post('/request-otp', generateOTP);
router.post('/verify-otp', verifyOTP);
router.get('/user', authenticate, getUserDetails);
router.post('/save-profile',authenticate, saveProfile);
router.get('/fetch-profile', authenticate, fetchProfile);
router.put('/update-profile', authenticate, updateProfile);
module.exports = router;