// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Feedback = require('./models/Feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Use built-in body parser

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required.' });
    }

    const newFeedback = new Feedback({ name, message });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    console.error('POST /api/feedback error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getfeedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ _id: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('GET /api/getfeedback error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
