const express = require('express');
const router=express.Router();
const { Register ,Login,Logout ,Profile} = require('../Controllers/usser.controller');
const Authmiddleware = require('../middleware/authmiddleware');

router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',Logout);
router.get('/profile',Authmiddleware.userAuth,Profile);
router.get('/accepted-ride',Authmiddleware.userAuth,userController.acceptRide);
module.exports = router;
