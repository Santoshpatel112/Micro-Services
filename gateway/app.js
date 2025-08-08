const express =require('express');
const expressproxy = require('express-http-proxy');
const dotenv = require('dotenv');
const app = express();

app.use("/users", expressproxy("http://localhost:3001"));

app.listen(3000, () => {
    console.log('Gateway is running on port 3000');
});