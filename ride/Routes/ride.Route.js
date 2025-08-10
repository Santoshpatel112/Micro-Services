const express=require('express');
const router=express.Router();
const authmiddleware = require("../middleware/authmiddelware");
const { createRide } = require("../Controllers/ride.controller");

router.post('/create-ride', authmiddleware.userAuth, createRide);


module.exports = router;
// This code defines a route for creating a ride, protected by user authentication middleware.
