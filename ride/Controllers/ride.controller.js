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

PublishToQueue("new-ride", json.stringify(newRide)); // Publish the new ride to RabbitMQ queue
exports.createRide = createRide;