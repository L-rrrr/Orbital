const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const hostelsRouter = require('./routes/hostels'); // Import the hostels routes
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = ['https://orbital-chi.vercel.app', 'http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow credentials if needed
}));

// MongoDB connection
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/hostels', hostelsRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
