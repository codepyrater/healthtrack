const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  steps: {
    type: Number,
    required: true,
    default: 10000 // Default step goal
  },
  calories: {
    type: Number,
    required: true,
    default: 2000 // Default calorie intake
  },
  sleepHours: {
    type: Number,
    required: true,
    default: 8 // Default sleep hours
  },
  waterConsumed: {
    type: Number,
    required: true,
    default: 2 // Default water intake in liters
  }
});

module.exports = mongoose.model('Goal', GoalSchema);
