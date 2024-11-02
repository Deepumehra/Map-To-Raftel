const express = require('express');
const router = express.Router();
const { googleLogin, register, login, generateOTP, verifyOTP } = require('../controllers/authController.js');

router.get('/google', googleLogin);
router.post('/signup', register);
router.post('/login', login);
router.post('/request-otp', generateOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;