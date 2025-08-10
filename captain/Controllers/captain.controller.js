const captainModel = require('../Models/captain.model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SubscribeToQueue}=require('../services/rabbit');
const Register=async (req ,res)=>{
    const {name, email, password} = req.body;
    try {
        const existingcaptain = await userModel.findOne({ email });
        if(existingcaptain){
            return res.status(400).json({message:"captain already exists"});
        }
        const hash=await bcrypt.hash(password,10);
        const newcaptain = await captainModel.create({
          name,
          email,
          password: hash,
        });
        const token = jwt.sign(
          { captainId: newcaptain._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        ); // set the token 
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });
        res.status(201).json({
          captain: newcaptain,
          token,
          message: "User registered successfully",
        });
    } catch (error) {
        console.log(`error`, error);
        return res.status(500).json({message:"Internal server error | User registration failed"});
    }
}

const Login=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const captain = await captainModel.findOne({ email });
        if (!captain) {
          return res.status(400).json({ message: "Captain does not exist" });
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign(
          { captainId: captain._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });
        res.status(200).json({ user, token, message: "Login successful" });
    } catch (error) {
        console.log(`error`, error);
        console.error("Login failed:", error);
        return res.status(500).json({message:"Internal server error | Login failed"})
    }
}


const Logout=async(req,res)=>{
    try {
        res.clearCookie('token'); // clear the cookie         netstat -ano | findstr :3001
        res.status(200).json({message:"Logout successful"});
    } catch (error) {
        console.error("Logout failed:", error);
        return res.status(500).json({message:"Internal server error | Logout failed"});
    }
}


const Profile=async(req,res)=>{
    try {
        res.status(200).json({ captain: req.captain, message: "Profile retrieved successfully" });
        console.log(`User profile retrieved successfully:`, req.captain);
    } catch (error) {
        console.error("Profile retrieval failed:", error);
        return res.status(500).json({message:"Internal server error | Profile retrieval failed"});
    }
}

const ToggelAvilbility = async (req, res) => {
    // Assuming captain ID is available as req.captain._id or req.params.id
    const captainId = req.captain?._id || req.params.id;
    const captain = await captainModel.findById(captainId);
    if (!captain) {
        return res.status(404).json({ message: "Captain not found" });
    }
    captain.isAvailable = !captain.isAvailable; // Toggle availability
    await captain.save();
    res.status(200).json({ message: `Captain availability toggled to ${captain.isAvailable}` });
}


SubscribeToQueue("new-ride", (data) => {
    console.log("Received ride availability message:", json.Parse(data));
    // Handle the message as needed
});

module.exports = {
    Register,
    Login,
    Logout,
    Profile,
    ToggelAvilbility
};
// This code defines a Register function that handles user registration. It checks if the user already exists