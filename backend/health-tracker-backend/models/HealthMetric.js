const mongoose = require('mongoose');

const HealthMetricSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  steps: Number,
  calories: Number,
  sleepHours: Number,
  waterConsumed: Number // in liters
});

module.exports = mongoose.model('HealthMetric', HealthMetricSchema);
