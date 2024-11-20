// server.js
require("dotenv").config({ path: "./config/.env" }); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user"); // Import the User model

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes

// GET: Retrieve all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.status(200).json(users); // Return the users as JSON
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
});

// POST: Add a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save(); // Save the new user to the database
    res.status(201).json(newUser); // Return the created user as JSON
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err });
  }
});

// PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true } // Return the updated user
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser); // Return the updated user as JSON
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});

// DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
