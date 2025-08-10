const express = require("express");
const dotenv = require("dotenv");
const cookeiparser = require("cookie-parser");
const rabbitmq =require("./services/rabbit")
const app = express();
dotenv.config();
const rideRoutes = require("./Routes/ride.route");
const ConnectDb = require("./db/db");
rabbitmq.connect();
ConnectDb(); // Connect to MongoDB
app.use(express.json());
app.use(cookeiparser());
app.use(express.urlencoded({ extended: true }));

app.use("/", rideRoutes);

module.exports = app;
