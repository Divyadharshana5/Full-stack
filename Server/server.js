const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./Models/User");

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    console.log("Database name:", mongoose.connection.db.databaseName);
    console.log("Connection string:", process.env.MONGODB_URI?.replace(/\/\/.*@/, '//***:***@'));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!", timestamp: new Date() });
});

// GET all users
app.get('/api/users', async (req, res) => {
  try {
    console.log('GET /api/users called');
    console.log('User model:', User);
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    
    const users = await User.find({});
    console.log('Users found:', users);
    console.log('Number of users:', users.length);
    
    res.json(users);
  } catch (error) {
    console.error('Error in GET /api/users:', error);
    res.status(500).json({ message: error.message, error: error });
  }
});

// GET user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new user
app.post("/api/users", async (req, res) => {
  try {
    console.log('POST /api/users called with body:', req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update user
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
