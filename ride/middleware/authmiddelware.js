const jwt = require("jsonwebtoken");
const axios = require("axios");
const Base_URL = process.env.BASE_URL || "http://localhost:3001/users"; // Base URL for user routes

module.exports.userAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized | No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Fetch user profile from user service with token
    const user1=await userModel.findById(decoded.userId);
    if (!user1) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = await axios.get(`${Base_URL}/profile`, { // user profile route hit 
      headers: {
        Cookie: `token=${token}`,
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
      // above responce synchronous communication with user service
    });
    const user = response.data;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(403).json({ message: "Forbidden | Invalid token" });
  }
};
