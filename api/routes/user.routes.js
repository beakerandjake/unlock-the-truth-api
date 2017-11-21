const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Login
if (process.env.NODE_ENV === 'production') {
    const expressLimiter = require('express-limiter');
    const redisClient = require('redis').createClient({
        url: process.env.REDISTOGO_URL
    });

    const rateLimiter = expressLimiter(router, redisClient);

    router.post('/login', rateLimiter({
            // 150 requests per hour
            total: 5,
            expire: 1000 * 60 * 60,
            onRateLimited: function (req, res, next) {
                console.log("RATE LIMITED!");
                next({
                    message: 'Rate limit exceeded',
                    status: 429
                });

            }
        }),
        userController.login);
} else {
    router.post('/login', userController.login);
}

if (process.env.NODE_ENV === 'development') {
    // Debug route to create a user
    router.post('/', userController.createUser);
}

module.exports = router;