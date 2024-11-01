const express=require('express');
const router=express.Router();
const {googleLogin}=require('../controllers/authController.js');
router.get('/google',googleLogin);
module.exports=router;
