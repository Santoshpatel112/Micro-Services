const mongoose = require('mongoose');

function ConnectDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.error("Database connection error:", err));
}
module.exports = ConnectDb;
// This function connects to the MongoDB database using the URL specified in the environment variable MONGO
// URL. It uses Mongoose to establish the connection and logs success or error messages accordingly.