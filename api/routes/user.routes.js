const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const RateLimit = require('express-rate-limit');

// Protect login route from brute force
const rateLimiter = RateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window 
    delayAfter: 10, // begin slowing down responses after the 10 request 
    delayMs: 3 * 1000, // slow down subsequent responses by 3 seconds per request 
    max: 30, // start blocking after 30 requests 
    message: "Too many login attempts, please try again after an hour"
});

// Login
router.post('/login', rateLimiter, userController.login);

if (process.env.NODE_ENV === 'development') {
    // Debug route to create a user
    router.post('/', userController.createUser);
}

module.exports = router;