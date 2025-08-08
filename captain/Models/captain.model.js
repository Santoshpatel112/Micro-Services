const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAvailble: {
    type: Boolean,
    default: true,
  },
});

const captain = mongoose.model("Captain", captainSchema);

module.exports = captain;
// This code defines a Mongoose schema for a User model with fields for name, email,