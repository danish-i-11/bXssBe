// controllers/feedbackController.js
const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
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
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ _id: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('GET /api/getfeedback error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
