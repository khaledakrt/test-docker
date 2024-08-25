const jwt = require('jsonwebtoken');

const User = require('../models/User');

const bcrypt = require('bcryptjs');

// Handle user registration
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create and save the new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        res.status(400).json({ error: 'User registration failed' });
    }
};

// Handle user login
exports.login = (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
  
        // Compare passwords
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.status(401).json({ message: 'Invalid email or password' });
            }
  
            // Generate a token
            const tokenPayload = {
              email: user.email,
              _id: user._id,
              name: `${user.firstName} ${user.lastName}`, // Adjust field names as necessary
              // Add other necessary fields
            };
  
            const token = jwt.sign(tokenPayload, process.env.SESSION_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
          });
      })
      .catch(error => {
        console.error('Error in login:', error);
        res.status(500).json({ error: error.message });
      });
  };

