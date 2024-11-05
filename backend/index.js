import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import crypto from 'crypto';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
// import taskRoutes from './routes/taskRoutes.js';
import Task from './models/taskModel.js';

const app = express();
const port = 3000;

// middleware
app.use(cors({
  origin: "*",
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JWT secret key generation
const secretKey = crypto.randomBytes(32).toString("hex");

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Connect to MongoDB
mongoose.connect("mongodb+srv://jheraff:jheraff1@cluster0.r7kkl.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });



// Define routes
// Login User route
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.log("Login Failed", error);
    res.status(500).json({ message: "Login Failed" });
  }
});

// Protected route to get user data
app.get('/auth/user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId, 'username xp level stats currency');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      username: user.username,
      xp: user.xp,
      level: user.level,
      stats: user.stats,
      currency: user.currency,
    });
  } catch (error) {
    console.log("Error fetching user data", error);
    res.status(500).json({ message: "Failed to fetch user data" });
  }
});

// Task route not working yet
app.post('/pages/tasks', verifyToken, async (req, res) => {
  try {
      const { name, difficulty, xpRewarded, taskType, statType, duration } = req.body;

      const newTask = new Task({
          name,
          difficulty,
          xpRewarded,
          taskType,
          statType,
          duration,
          user: req.userId, 
      });

      await newTask.save();
      res.status(201).json(newTask); 
  } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Failed to create task" });
  }
});

// Start the server and log
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
