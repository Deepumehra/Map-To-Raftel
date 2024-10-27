const express=require('express');
const router=express.router();
const authController=require('../controllers/authController.js');
const authenticate=require('../middlewares/authenticate.js');
router.post('/signup',authController.singup);
router.post('/login',authController.login);
router.get('/profile',authenticate,authController.getProfile);
router.get('/logout',authenticate,authController.logout);

module.exports=router;
