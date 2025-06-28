require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Import routes
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/auth', require('./routes/auth.js'));

// Error handling middleware
require('./error-handling/error-handling.js')(app);

// Serve static files from the React app
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
