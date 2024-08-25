const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for registration
router.post('/register', authController.register);

// Route for login
router.post('/login', authController.login);

module.exports = router;
