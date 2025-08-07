const express=require('express');
const dotenv = require('dotenv');
const cookeiparser = require('cookie-parser');
const app=express();
dotenv.config();
const userRoutes = require('./Routes/user.route');
const ConnectDb=require('./db/db')
ConnectDb(); // Connect to MongoDB
app.use(express.json());
app.use(cookeiparser());
app.use(express.urlencoded({ extended: true })); 

app.use("/users", userRoutes);

module.exports=app;