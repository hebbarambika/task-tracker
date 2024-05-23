const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
require("dotenv").config(); // Load environment variables
const userRoutes = require("./routes/userRoutes");
// const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);

module.exports = app;
