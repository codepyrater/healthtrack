const express = require('express');
const HealthMetric = require('../models/HealthMetric');
const { authenticateToken } = require('../middleware/authMiddleware'); // Ensure you have this middleware if using JWT

const router = express.Router();

// POST to add a new health metric
router.post('/', authenticateToken, async (req, res) => {
  const { userId, steps, calories, sleepHours, waterConsumed } = req.body;
  const metric = new HealthMetric({ userId, steps, calories, sleepHours, waterConsumed });
  try {
    const savedMetric = await metric.save();
    res.status(201).json(savedMetric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all metrics for a user
router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const metrics = await HealthMetric.find({ userId: req.params.userId });
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
