const express = require('express');

const { authenticateToken } = require('../middleware/authMiddleware');  // Adjust path as necessary

const User = require('../models/User'); // Import the user model

const router = express.Router();
const cors = require('cors');
// Apply CORS to all routes in this router
router.use(cors());
require('dotenv').config();


// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Retrieve all users from the database
    res.json(users);  // Send the users as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is required
router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Use bcrypt.compare to check the password against the stored hash
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (passwordIsValid) {
          const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              { expiresIn: '1h' }
          );

          // Return both token and user ID in the response
          res.json({
              message: "Login successful",
              token,
              user: user.username,
              userId: user._id
          });
          
      } else {
          res.status(401).json({ message: "Invalid credentials" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.get('/auth', authenticateToken, (req, res) => {
  res.json({ message: "Accessed protected route", user: req.user });
});

module.exports = router;
