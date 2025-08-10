const express =require('express');
const expressproxy = require('express-http-proxy');
const dotenv = require('dotenv');
const app = express();

app.use("/users", expressproxy("http://localhost:3001"));
app.use("/captain", expressproxy("http://localhost:3002"));
app.use("/ride", expressproxy("http://localhost:3003"));

app.listen(3000, () => {
    console.log('Gateway is running on port 3000');
});