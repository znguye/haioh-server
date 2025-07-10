require('dotenv').config();
require("./db");

const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const cors_middleware = require('cors');

const allowedOrigins = ['https://yakrush.netlify.app'];

app.use(cors_middleware({
  origin: allowedOrigins,
  credentials: true, 
}));

app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profiles.js");
const matchmakingRoutes = require("./routes/matchmakingActions.js");

// Health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Route mounting
app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);
app.use('/matchmaking-actions', matchmakingRoutes);

// Error handling middleware
require('./error-handling/error-handling.js')(app);

// Serve static files from the React app
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
