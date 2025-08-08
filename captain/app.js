const express=require('express');
const dotenv = require('dotenv');
const cookeiparser = require('cookie-parser');
const app=express();
dotenv.config();
const captainRoute = require('./Routes/captain.route');
const ConnectDb=require('./db/db')
ConnectDb(); // Connect to MongoDB
app.use(express.json());
app.use(cookeiparser());
app.use(express.urlencoded({ extended: true })); 

app.use("/captain", captainRoute);

module.exports=app;