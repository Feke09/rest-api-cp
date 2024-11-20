// models/User.js
const mongoose = require("mongoose");

// Define the schema for a User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email regex validation
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt timestamps

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
