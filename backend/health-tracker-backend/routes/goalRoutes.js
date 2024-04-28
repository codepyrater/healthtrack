const express = require('express');
const Goal = require('../models/Goal');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/goals', authenticateToken, async (req, res) => {
    const { userId, steps, calories, sleepHours, waterConsumed } = req.body;
    try {
      let goal = await Goal.findOne({ userId });
      if (goal) {
        // Update existing goals
        goal.steps = steps;
        goal.calories = calories;
        goal.sleepHours = sleepHours;
        goal.waterConsumed = waterConsumed;
        await goal.save();
      } else {
        // Create new goals
        goal = new Goal({
          userId,
          steps,
          calories,
          sleepHours,
          waterConsumed
        });
        await goal.save();
      }
      res.status(201).json(goal);
    } catch (error) {
      res.status(500).json({ message: 'Error updating goals', error: error });
    }
  });

// GET endpoint to retrieve goals for a user
router.get('/goals/:userId', authenticateToken, async (req, res) => {
  try {
    const goals = await Goal.findOne({ userId: req.params.userId });
    if (!goals) {
      return res.status(404).json({ message: 'No goals found for this user' });
    }
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error: error });
  }
});

module.exports = router;
