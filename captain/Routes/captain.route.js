const express = require('express');
const router=express.Router();
const { Register ,Login,Logout ,Profile,ToggelAvilbility} = require('../Controllers/captain.controller');
const Authmiddleware = require('../middleware/authmiddleware');

router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',Logout);
router.get('/profile',Authmiddleware.captainAuth,Profile);
router.post('/toggle-availability', Authmiddleware.captainAuth, ToggelAvilbility);

module.exports = router;
