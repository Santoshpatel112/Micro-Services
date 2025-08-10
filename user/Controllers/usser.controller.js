const userModel = require('../Models/user.model');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register=async (req ,res)=>{
    const {name, email, password} = req.body;
    try {
        const existingUser= await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hash=await bcrypt.hash(password,10);
        const newuser=await userModel.create({
            name,
            email,
            password:hash
        });
        const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // set the token 
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });
        res.status(201).json({ user: newuser, token ,message: "User registered successfully" });
    } catch (error) {
        console.log(`error`, error);
        return res.status(500).json({message:"Internal server error | User registration failed"});
    }
}

const Login=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        res.status(200).json({ user: req.user, message: "Profile retrieved successfully" });
        console.log(`User profile retrieved successfully:`, req.user);
    } catch (error) {
        console.error("Profile retrieval failed:", error);
        return res.status(500).json({message:"Internal server error | Profile retrieval failed"});
    }
}

const acceptRide=async(req,res)=>{
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
    }catch (error) {
        console.error("Error creating ride:", error);
        return res
         .status(500)
         .json({ message: "Internal server error | Ride creation failed" });
    }
}
module.exports = {
    Register,
    Login,
    Logout,
    Profile,
    acceptRide
};
// This code defines a Register function that handles user registration. It checks if the user already exists