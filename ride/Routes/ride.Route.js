const express=require('express');
const router=express.Router();
const authmiddleware = require("../middleware/authmiddelware");
const { createRide ,acceptRide} = require("../Controllers/ride.controller");

router.post('/create-ride', authmiddleware.userAuth, createRide);
router.put('/accept-ride/:rideId', authmiddleware.captainAuth, acceptRide);



module.exports = router;
// This code defines a route for creating a ride, protected by user authentication middleware.
