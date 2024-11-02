const express = require('express');
const AuthRoutes=express.Router();
const {register,Login,Logout}=require('../controllers/authController')

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',Login);
AuthRoutes.post('/logout',Logout);


module.exports=AuthRoutes;