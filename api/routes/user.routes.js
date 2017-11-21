const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const RateLimit = require('express-rate-limit');

// Protect login route from brute force
const rateLimiter = RateLimit({
    windowMs: 30 * 60 * 1000, // 30 min window 
    delayMs: 0, // disable slowdown
    max: 30, // start blocking after 30 requests 
    message: "Too many login attempts, please try again in 30 mins"
});

// Login
router.post('/login', rateLimiter, userController.login);

if (process.env.NODE_ENV === 'development') {
    // Debug route to create a user
    router.post('/', userController.createUser);
}

module.exports = router;