const express= require('express');
const {SubscribeToQueue ,PublishToQueue} = require('../services/rabbit')
const createRide = async (req, res) => {
    const {pickup , destination} = req.body;
    const userId=req.user._id;
  try {
    const newRide=new Ride({
        user: userId,
        name: req.user.name, // Assuming req.user contains user information
        pickup,
        destination
    })
    await newRide.save();
    return res.status(201).json({message:"Ride created successfully", ride: newRide});

  } catch (error) {
    console.error("Error creating ride:", error);
    return res
      .status(500)
      .json({ message: "Internal server error | Ride creation failed" });
  }
};

const acceptRide=async(req,res)=>{
  const rideId=req.params.rideId;
  const captainId=req.captain._id;
  try {
    const ride=await Ride.findById(rideId);
    if(!ride){
      return res.status(404).json({message:"Ride not found"});
    }
    if(ride.status !== "pending"){
      return res.status(400).json({message:"Ride is not pending"});
    }
    ride.captain=captainId;
    ride.status="accepted";
    PublishToQueue("ride-accepted", json.stringify(ride)); // Publish the accepted ride to RabbitMQ queue
    await ride.save();
    res.send('Ride accepted successfully' + ride)
    return res.status(200).json({message:"Ride accepted successfully", ride});

  }catch(error){
    console.error("Error accepting ride:", error);
    return res
    .status(500)
    .json({ message: "Internal server error | Ride acceptance failed" });
  }
}

PublishToQueue("new-ride", json.stringify(newRide)); // Publish the new ride to RabbitMQ queue
module.exports={
  createRide,
  acceptRide
}