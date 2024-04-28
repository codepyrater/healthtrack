const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/UserRoutes');
const healthMetricRoutes = require('./routes/healthMetrics'); // Import the routes for health metrics
const goalRoutes = require('./routes/goalRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS for all incoming requests
app.use(express.json());  // Parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route Handlers
app.use('/api/users', userRoutes); // Routes for user operations
app.use('/api/metrics', healthMetricRoutes); // Routes for health metrics

app.use('/api/', goalRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
