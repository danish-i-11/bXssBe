// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/feedback', feedbackController.submitFeedback);
router.get('/getfeedback', feedbackController.getFeedbacks);

module.exports = router;
