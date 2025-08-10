const jwt = require("jsonwebtoken");
const axios = require("axios");
const Base_URL = "http://localhost:5000/users"; // Base URL for user routes

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
    const response = await axios.get(`${Base_URL}/profile`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    const user = response.data.user;
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
