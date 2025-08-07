const jwt=require('jsonwebtoken');
const userModel = require('../Models/user.model');

module.exports.userAuth= async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized | No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);// verify the token with the help of the secrate key
        req.user = await userModel.findById(decoded.userId);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(403).json({ message: "Forbidden | Invalid token" });
    }
}
